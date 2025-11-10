import { openDb } from '../configdb.js';

export async function createTable() {
    openDb().then((db) => {
        db.exec('CREATE TABLE IF NOT EXISTS Used_Pokemon (id INTEGER PRIMARY KEY, name VARCHAR(20), game VARCHAR(15), run INTEGER, used_in DATE)');
    })
}

export async function insertPokemon(request, response) {
    let pokemon = request.body;
    openDb().then((db) => {
        //db.run('BEGIN IF NOT EXISTS (SELECT * FROM Used_Pokemon WHERE id = ?) BEGIN INSERT INTO Used_Pokemon (id, name, game, used_in) VALUES (?, ?, ?, ?) END END', [pokemon.id, pokemon.id, pokemon.name, pokemon.game, pokemon.run, pokemon.used_in]).then((pkmn => response.json(pkmn)))
        db.run('INSERT INTO Used_Pokemon (id, name, game, used_in) VALUES (?, ?, ?, ?)', [pokemon.id, pokemon.name, pokemon.game, pokemon.run, pokemon.used_in]);
    })
}

export async function selectPokemon(request, response) {
    let pokemonId = request.body;
    openDb().then((db) => {
        db.get('SELECT * FROM Used_Pokemon WHERE id=?', [pokemonId]).then(res => res.json(pkmn));
    })
}