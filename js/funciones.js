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