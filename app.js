import dotenv from 'dotenv';
import express, { json } from 'express';
import { appToken, appVerify } from './middleware/token.js';
import appBodega from './routes/bodegas.routes.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/bodegas', appVerify, appBodega)
app.use('/token', appToken);


const config = JSON.parse(process.env.MY_SERVER)
app.listen(config, () =>{
    console.log(`http://${config.hostname}:${config.port}`);
});