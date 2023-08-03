import dotenv from "dotenv";
import express from "express";
import  appCampus  from "./router/campus.js"

dotenv.config();

let app = express();

app.use("/campus", appCampus);


let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
})