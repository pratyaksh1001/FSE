import { Router } from "express";
import { client } from "./db.js";
import bcrypt from "bcrypt";
const registerRouter = Router();

registerRouter.post("/", async (req, res) => {
    console.log("register hit");
    var { name, username, email, password } = req.body;
    username = username || name;
    password = await bcrypt.hash(password, 10);
    const newUser = { username, email, password };
    await client.db("fse").collection("users").insertOne(newUser);
    res.sendStatus(201);
});

export default registerRouter;
