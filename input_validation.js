// Input validation through Library called ZOD
const express = require("express");
const app = express()
const zod = require("zod");

const schema = zod.object({
    email: z.string(),
    password: z.string(),
    country: z.literal("IN").or(z.literal("US"))
});

app.use(express.json());

app.post("/he", (req, res) =>{
    const kidney = req.body.kidney;
    const response = schema.safeParse(kidney);
    if (!response.success) {
        res.status(411).json({
            msg: "Invalid input"
        });
    }
    res.json({
        response
    });
});

app.listen(3000);