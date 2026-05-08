import { client } from "./db.js";

export async function getTravelData(from, to) {
    const db = client.db("fse");


    const flights = await db
        .collection("flights")
        .find({
            from,
            to,
        })
        .toArray();


    const trains = await db
        .collection("trains")
        .find({
            "stations.station": {
                $in: [from, to],
            },
        })
        .toArray();

    const hotels = await db
        .collection("hotels")
        .find({
            city: to,
        })
        .toArray();

    return {
        flights,
        trains,
        hotels,
    };
}