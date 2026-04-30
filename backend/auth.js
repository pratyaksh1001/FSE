import { Router } from "express";
import { userSchema } from "schema";
import { client } from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const authRouter = Router();

authRouter.post("/", async (req, res) => {
    const { username, token } = req.body;
    const user = await client
        .db("fse")
        .collection("users")
        .findOne({ username });
    if (!user) {
        return res.status(401).json({ message: "Invalid username or token" });
    }
    const isValid = await bcrypt.compare(token, user.token);
    if (!isValid) {
        return res.status(401).json({ message: "Invalid username or token" });
    }
    const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    res.json({ token: jwtToken });
});

export default authRouter;
