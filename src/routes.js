import { createTable, insertPokemon, selectPokemon } from './controller/used_pokemon.js';
import { createJsonFile } from './controller/export_pkmn.js';
import { getFirstGenData } from './controller/get_pkmn_data.js';
import { Router } from 'express';

const router = Router();
createTable();

//GET
router.get('/first_gen', getFirstGenData);
router.get('/pokemon', selectPokemon);

//POST
router.post('/pokemon', insertPokemon);
router.post('/fs', createJsonFile);

export default router;