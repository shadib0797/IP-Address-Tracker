require('dotenv').config();
const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html");
})

app.get("/api", (req, res)=>{
    const keys = {
        apiKey:process.env.API_KEY,
        accessToken:process.env.ACCESS_TOKEN
    }

    res.send(JSON.stringify(keys));
});

app.listen(3000, ()=>console.log("App is running on port:3000"));