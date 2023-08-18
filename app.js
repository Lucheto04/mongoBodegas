import dotenv from 'dotenv';
import express from 'express';
import { appToken, appVerify } from './middleware/token.js';
import appBodega from './routes/bodegas.routes.js';
import appProducto from './routes/productos.routes.js';
dotenv.config();
const app = express();

app.use(express.json());

app.use('/token', appToken);
app.use('/bodegas', appVerify, appBodega);
app.use('/productos', appVerify, appProducto);


const config = JSON.parse(process.env.MY_SERVER)
app.listen(config, () =>{
    console.log(`http://${config.hostname}:${config.port}`);
});