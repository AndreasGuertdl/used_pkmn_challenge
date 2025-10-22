import express from 'express';
import path from 'path';
import router from './routes.js';

const app = express();

app.use(express.static(path.resolve('../public')));

app.use(express.json());

app.use(router);

app.listen(3001, console.log("http://localhost:3001/"));

