import { client } from "./db.js";
import hotelsData from "./hotels.json" assert { type: "json" };

async function ingestHotels() {
    const db = client.db("fse");
    const hotelsCollection = db.collection("hotels");

    await hotelsCollection.deleteMany({});

    const hotelDocuments = [];

    for (const [city, cityData] of Object.entries(hotelsData)) {
        if (cityData.hotels && Array.isArray(cityData.hotels)) {
            for (const hotel of cityData.hotels) {
                hotelDocuments.push({
                    city,
                    name: hotel.name,
                    price: hotel.price,
                    rating: hotel.rating,
                    distance_from_station: hotel.distance_from_station,
                });
            }
        }
    }

    if (hotelDocuments.length > 0) {
        await hotelsCollection.insertMany(hotelDocuments);
        console.log(`Successfully ingested ${hotelDocuments.length} hotels`);
    }

    await client.close();
}

ingestHotels().catch(console.error);
