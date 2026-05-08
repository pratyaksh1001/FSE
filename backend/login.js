import { Router } from "express";
import { client } from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cache from "./cache.js";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
    const { email, password } = req.body;
    const user = await client.db("fse").collection("users").findOne({ email });
    if (!user) {
        return res
            .status(401)
            .json({ message: "Invalid username or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res
            .status(401)
            .json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    cache[token] = JSON.stringify({
        email: user.email,
        username: user.username,
    });
    res.json({
        message: "Login successful",
        token: token,
        username: user.username,
    });
});

export default loginRouter;
