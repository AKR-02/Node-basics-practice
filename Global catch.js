const express = require("express");
const app = express()

app.use(express.json());

app.post("/health", (req, res) =>{
    const kidneys = req.body.kidneys;
    const kidneyLength = kidneys.length;
    res.send("you have " +kidneyLength+ " kidneys");
});

app.use(function (err, req, res, next) {
    res.send("msg: wtf is wrong with your ass")
});


app.listen(3000);