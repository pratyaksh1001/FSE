import { Router } from "express";
import jwt from "jsonwebtoken";
import { find_route } from "./route_finding.js";
import { client } from "./db.js";

const tripRouter = Router();

tripRouter.get("/", async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({
                message: "Missing 'from' or 'to' parameters",
            });
        }

        const result = await find_route(from, to);

        return res.json(result);
    } catch (err) {
        console.error("Trip route error:", err);
        return res.status(500).json({
            message: "Failed to fetch trip details",
        });
    }
});

tripRouter.post("/book", async (req, res) => {
    try {
        const bookingData = req.body;
        const token = bookingData.userToken || bookingData.token;
        if (!token) {
            return res.status(401).json({ message: "Missing authentication token" });
        }

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const email = payload.email;
        const dbuser = await client
            .db("fse")
            .collection("users")
            .findOne({ email });

        if (!dbuser) {
            return res.status(401).json({ message: "User not found" });
        }

        bookingData.createdAt = new Date();
        bookingData.userToken = token;
        bookingData.userEmail = email;
        bookingData.userId = dbuser._id;

        await client.db("fse").collection("user_trip").insertOne(bookingData);
        res.status(201).json({ message: "Booking successful" });
    } catch (err) {
        console.error("Booking error:", err);
        res.status(500).json({ message: "Failed to book trip" });
    }
});

export default tripRouter;
