import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { Producto } from '../storage/productos.js'; 
import { Router } from "express";
const appMiddlewareProductoVerify = Router()
const appDTOProducto = Router();

appMiddlewareProductoVerify.use(async(req,res,next) => {
    if(!req.rateLimit) return;
    
    let {payload} = req.data;
    const {iat, exp, ...newPayload } = payload
    payload = newPayload
    let clone = JSON.stringify(classToPlain(plainToClass(Producto, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);
    (!verify) ? res.status(406).send({status: 406, message: "No Autorizado"}) : next();
});


appDTOProducto.use( async(req,res,next) =>  {
    
    try {
        let data = plainToClass(Producto, req.body);
        await validate(data)
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next()
    } catch (error) {
        res.status(error.status).send(error)
    }
});

export { 
    appMiddlewareProductoVerify,
    appDTOProducto
};