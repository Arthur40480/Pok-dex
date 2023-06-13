
// On récupère les éléments du DOM
const searchInputElt = document.querySelector('.recherche-pokemon input')

// Ajout d'évènement sur l'input
searchInputElt.addEventListener('input', function(e) {
    if(e.target.value !== "") {
       e.target.parentNode.classList.add('active-input');
    }else if(e.target.value === "") {
        e.target.parentNode.classList.remove('active-input');
    }
})

function addPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}

addPokemon();