import { openDb } from '../configdb.js';

export async function createTable() {
    openDb().then((db) => {
        db.exec('CREATE TABLE IF NOT EXISTS Used_Pokemon (id INTEGER PRIMARY KEY, name VARCHAR(20), game VARCHAR(15), used_in DATE)')
    })
}

export async function insertPokemon(request, response) {
    let pokemon = request.body;
    openDb().then((db) =>{
        db.run('INSERT INTO Used_Pokemon (id, name, game, used_in) VALUES (?, ?, ?, ?)', [pokemon.id, pokemon.name, pokemon.game, pokemon.used_in]);
    })
}
