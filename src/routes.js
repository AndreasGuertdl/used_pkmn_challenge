import { insertPokemon } from './controller/used_pokemon.js';
import { createJsonFile } from './controller/export_pkmn.js';

import { Router } from 'express';

const router = Router();

//POST
router.post('/pokemon', insertPokemon);
router.post('/fs', createJsonFile);

export default router;