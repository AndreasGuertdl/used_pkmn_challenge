import Bottleneck from "bottleneck";

//Puxar 151 esta demorando 17,05 - 16,95 segundos
const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 111
})

async function getData(url) {
    return fetch(url);
}

const wrapedGetData = limiter.wrap(getData);

export async function getPkmnByIdFromApi(req, res) {
    if (!req.params.info) {
        return res.status(400).json({
            message: 'ID or Name of Pokemon must be passed.',
        })
    }

    const pkmnInfo = req.params.info;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnInfo}`);

    if (response.status == 404) {
        return res.status(400).json({
            message: 'We could not find any Pokemon due to invalid information.'
        });
    }

    try {
        const data = await response.json();

        res.json(data);

        res.status(200);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: 'Something went wrong. Please, check if a valid ID or Name was passed.'
        });
    }
}


export async function getFirstGenData(req, res) {
    const firstGenUrl = [];
    const offset = 1;
    const limit = 20;

    for (let i = offset; i <= limit; i++) {
        const id = i.toString();
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        firstGenUrl.push(url);
    }

    const allThePromises = firstGenUrl.map(item => {
        return wrapedGetData(item);
    })

    try {
        const resultados = await Promise.all(allThePromises);

        let pokemonFullData = {
            pokedex_number: undefined,
            pkname: undefined,
            sprite: undefined,
            types: undefined
        }

        const promises = resultados.map(async (response) => {
            const data = await response.json();
            const { id, name, types } = data;
            const sprite = data.sprites.other["official-artwork"].front_default;

            pokemonFullData = {
                pokedex_number: id,
                pkname: name,
                sprite: sprite,
                types: types
            }

            return new Promise((resolve) => {
                resolve(pokemonFullData);
            })
        })

        Promise.all(promises).then((results) => {
            //Demora esta aqui:
            //console.log(results);
            res.json(results);
        })
    } catch (err) {
        console.log(err);
    }
}

export async function getSecondGenData(req, res) {
    const secondGenUrl = [];
    const offset = 152;
    const limit = 251;

    for (let i = offset; i <= limit; i++) {
        const id = i.toString();
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        secondGenUrl.push(url);
    }

    const allThePromises = secondGenUrl.map(item => {
        return wrapedGetData(item);
    })

    try {
        const resultados = await Promise.all(allThePromises);

        let pokemonFullData = {
            pokedex_number: undefined,
            pkname: undefined,
            sprite: undefined,
            types: undefined
        }

        const promises = resultados.map(async (response) => {
            const data = await response.json();
            const { id, name, types } = data;

            const sprite = data.sprites.other["official-artwork"].front_default;

            pokemonFullData = {
                pokedex_number: id,
                pkname: name,
                sprite: sprite,
                types: types
            }

            return new Promise((resolve) => {
                resolve(pokemonFullData);
            })
        })

        Promise.all(promises).then((results) => {
            //Demora esta aqui:
            //console.log(results);
            res.json(results);
        })
    } catch (err) {
        console.log(err);
    }
}

export async function getThirdGenData(req, res) {
    const thidGenUrl = [];
    const offset = 252;
    const limit = 386;

    for (let i = offset; i <= limit; i++) {
        const id = i.toString();
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        thidGenUrl.push(url);
    }

    const allThePromises = thidGenUrl.map(item => {
        return wrapedGetData(item);
    })

    try {
        const resultados = await Promise.all(allThePromises);

        let pokemonFullData = {
            pokedex_number: undefined,
            pkname: undefined,
            sprite: undefined,
            types: undefined
        }

        const promises = resultados.map(async (response) => {
            const data = await response.json();
            const { id, name, types } = data;

            const sprite = data.sprites.other["official-artwork"].front_default;

            pokemonFullData = {
                pokedex_number: id,
                pkname: name,
                sprite: sprite,
                types: types
            }

            return new Promise((resolve) => {
                resolve(pokemonFullData);
            })
        })

        Promise.all(promises).then((results) => {
            //Demora esta aqui:
            //console.log(results);
            res.json(results);
        })
    } catch (err) {
        console.log(err);
    }
}