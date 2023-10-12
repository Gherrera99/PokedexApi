// Función para obtener datos de la PokeAPI
async function fetchPokemonData(offset, limit) {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        let data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error al obtener datos de la PokeAPI', error);
    }
}


// Función para obtener datos de movimientos desde la PokeAPI
async function fetchMovesData(offset, limit) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/move?offset=${offset}&limit=${limit}`);
        let data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error al obtener datos de movimientos desde la PokeAPI', error);
    }
}



// Función para buscar Pokémon por tipo
async function searchPokemonByType(type, offset, limit) {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        let data = await response.json();
        return data.pokemon;
    } catch (error) {
        console.error('Error al buscar Pokémon por tipo', error);
        return null;
    }
}

//Función para buscar Pokémon por generación
async function searchPokemonByGeneration(generation){
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`);
        let data = await response.json();
        return data.pokemon_species;
    } catch (error) {
        console.error('Error al buscar Pokémon por generación', error);
        return null;
    }
}

// Función para buscar Pokémon por nombre
async function searchPokemonByName(name) {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error al buscar Pokémon por nombre', error);
        return null;
    }
}

//Función para buscar Pokémon por región
async function searchPokemonByRegion(region){
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/region/${region}`);
        let data = await response.json();
        return data.pokedexes[0].name;
    } catch (error) {
        console.error('Error al buscar Pokémon por región', error);
        return null;
    }
}

//Función para buscar Pokémon por pokedex
async function searchPokemonByPokedex(pokedex){
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/pokedex/${pokedex}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al buscar Pokémon por región', error);
        return null;
    }
}

//Función para buscar Pokémon por especie
async function searchPokemonBySpecie(pokemonList){
    let urlSpecie = pokemonList.species.url;
    try{
        let response = await fetch(urlSpecie);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al buscar Pokémon por región', error);
        return null;
    }
}