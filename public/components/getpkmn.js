pokemonBasicData = {
    name: undefined,
    url: undefined
}

pokemonFullData = {
    pokedex_number: undefined,
    pkname: undefined,
    sprite: undefined,
    types: undefined
}

let pokemonResults = [];
//let firstGen = [];

/* async function getPokemonData(url) {
    fetch(url).then((response) => {
        response.json().then((data) => {
            pokemonFullData = {
                pokedex_number: data.id,
                pkname: data.name,
                sprite: data.sprites.other["official-artwork"].front_default,
                types: data.types
            }
            return pokemonFullData;
        })
    })
} */

/* async function getPokemonUrl() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    const dataJson = await response.json();
    const data = await dataJson.results;
    data.forEach((pkmn) => {
        pokemonBasicData = {
            name: pkmn.name,
            url: pkmn.url
        }
        pokemonResults.push(pokemonBasicData);
    })
}
async function getPokemonData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        pokemonFullData = {
            pokedex_number: data.id,
            pkname: data.name,
            sprite: data.sprites.other["official-artwork"].front_default,
            types: data.types
        }
        return pokemonFullData;
    } catch (err) {
        console.log(err);
    }
} */
async function getFirstGen() {
    const firstGen = [];
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    const dataJson = await response.json();
    const data = await dataJson.results;
    data.forEach((pkmn) => {
        pokemonBasicData = {
            name: pkmn.name,
            url: pkmn.url
        }
        pokemonResults.push(pokemonBasicData);
    })
    try {
        pokemonResults.forEach(async (pkmn) => {
            const response = await fetch(pkmn.url);
            const data = await response.json();
            pokemonFullData = {
                pokedex_number: data.id,
                pkname: data.name,
                sprite: data.sprites.other["official-artwork"].front_default,
                types: data.types
            }
            firstGen.push(pokemonFullData);
        })
        return firstGen;
    } catch (err) {
        console.log(err);
    }
}

/* async function getFirstGen() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    const dataJson = await response.json();
    const data = await dataJson.results;
    data.forEach((pkmn) => {
        pokemonBasicData = {
            name: pkmn.name,
            url: pkmn.url
        }
        pokemonResults.push(pokemonBasicData);
    })
    pokemonResults.forEach(async (pkmn) => {
        const pokemon = await getPokemonData(pkmn.url);
        console.log(pokemon);
        firstGen.push(pokemon);
    })
} */


function createJsonGen(pkmnList, path) {
    if (pkmnList.length == 0) {
        console.log("No data to save to file.");
    } else {
        const data = { pkmnList, path };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };
        fetch('/fs', options);
    }
}

getFirstGen().then((firstGen) => {
    const path = 'D:/Room/Arquivos/Cadernos/Front-End/Used_Pokemon/public/first_gen.json';
    createJsonGen(firstGen, path);
});





/* async function getFirstGen() {
    for (i = 1; i < 150; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${1}`);
        const pokemon = await response.json();
        pokemonData = {
            pokedex_number: pokemon.id,
            pkname: pokemon.name,
            sprite: pokemon.sprites.other["official-artwork"].front_default,
            types: pokemon.types
        }
        if (typeof pokemonData == 'undefined') {
            console.log("Data undefined! Can't be pushed to array.");
        } else {
            console.log("Pushing Pokemon to array.");
            firstGen.push(pokemonData);
        }
    }
} */