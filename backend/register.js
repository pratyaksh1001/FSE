import { Router } from "express";
import { userSchema } from "schema";
import { client } from "./db.js";
import bcrypt from "bcrypt";
const registerRouter = Router();

registerRouter.post("/", (req, res) => {
    const { username, email, password } = req.body;
    password = bcrypt.hash(password, 10);
    const user = userSchema.create({ username, email, password });
    client.db("fse").collection("users").insertOne(user);
    res.sendStatus(201);
});

export default registerRouter;
