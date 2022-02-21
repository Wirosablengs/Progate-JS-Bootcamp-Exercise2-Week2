const poke_container = document.getElementById('poke_container');
const pokemon_number = 30;
const colors = {
    fire: '#FC4F4F',
	grass: '#A7DB8D',
	electric: '#FAE078',
	water: '#94DBEE',
	ground: '#EBD69D',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#7882a4',
	bug: '#C6D16E',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#C6B7F5',
	fighting: '#E6E0D4',
	normal: '#EEEEEE'
};

const main_types = Object.keys(colors);

async function fetchPokemons() {
    for (let i = 1; i <= pokemon_number; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);   
}

const fetchClick = document.getElementById('myBtn');
fetchClick.addEventListener('click', fetchPokemons);

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(el => el.type.name);
    const type = main_types.find (
        type => {
            return poke_types.indexOf(type) > -1;
        }
    );
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];
    pokemonEl.style.backgroundColor = color;

    const pokeInnerHTML = `
        <div class='img-container'>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" />
        </div>
        <div class='info'>
            <span class="number">#${pokemon.id.toString().padStart(2, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>        
    `;

    pokemonEl.innerHTML= pokeInnerHTML;

    poke_container.appendChild(pokemonEl);
}
