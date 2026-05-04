import { client } from "./db";
import data from "./hotels.json";
const hotels = client.db("fse").collection("hotels");

const documents = Object.entries(data).map(([city, value]) => ({
    city,
    hotels: value.hotels,
}));

hotels.insertMany(documents);
console.log("hotel records inserted");
