// Importation de mon tableau de couleur
import { typeColors } from "./colors.js";

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
});

// Fonction permettant de récupérer les données de chaque pokémon
async function fetchAllPokemonData() {
    const pokemonList = [];

    for (let i = 1; i <= 151; i++) {    
        const pokemonData = {};

        await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
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
    };
    displayPokemon(pokemonList);
};

// Fonction permettant de créer les éléments html pour afficher les pokémons
function displayPokemon(pokemonList) {
    pokemonList.forEach(pokemon => {
        const cardPokemonElt = document.createElement('div');
        cardPokemonElt.classList.add('pokemon-card');
        cardPokemonElt.classList.add(pokemon.type);
        const cardColor = typeColors.find(type => type.type === pokemon.type).color;
        const typeTraduction = typeColors.find(type => type.type === pokemon.type).traduction;
        cardPokemonElt.style.border = `5px solid ${cardColor}`;
        cardPokemonElt.style.boxShadow = `2px 2px 20px ${cardColor}`;
        
        
        const imgPokemonElt = document.createElement('img');
        imgPokemonElt.classList.add('img-pokemon');
        imgPokemonElt.src = pokemon.img;
        
        const informationContainerElt = document.createElement('div');
        informationContainerElt.classList.add('container-information');

        const pokemonIdElt = document.createElement('p');
        pokemonIdElt.classList.add('pokemon-id');
        pokemonIdElt.innerText = '#' + pokemon.id;

        const pokemonNameElt = document.createElement('p');
        pokemonNameElt.classList.add('pokemon-name');
        pokemonNameElt.innerText = pokemon.name;

        const pokemonTypeElt = document.createElement('p');
        pokemonTypeElt.classList.add('pokemon-type');
        pokemonTypeElt.innerText = `${pokemon.type} || ${typeTraduction}`;
        
        informationContainerElt.append(pokemonNameElt, pokemonTypeElt);
        cardPokemonElt.append(pokemonIdElt, imgPokemonElt, informationContainerElt);
        pokemonContainerElt.append(cardPokemonElt);
    });
};

fetchAllPokemonData();

