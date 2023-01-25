import express from 'express'
import bodyParser from 'body-parser'
const app = express();
import cors from 'cors'
import {mongoconnection} from './db';
import router from "./router/adminroute"
mongoconnection();
app.use(cors({origin:"*"}));

app.use(bodyParser.urlencoded(
    {
        extended:true
    }));
app.use(bodyParser.json());

app.use("/admin",router)


export default app;