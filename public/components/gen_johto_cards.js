import { PkmnCard } from './pkmn_card.js';

const johtoCard = new PkmnCard();

window.onload = function () {
    johtoCard.getCurrentGen('/second_gen').then(() => {
        johtoCard.renderGenCard();
    });
};

const cardsSection = document.getElementById("pkmnCards");

cardsSection.addEventListener("click", (event) => {
    const clickedPkmnIcon = event.target.id;

    let formatedId = clickedPkmnIcon - 152;

    johtoCard.renderPopup(formatedId);

    /* console.log("\nClick in Icon: " + clickedPkmnIcon);
    console.log("\nPokemon selected: " + johtoCard.currentGen[formatedId].pkname);
    console.log("\nArray position: " + formatedId);*/
})

document.getElementById("first_gen").onclick = () => {
    location.href = "index.html";
};

document.getElementById("third_gen").onclick = () => {
    location.href = "third_gen.html";
}