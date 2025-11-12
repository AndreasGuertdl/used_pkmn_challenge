import { openDb } from '../configdb.js';

export async function createTable() {
    openDb().then((db) => {
        db.exec('CREATE TABLE IF NOT EXISTS Used_Pokemon (id INTEGER, name VARCHAR(20), game VARCHAR(15), run INTEGER, used_in DATE)');
    })
}

export async function insertPokemon(request, response) {
    let pokemon = request.body;
    openDb().then((db) => {
        //O ignore não tira o erro de as vezes ele não inserir no banco de dados, o server só nao ira crachar
        //db.run('INSERT or IGNORE INTO Used_Pokemon (id, name, game, run, used_in) VALUES (?, ?, ?, ?, ?)', [pokemon.pkmnId, pokemon.pkmnName, pokemon.game, pokemon.runNumber, pokemon.used_in]);

        db.run('INSERT INTO Used_Pokemon (id, name, game, run, used_in) VALUES (?, ?, ?, ?, ?)', [pokemon.pkmnId, pokemon.pkmnName, pokemon.game, pokemon.runNumber, pokemon.used_in]);

    })
}

export async function selectAllPokemon(request, response) {
    openDb().then((db) => {
        db.all('SELECT * FROM Used_Pokemon').then(pessoas => response.json(pessoas));
    })
}

export async function selectPokemon(request, response) {
    const pokemonId = request.params.id;

    try {
        const db = await openDb();
        const row = await db.get('SELECT * FROM Used_Pokemon WHERE id=?', [pokemonId]);
        if (!row) {
            return response.status(404).json({ error: 'Pkmn not found' });
        }
        return response.json(row);
    } catch (err) {
        return response.status(500).json({ error: err.message });
    }
}
