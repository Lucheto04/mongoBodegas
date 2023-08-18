import { coneccion } from "../db/atlas.js";
import { limitQuery } from "../helpers/limitQuerys.js";
import { appMiddlewareProductoVerify, appDTOProducto } from "../middleware/middle.productos.js";
import { Router } from "express";
import siguienteId from "../helpers/siguienteId.js";
let appProducto = Router();

let db = await coneccion();
let producto = db.collection("productos")
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
});

appProducto.post('/', limitQuery(), appMiddlewareProductoVerify, appDTOProducto, async(req, res) => {
    if(!req.rateLimit) return;
    try {
        const newIdProducto = await siguienteId("bodegas");
        const newDocumentProducto = {
            _id: newIdProducto,
            ...req.body
        };
        let result = await producto.insertOne(newDocumentProducto);

        const defaultInventario = await inventario.insertOne({
            _id: Number(siguienteId("inventarios")),
            id_bodega: 12,
            id_producto: newIdProducto,
            cantidad: 103,
            created_by: 11,
            created_at: '2023-05-26'
        })
        res.status(201).send({ status: 201, message: 'documento creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(406).send('no se ha podido crear el documento');
    }
});

export default appProducto;