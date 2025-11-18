import { PkmnCard } from './pkmn_card.js';

const kantoCard = new PkmnCard();

window.onload = function () {
    kantoCard.getCurrentGen('/first_gen').then(() => {
        kantoCard.renderGenCard();
    });
};

const cardsSection = document.getElementById("pkmnCards");

cardsSection.addEventListener("click", (event) => {
    const clickedPkmnIcon = event.target.id;

    console.log("\nClick in Icon: " + clickedPkmnIcon);
    console.log("\nPokemon selected: " + kantoCard.currentGen[clickedPkmnIcon].pkname);

    const pkmnId = kantoCard.currentGen[clickedPkmnIcon].pokedex_number

    kantoCard.renderPopup(pkmnId - 2);
})

document.getElementById("second_gen").onclick = () => {
    location.href = "second_gen.html";
};

document.getElementById("third_gen").onclick = () => {
    location.href = "third_gen.html";
}