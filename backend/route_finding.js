import { client } from "./db.js";

function timeToMinutes(time) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

export async function find_route(from, to) {
    const db = client.db("fse");

    const flights = await db.collection("flights").find({}).toArray();

    const trains = await db.collection("trains").find({}).toArray();

    const hotels = await db
        .collection("hotels")
        .find({
            city: to,
        })
        .toArray();

    const graph = {};

    for (const flight of flights) {
        if (!graph[flight.from]) {
            graph[flight.from] = [];
        }

        graph[flight.from].push({
            to: flight.to,

            mode: "flight",

            vehicle: flight.flight_number || flight.flightNumber,

            name: flight.flight_name || flight.flightName,

            departure: flight.departure || flight.departureTime,

            arrival: flight.arrival || flight.arrivalTime,

            distance: flight.distance,
        });
    }

    for (const train of trains) {
        const stations = train.stations;

        for (let i = 0; i < stations.length; i++) {
            for (let j = i + 1; j < stations.length; j++) {
                const fromStation = stations[i];
                const toStation = stations[j];

                if (!graph[fromStation.station]) {
                    graph[fromStation.station] = [];
                }

                graph[fromStation.station].push({
                    to: toStation.station,

                    mode: "train",

                    vehicle: train.train_number,

                    name: train.train_name,

                    departure: fromStation.arrival,

                    arrival: toStation.arrival,

                    distance: toStation.distance - fromStation.distance,
                });
            }
        }
    }

    const pq = [];

    pq.push({
        city: from,

        totalDistance: 0,

        switches: 0,

        currentTime: 0,

        totalTime: 0,

        path: [],
    });

    const answers = [];

    while (pq.length > 0) {
        pq.sort((a, b) => a.totalDistance - b.totalDistance);

        const current = pq.shift();

        if (current.city === to) {
            answers.push(current);

            if (answers.length >= 10) {
                break;
            }

            continue;
        }

        if (current.switches > 5) {
            continue;
        }

        const neighbours = graph[current.city] || [];

        for (const next of neighbours) {
            const dep = timeToMinutes(next.departure);

            const arr = timeToMinutes(next.arrival);

            if (dep < current.currentTime) {
                continue;
            }

            let travelTime = arr - dep;

            if (travelTime < 0) {
                travelTime += 24 * 60;
            }

            pq.push({
                city: next.to,

                totalDistance: current.totalDistance + next.distance,

                switches: current.switches + 1,

                currentTime: arr,

                totalTime: current.totalTime + travelTime,

                path: [
                    ...current.path,
                    {
                        from: current.city,

                        to: next.to,

                        mode: next.mode,

                        vehicle: next.vehicle,

                        name: next.name,

                        departure: next.departure,

                        arrival: next.arrival,

                        distance: next.distance,

                        travelTime,
                    },
                ],
            });
        }
    }

    return {
        routes: answers,
        hotels,
    };
}
