import { createTable, insertPokemon, selectAllPokemon, selectPokemon } from './controller/used_pokemon.js';
import { createJsonFile } from './controller/export_pkmn.js';
import { getPkmnByIdFromApi, getFirstGenData, getSecondGenData, getThirdGenData } from './controller/get_pkmn_data.js';
import { Router } from 'express';

const router = Router();
createTable();

//GET
router.get('/pokemon_api/:info',getPkmnByIdFromApi);
router.get('/first_gen', getFirstGenData);
router.get('/second_gen', getSecondGenData);
router.get('/third_gen', getThirdGenData);
router.get('/all_pokemon', selectAllPokemon);
router.get('/pokemon/:id', selectPokemon);

//POST
router.post('/pokemon', insertPokemon);
router.post('/fs', createJsonFile);

export default router;