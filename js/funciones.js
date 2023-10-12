// Función para llenar la tabla con datos de Pokémon con pokemonBtn
async function fillPokemonTable(pokemonList) {
    let pokemonDetailsPromises = pokemonList.map(async (pokemon) => {
        let response = await fetch(pokemon.url);
        return response.json();
    });

    let pokemonDetails = await Promise.all(pokemonDetailsPromises);

    pokemonData.innerHTML = '';
    // Crea la fila de encabezado de la tabla
    let headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>ID</th>
        <th>Pokémon</th>
        <th>Nombre</th>
        <th>Tipo</th>
        <th>Generación</th>
        <th>Región(es)</th>
    `;
    pokemonData.appendChild(headerRow);

    for (const data of pokemonDetails) {
        let row = document.createElement('tr');
        let pokemon = await searchPokemonByName(data.name);
        let pokeSpecie = await searchPokemonBySpecie(pokemon);
        let regiones = await obtenerRegiones(pokeSpecie);
        row.innerHTML = `
            <td>${data.id}</td>
            <td><img src="${data.sprites.front_default}"></td>
            <td>${data.name}</td>
            <td>${data.types.map(type => type.type.name).join(', ')}</td>
            <td>${pokeSpecie.generation.name}</td>
            <td>${regiones.map(region => region).join(', ')}</td>
        `;
        pokemonData.appendChild(row);
    }
}

// Función para actualizar los botones de paginación
function updatePaginationButtons() {
    prevBtn.disabled = offset === 0;
    nextBtn.disabled = offset >= 900; // Límite arbitrario de Pokémon (debes ajustarlo)
}

// Función para actualizar los botones de paginación de movimientos
function updateMovesPaginationButtons() {
    movesPrevBtn.disabled = offset === 0;
    movesNextBtn.disabled = offset >= 164; // Límite arbitrario de movimientos (ajusta según tus necesidades)
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

// Función para mostrar la tabla de Pokémon de búsqueda
async function showPokemonTable(pokemonList, busquedaTipo) {
    // Ocultar otros contenidos y mostrar la tabla de Pokémon
    content.style.display = 'none';
    movesTable.style.display = 'none';
    searchResults.style.display = 'block';

    // Construir la tabla de resultados
    searchResults.innerHTML = '<h1 style="text-align: center">Resultados de la Búsqueda</h1>';

    if(busquedaTipo !== 'nombre'){
        crearTabla(pokemonList, busquedaTipo);
    } else{
        return showPokemonDetails(pokemonList);
    }
}

// Función para mostrar detalles de un Pokémon
async function showPokemonDetails(pokemonData) {
    let pokeSpecie = await searchPokemonBySpecie(pokemonData);
    console.log(pokeSpecie.generation.name);
    // console.log(pokeSpecie.pokedex_numbers[0].pokedex.name);
    let regiones = await obtenerRegiones(pokeSpecie);
    console.log(regiones);

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
        <p>Generación: ${pokeSpecie.generation.name}</p>
        <p>Región(es): ${regiones.map(region => region).join(', ')}</p>
    `;
}

//Crea la tabla de las busquedas
function crearTabla(pokemonList, busquedaTipo){
    let table = document.createElement('table');
    // table.id = "pokemonsByTypeTable";
    table.classList.add('dataInfo');

    // Crea la fila de encabezado de la tabla
    let headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>ID</th>
        <th>Nombre</th>
    `;
    table.appendChild(headerRow);

    // Agrega filas para cada Pokémon encontrado
    if(busquedaTipo === 'tipo'){
        pokemonList.forEach((pokemon) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${pokemon.pokemon.url.split('/')[6]}</td>
                <td>${pokemon.pokemon.name}</td>
            `;

            table.appendChild(row);
        });
    } else if(busquedaTipo === 'generacion') {
        pokemonList.forEach((pokemon_species) => {
            let row = document.createElement('tr');
            row.innerHTML = `
            <td>${pokemon_species.url.split('/')[6]}</td>
            <td>${pokemon_species.name}</td>
        `;
            table.appendChild(row);
        });
    } else if(busquedaTipo === 'region'){
        pokemonList.forEach((pokemon_entries) => {
            let row = document.createElement('tr');
            row.innerHTML = `
            <td>${pokemon_entries.pokemon_species.url.split('/')[6]}</td>
            <td>${pokemon_entries.pokemon_species.name}</td>
        `;
            table.appendChild(row);
        });
    }
    // Agrega la tabla al panel de resultados
    searchResults.appendChild(table);
}


//Función que elimina el contenido del main
function clearContent() {
    content.innerHTML = '';
    content2.innerHTML = '';
    pokemonData.innerHTML = '';
    movesData.innerHTML = '';
    content.style.display = 'none';
    pokemonTable.style.display = 'none';
    movesTable.style.display = 'none';
    searchResults.innerHTML = '';
}