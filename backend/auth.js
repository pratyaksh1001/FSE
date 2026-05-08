import { Router } from "express";
import jwt from "jsonwebtoken";
import cache from "./cache.js";

const authRouter = Router();

authRouter.post("/", async (req, res) => {
    const { token } = req.body;

    const user = cache[token];

    if (!user) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }

    const data = JSON.parse(user);

    res.json({
        token: jwt.sign(
            {
                username: data.username,
                email: data.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            },
        ),
    });
});

export default authRouter;
