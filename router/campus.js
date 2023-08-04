import { Router } from "express";
import { limitGet } from "../limit/config.js";
import { con } from "../db/atlas.js";
import { ObjectId } from "mongodb";
const appCampus = Router();

appCampus.get('/', limitGet(), async (req, res) => {
    
    if(!req.rateLimit) return
    let { id } = req.body;
    let db = await con();
    console.log(db);
    let usuario = db.collection('usuario');
    let result = await usuario.find({_id: new ObjectId(id)}).toArray();
    res.send(result);
    
})

appCampus.post('/', limitGet(), async (req, res) => {
    if(!req.rateLimit) return;
    let db = await con();
    let usuario = db.collection('usuario');
    try{
        let result = await usuario.insertOne(req.body);
        console.log(result);
        res.send(":)");
    } catch (error){

        console.log(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description);
        res.send(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description)
    }
});

export default appCampus;