import { coneccion } from "../db/atlas.js";
import { limitQuery } from "../helpers/limitQuerys.js";
import { appMiddlewareProductoVerify, appDTOProducto } from "../middleware/middle.productos.js";
import { Router } from "express";
import siguienteId from "../helpers/siguienteId.js";
let appProducto = Router();

let db = await coneccion();
let producto = db.collection("productos");

appProducto.get('/orden', appMiddlewareProductoVerify, async(req, res) =>{
    if(!req.rateLimit) return;


    let result = await producto.aggregate(campo_total).toArray();
    res.send(result)
})


export default appProducto;