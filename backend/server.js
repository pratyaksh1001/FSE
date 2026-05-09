import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import registerRouter from "./register.js";
import authRouter from "./auth.js";
import loginRouter from "./login.js";
import homeRouter from "./home.js";
import tripRouter from "./trip.js";
import bookingsRouter from "./bookings.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);
app.use("/trip", tripRouter);
app.use("/bookings", bookingsRouter);

app.get("/", (req, res) => {
    res.send("working");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
