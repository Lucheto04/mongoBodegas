import { coneccion } from "../db/atlas.js";
import { limitQuery } from "../helpers/limitQuerys.js";
import { appMiddlewareBodegaVerify, appDTOBodega } from "../middleware/middle.bodegas.js";
import { Router } from "express";
let appBodega = Router();

let db = await coneccion();
let bodegas = db.collection("bodegas");

appBodega.get('/', limitQuery(), appMiddlewareBodegaVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let result = await bodegas.find().toArray();
    res.send(result)
})
export default appBodega;