import { createTable, insertPokemon, selectPokemon } from './controller/used_pokemon.js';
import express from 'express';
import path from 'path';
import router from './routes.js';

const app = express();

app.use(express.static(path.resolve('../public')));

app.use(express.json());

app.use(router);

createTable();

app.listen(3001, console.log("http://localhost:3001/"));

