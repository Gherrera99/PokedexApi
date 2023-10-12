async function filtroBusqueda(searchTerm){
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
}