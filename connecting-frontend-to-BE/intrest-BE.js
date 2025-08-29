const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/intrest", (req, res)=>{
    const principle = req.query.p;
    const rate = req.query.r;
    const time = req.query.t;

    const intrest = (parseInt(principle) * parseInt(rate) * parseInt(time))/100
    const total =intrest + parseInt(principle);
    res.send({total,intrest});
})

app.listen(3000);