const content = document.getElementById('content');
const pokemonBtn = document.getElementById('pokemonBtn');
const movimientosBtn = document.getElementById('movimientosBtn');

/*Pokemons table code*/

const pokemonTable = document.getElementById('pokemonTable');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pokemonData = document.getElementById('pokemonData');
const inicioBtn = document.getElementById('inicioBtn');
const homeBtn = document.getElementById('homeBtn');

let offset = 0;
const limit = 60;

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

// Función para llenar la tabla con datos de Pokémon
async function fillPokemonTable(pokemonList) {
    let pokemonDetailsPromises = pokemonList.map(async (pokemon) => {
        let response = await fetch(pokemon.url);
        return response.json();
    });

    let pokemonDetails = await Promise.all(pokemonDetailsPromises);

    pokemonData.innerHTML = '';
    pokemonDetails.forEach((data) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.id}</td>
            <td><img src="${data.sprites.front_default}"></td>
            <td>${data.name}</td>
            <td>${data.types.map(type => type.type.name).join(', ')}</td>
        `;
        pokemonData.appendChild(row);
    });
}

// Manejador de eventos para el botón "Pokemons"
pokemonBtn.addEventListener('click', async () => {
    clearContent();
    offset = 0; // Reiniciamos el offset
    let pokemonList = await fetchPokemonData(offset, limit);
    await fillPokemonTable(pokemonList);
    pokemonTable.style.display = 'block';
    updatePaginationButtons();
});

// Función para actualizar los botones de paginación
function updatePaginationButtons() {
    prevBtn.disabled = offset === 0;
    nextBtn.disabled = offset >= 900; // Límite arbitrario de Pokémon (debes ajustarlo)
}

// Manejador de eventos para el botón "Anterior"
prevBtn.addEventListener('click', async () => {
    if (offset > 0) {
        offset -= limit;
        let pokemonList = await fetchPokemonData(offset, limit);
        await fillPokemonTable(pokemonList);
        updatePaginationButtons();
    }
});

// Manejador de eventos para el botón "Siguiente"
nextBtn.addEventListener('click', async () => {
    offset += limit;
    let pokemonList = await fetchPokemonData(offset, limit);
    await fillPokemonTable(pokemonList);
    updatePaginationButtons();
});

/*Pokemons table code ends*/

/*Movements table code*/

const movesTable = document.getElementById('movesTable');
const movesPrevBtn = document.getElementById('movesPrevBtn');
const movesNextBtn = document.getElementById('movesNextBtn');
const movesData = document.getElementById('movesData');

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

// Función para llenar la tabla de movimientos con datos
async function fillMovesTable(movesList) {
    const movesDetailsPromises = movesList.map(async (move) => {
        let response = await fetch(move.url);
        return response.json();
    });

    const movesDetails = await Promise.all(movesDetailsPromises);

    movesData.innerHTML = '';
    movesDetails.forEach((data) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.type.name}</td>
        `;
        movesData.appendChild(row);
    });
}

// Manejador de eventos para el botón "Movimientos"
movimientosBtn.addEventListener('click', async () => {
    clearContent();
    offset = 0; // Reiniciamos el offset
    let movesList = await fetchMovesData(offset, limit);
    await fillMovesTable(movesList);
    movesTable.style.display = 'block';
    updateMovesPaginationButtons();
});

// Función para actualizar los botones de paginación de movimientos
function updateMovesPaginationButtons() {
    movesPrevBtn.disabled = offset === 0;
    movesNextBtn.disabled = offset >= 164; // Límite arbitrario de movimientos (ajusta según tus necesidades)
}

// Manejador de eventos para el botón "Anterior" de movimientos
movesPrevBtn.addEventListener('click', async () => {
    if (offset > 0) {
        offset -= limit;
        let movesList = await fetchMovesData(offset, limit);
        await fillMovesTable(movesList);
        updateMovesPaginationButtons();
    }
});

// Manejador de eventos para el botón "Siguiente" de movimientos
movesNextBtn.addEventListener('click', async () => {
    offset += limit;
    const movesList = await fetchMovesData(offset, limit);
    await fillMovesTable(movesList);
    updateMovesPaginationButtons();
});

/*Movements table code ends*/

/*Search Button actions*/

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

// Manejador de eventos para el botón de búsqueda
searchBtn.addEventListener('click', async () => {
    let searchTerm = searchInput.value.trim();
    clearContent();
    let busquedaTipo = '';

    if (searchTerm === '') {
        alert('Ingresa un término de búsqueda válido.');
        return;
    }

    //Búsqueda por tipo
    let pokemonList = await searchPokemonByType(searchTerm.toLowerCase());
    if (pokemonList) {
        busquedaTipo = 'tipo';
        console.log(pokemonList);
        await showPokemonTable(pokemonList, busquedaTipo);
    } else{
        pokemonList = await searchPokemonByGeneration(searchTerm.toLowerCase());
        if(pokemonList){
            busquedaTipo = 'generacion'
            console.log(pokemonList);
            await showPokemonTable(pokemonList, busquedaTipo);
        } else{
            pokemonList = await searchPokemonByName(searchTerm.toLowerCase());
            if(pokemonList) {
                let pokeSpecie = await searchPokemonBySpecie(pokemonList);
                console.log(pokeSpecie.generation.name);
                // console.log(pokeSpecie.pokedex_numbers[0].pokedex.name);
                let regiones = await obtenerRegiones(pokeSpecie);
                console.log(regiones);
                busquedaTipo = 'nombre'
                console.log(pokemonList);
                await showPokemonTable(pokemonList, busquedaTipo);
            } else{
                let pokedex= await searchPokemonByRegion(searchTerm.toLowerCase());
                console.log(pokedex);
                pokemonList = await searchPokemonByPokedex(pokedex);
                if(pokemonList) {
                    busquedaTipo = 'region'
                    console.log(pokemonList);
                    await showPokemonTable(pokemonList.pokemon_entries, busquedaTipo);
                }
            }
        }
    }
});


// Función para buscar Pokémon por tipo
async function searchPokemonByType(type) {
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

// Función para mostrar la tabla de Pokémon
async function showPokemonTable(pokemonList, busquedaTipo) {
    // Ocultar otros contenidos y mostrar la tabla de Pokémon
    content.style.display = 'none';
    movesTable.style.display = 'none';
    searchResults.style.display = 'block';

    // Construir la tabla de resultados
    searchResults.innerHTML = '<h1>Resultados de la Búsqueda</h1>';

    // if (pokemonList.length === 0) {
    //     let pokemonData = pokemonList;
    //
    //     if (pokemonData) {
    //         // showPokemonTable(pokemonData);
    //         return showPokemonDetails(pokemonData);
    //     } else {
    //         alert('No se encontró ningún Pokémon.');
    //         searchResults.innerHTML += '<p>No se encontró ningún Pokémon.</p>';
    //     }
    // }
    if(busquedaTipo !== 'nombre'){
        crearTabla(pokemonList, busquedaTipo);
    } else{
        return showPokemonDetails(pokemonList);
    }
}



// Función para mostrar detalles de un Pokémon
function showPokemonDetails(pokemonData) {
    // Ocultar otros contenidos y mostrar detalles del Pokémon
    content.style.display = 'none';
    movesTable.style.display = 'none';
    searchResults.style.display = 'block'

    // Construir la información del Pokémon y mostrarla en el panel principal
    searchResults.innerHTML = `
        <h1>Resultados de la Búsqueda</h1>
        <h2>${pokemonData.name.toUpperCase()}</h2>
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p>Altura: ${pokemonData.height / 10} m</p>
        <p>Peso: ${pokemonData.weight / 10} kg</p>
        <p>Tipo(s): ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
        
    `;
}

/*Search Button actions ends*/

homeBtn.addEventListener('click', () => {
    goToHome();
});

inicioBtn.addEventListener('click', () => {
    goToHome();
});

function goToHome() {
    clearContent();
    content.style.display = 'block';
    content.innerHTML = `
        <h1>Bienvenido a Mi Página Web</h1>
        <p>En esta pagina encontraras informacion util acerca de los Pokemon</p>
    `;
}

function clearContent() {
    content.innerHTML = '';
    pokemonData.innerHTML = '';
    movesData.innerHTML = '';
    content.style.display = 'none';
    pokemonTable.style.display = 'none';
    movesTable.style.display = 'none';
    searchResults.innerHTML = '';
}
