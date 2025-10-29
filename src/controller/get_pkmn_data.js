import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 333
})

async function getData(url) {
    return fetch(url);
}

const wrapedGetData = limiter.wrap(getData);

export async function getFirstGenData(req, res) {
    const firstGenUrl = [];
    const limit = 5;

    for (let i = 1; i <= limit; i++) {
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
            res.json(results);
        })
    } catch (err) {
        console.log(err);
    }
}