import { insertPokemon } from './controller/used_pokemon.js';
import { createJsonFile } from './controller/export_pkmn.js';
import { getFirstGenData } from './controller/get_pkmn_data.js';
import { Router } from 'express';

const router = Router();

//GET
router.get('/first_gen', getFirstGenData);

//POST
router.post('/pokemon', insertPokemon);
router.post('/fs', createJsonFile);

export default router;