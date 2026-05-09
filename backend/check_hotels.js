import { client } from "./db.js";

async function run() {
    const db = client.db("fse");
    const hotels = await db.collection("hotels").find({ city: "Kolkata" }).toArray();
    console.log(JSON.stringify(hotels, null, 2));
    process.exit(0);
}
run();
