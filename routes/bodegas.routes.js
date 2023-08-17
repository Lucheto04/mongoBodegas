import { coneccion } from "../db/atlas.js";
import { limitQuery } from "../helpers/limitQuerys.js";
import { appMiddlewareBodegaVerify, appDTOBodega } from "../middleware/middle.bodegas.js";
import { Router } from "express";
import siguienteId from "../helpers/siguienteId.js";
let appBodega = Router();

let db = await coneccion();
let bodegas = db.collection("bodegas");


/**
* ! GET
* ? Bodegas ordenadas alfabeticamente
* * http://127.0.0.3:5012/bodegas
*/
appBodega.get('/', limitQuery(), appMiddlewareBodegaVerify, async(req, res) => {
    if(!req.rateLimit) return;
    let result = await bodegas.find().sort({ nombre: 1 }).toArray();
    res.send(result)
})



// let {cc:CC, nombre:NOMBRE} = json;
// let json2 = {};
// Object.assign(json2, {CC, NOMBRE});

/**
* ! POST
* ? agregar una nueva bodega
* * http://127.0.0.3:5012/bodegas
* @params {
* "Nombre-Bodega": "AAAA",
* "Responsable-id": 1,
* "Estado-a": 1
* }
*/
appBodega.post('/', limitQuery(), appMiddlewareBodegaVerify, appDTOBodega, async(req, res) => {
    if (!req.rateLimit) return;
    try {
        const newId = await siguienteId( "bodegas");

        
        const newDocument = {
            _id: newId,
            ...req.body
        };

        let result = await bodegas.insertOne(newDocument);
        console.log(result);
        res.status(201).send({ status: 201, message: 'documento creado con exito' });
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.status(406).send('no se ha podido crear el documento');
    }
});
export default appBodega;