
// On récupère les éléments du DOM
const searchInputElt = document.querySelector('.recherche-pokemon input');
const pokemonContainerElt = document.querySelector('.pokemon-container');


// Ajout d'évènement sur l'input
searchInputElt.addEventListener('input', function(e) {
    if(e.target.value !== "") {
       e.target.parentNode.classList.add('active-input');
    }else if(e.target.value === "") {
        e.target.parentNode.classList.remove('active-input');
    }
})

// Fonction permettant de récupérer l'url des pokémons
function fetchDataPokemonUrl() {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
    .then(response => response.json())
    .then(data => {
        data.results.forEach(pokemonUrl => {
            fetchPokemonData(pokemonUrl);
        });
    });
}

// Fonction qui récupère les données des pokémons via leurs url
function fetchPokemonData(pokemon) {
    const pokemonList = []
    const pokemonUrl = pokemon.url;
    
    fetch(pokemonUrl)
    .then(response => response.json())
    .then(data => {
        const pokemonFullData = {};
        pokemonFullData.id = data.id;
        pokemonFullData.type = data.types[0].type.name;
        pokemonFullData.img = data.sprites.front_default;
        pokemonFullData.name = fetchFrenchPokemonName(pokemonFullData);
        pokemonList.push(pokemonFullData);    
    })
    console.log(pokemonList);
}

// Fonction qui récupère le nom français du pokemon via son id
function fetchFrenchPokemonName(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
    .then(response => response.json())
    .then(data => {
        pokemon.name = data.names.find(name => name.language.name === "fr").name;
    })
};


fetchDataPokemonUrl();

