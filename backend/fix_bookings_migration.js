import { client } from "./db.js";
import cache from "./cache.js";

async function run() {
    await client.connect();
    const coll = client.db("fse").collection("user_trip");
    const cursor = coll.find({ userToken: { $exists: true } });
    let total = 0;
    let updated = 0;

    for await (const doc of cursor) {
        total += 1;
        const original = doc.userToken;
        const trimmed = original?.trim();
        const update = {};

        if (trimmed && trimmed !== original) {
            update.userToken = trimmed;
        }

        const user = trimmed ? cache[trimmed] : null;
        if (user) {
            const { email } = JSON.parse(user);
            if (!doc.userEmail || doc.userEmail !== email) {
                update.userEmail = email;
            }
        }

        if (Object.keys(update).length > 0) {
            await coll.updateOne({ _id: doc._id }, { $set: update });
            updated += 1;
        }
    }

    console.log("total", total, "updated", updated);
    await client.close();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});