// Manejador de eventos para el botón "Pokemons"
pokemonBtn.addEventListener('click', async () => {
    clearContent();
    document.getElementById('toggle').classList.remove('contenido-principal');
    offset = 0; // Reiniciamos el offset
    let pokemonList = await fetchPokemonData(offset, limit);
    await fillPokemonTable(pokemonList);
    pokemonTable.style.display = 'block';
    updatePaginationButtons();
});

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


// Manejador de eventos para el botón "Movimientos"
movimientosBtn.addEventListener('click', async () => {
    clearContent();
    document.getElementById('toggle').classList.remove('contenido-principal');
    offset = 0; // Reiniciamos el offset
    let movesList = await fetchMovesData(offset, limit);
    await fillMovesTable(movesList);
    movesTable.style.display = 'block';
    updateMovesPaginationButtons();
});

/*Pokemons table code ends*/

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

// Manejador de eventos para el botón de búsqueda
searchBtn.addEventListener('click', async () => {
    document.getElementById('toggle').classList.remove('contenido-principal');
    document.getElementById('centrado').classList.add('centrado__busqueda');
    let searchTerm = searchInput.value.trim();
    searchInput.value = '';
    clearContent();
    await filtroBusqueda(searchTerm);
});

elegirBtn.addEventListener('click', () =>{
    const eventoClick = new MouseEvent('click', {
        bubbles: true,  // Permite que el evento burbujee
        cancelable: true,
        view: window
    })
    pokemonBtn.dispatchEvent(eventoClick);
})

eleMvBtn.addEventListener('click', () =>{
    const eventoClick = new MouseEvent('click', {
        bubbles: true,  // Permite que el evento burbujee
        cancelable: true,
        view: window
    })
    movimientosBtn.dispatchEvent(eventoClick);
})