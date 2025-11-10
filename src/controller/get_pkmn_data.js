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

export async function getFirstGenData(req, res) {
    const firstGenUrl = [];
    const offset = 1;
    const limit = 4;

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