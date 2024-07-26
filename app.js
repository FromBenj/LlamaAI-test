import express from 'express';
import * as path from "node:path";
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import getLlamaiAnswer from "./src/api-call.js";

const app = express();
// const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/public')));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/llamaai-api',async function(req,res){
    const question = req.body.question;
    try {
        const data = await getLlamaiAnswer(question);
        res.json(data);
    } catch (error) {
        console.error('Backend - Error fetching data from Llama API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//add the router
app.listen(process.env.port || 3000);

