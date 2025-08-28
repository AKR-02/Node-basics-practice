const express = require("express");
const app = express();


app.get("/health-checkup", (req, res) =>{

    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = req.query.kidneyid;

    if(username != "Anshuman" || password != "pass"){
        res.status(400).json({msg: "Incorrect Username or password"});
        return;
    }

    if (kidneyId !== "1" && kidneyId !== "2"){
        res.status(400).json({msg: "Incorrect kidneyId please enter the correct one"});
        return;
    }

    res.json({msg: "Your kidney is fine!"});

});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});