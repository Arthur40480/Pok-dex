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

// Fonction permettant de récupérer les données de chaque pokémon
function fetchAllPokemonData() {
    const pokemonList = [];

    for (let i = 1; i <= 151; i++) {    
        const pokemonData = {};

        fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then(response => response.json())
        .then(data => {
            pokemonData.id =  data.id;
            pokemonData.type = data.types[0].type.name;
            pokemonData.img = data.sprites.front_default;

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}/`)
            .then(response => response.json())
            .then(data => {
                pokemonData.name = data.names.find(name => name.language.name === "fr").name;
            })
            pokemonList.push(pokemonData);
            pokemonList.sort((a, b) => a.id - b.id);
        });
    }
    console.log(pokemonList);
}

fetchAllPokemonData();



