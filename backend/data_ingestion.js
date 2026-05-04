import { client } from "./db";
import data from "./transport.json";

const db = client.db("fse");
const trains = db.collection("trains");
const flights = db.collection("flights");

function ingestData() {
    trains.insertMany(data["trains"]);
    flights.insertMany(data["flights"]);
}

ingestData();
