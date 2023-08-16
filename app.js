import dotenv from 'dotenv';
import expres from 'express';
import { appToken, appVerify } from './middleware/token.js';
dotenv.config();
const app = expres();



app.use('/token', appToken);


const config = JSON.parse(process.env.MY_SERVER)
app.listen(config, () =>{
    console.log(`http://${config.hostname}:${config.port}`);
});