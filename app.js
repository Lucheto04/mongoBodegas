import dotenv from 'dotenv';
import expres from 'express';
dotenv.config();
const app = expres();


const config = JSON.parse(process.env.MY_SERVER)

app.listen(config, () =>{
    console.log(`http://${config.hostname}:${config.port}`);
});