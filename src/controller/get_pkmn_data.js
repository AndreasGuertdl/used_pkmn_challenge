export async function getFirstGenData(req, res) {
    const limit = 5;
    const firstGen = [];
    
    for (let i = 1; i <= limit; i++) {
        const id = i.toString();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        const responseJson = await response.json();

        const pokemonFullData = {
            pokedex_number: responseJson.id,
            pkname: responseJson.name,
            sprite: responseJson.sprites.other["official-artwork"].front_default,
            types: responseJson.types
        }
        firstGen.push(pokemonFullData);
    }

    res.json(firstGen);
}