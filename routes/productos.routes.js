import { coneccion } from "../db/atlas.js";
import { limitQuery } from "../helpers/limitQuerys.js";
import { appMiddlewareProductoVerify, appDTOProducto } from "../middleware/middle.productos.js";
import { Router } from "express";
let appProducto = Router();

let db = await coneccion();
let inventario = db.collection("inventarios");

appProducto.get('/', limitQuery(), appMiddlewareProductoVerify, async(req, res) =>{
    if(!req.rateLimit) return;


    let result = await inventario.aggregate([
        {
            $lookup: {
              from: "productos",
              localField: "id_producto",
              foreignField: "_id",
              as: "producto"
            }
        },
        {
            $unwind: "$producto"
        },
        {
            $group: {
              _id: "$producto._id",
              Total: { $sum: "$cantidad" }
            }
        },
        {
            $sort: {Total: -1}
        }
    ]).toArray();
    res.send(result)
})


export default appProducto;