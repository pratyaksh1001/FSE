import { Router } from "express";
import jwt from "jsonwebtoken";
import { client } from "./db.js";

const bookingsRouter = Router();

bookingsRouter.get("/", async (req, res) => {
    try {
        const token = req.query.token?.trim();
        if (!token) {
            return res.status(401).json({ message: "Missing authentication token" });
        }

        let payload;
        let email;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
            email = payload.email;
        } catch (err) {
            payload = jwt.decode(token);
            email = payload?.email;
        }

        const collection = client.db("fse").collection("user_trip");
        const query = email
            ? { $or: [{ userEmail: email }, { userToken: token }] }
            : { userToken: token };

        let bookings = await collection
            .find(query)
            .sort({ createdAt: -1 })
            .toArray();

        if (email && bookings.length === 0) {
            const legacyCursor = collection.find({
                userEmail: { $exists: false },
                userToken: { $exists: true },
            });

            const legacyBookings = [];
            for await (const doc of legacyCursor) {
                const decoded = jwt.decode(doc.userToken);
                if (decoded?.email === email) {
                    legacyBookings.push(doc);
                    await collection.updateOne(
                        { _id: doc._id },
                        { $set: { userEmail: email } }
                    );
                }
            }

            if (legacyBookings.length > 0) {
                bookings = [...legacyBookings, ...bookings].sort(
                    (a, b) => b.createdAt - a.createdAt
                );
            }
        }

        res.json(bookings);
    } catch (err) {
        console.error("Fetch bookings error:", err);
        res.status(500).json({ message: "Failed to fetch bookings" });
    }
});

export default bookingsRouter;