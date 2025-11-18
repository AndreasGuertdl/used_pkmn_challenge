import { PkmnCard } from './pkmn_card.js';

const hoennCard = new PkmnCard();

window.onload = function () {
    hoennCard.getCurrentGen('/third_gen').then(() => {
        hoennCard.renderGenCard();
    });
};

const cardsSection = document.getElementById("pkmnCards");

cardsSection.addEventListener("click", (event) => {
    const clickedPkmnIcon = event.target.id;

    let formatedId = clickedPkmnIcon - 252;

    hoennCard.renderPopup(formatedId);

    /* console.log("\nClick in Icon: " + clickedPkmnIcon);
    console.log("\nPokemon selected: " + johtoCard.currentGen[formatedId].pkname);
    console.log("\nArray position: " + formatedId);*/
})

document.getElementById("first_gen").onclick = () => {
    location.href = "index.html";
};

document.getElementById("second_gen").onclick = () => {
    location.href = "second_gen.html";
};