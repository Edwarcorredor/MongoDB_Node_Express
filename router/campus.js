import { Router } from "express";
import { limitGet } from "../limit/config.js";
import { con } from "../db/atlas.js";
import { ObjectId } from "bson";
const appCampus = Router();

appCampus.get('/', limitGet(), async (req, res) => {
    
    if(!req.rateLimit) return
    let { id } = req.body;
    let db = await con();
    let usuario = db.collection('usuario');
    let result = await usuario.find({_id: new ObjectId(id)}).toArray();
    res.send(result);
    
})

export default appCampus;