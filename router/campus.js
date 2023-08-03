import { Router } from "express";
import { limitGet } from "../limit/config.js";
const appCampus = Router();

appCampus.get('/', limitGet(), (req, res) => {
    
    if(!req.rateLimit) return

    res.send(":)");
    
})

export default appCampus;