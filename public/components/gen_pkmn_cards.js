class PkmnCard {
    firstGen = [];
    secondGen = [];
    thirdGen = [];

    constructor() {
        console.log("\nClasse PkmnCard criada.\n");
    }

    async getFirstGen() {
        const response = await fetch('/first_gen');
        this.firstGen = await response.json();
    }

    getAllUsedPkmn() {

    }

    addUsedPkmn(checkBoxId) {
        const requestedPkmn = this.firstGen[checkBoxId];
        const pkmnId = requestedPkmn.pokedex_number;
        const pkmnName = requestedPkmn.pkname;

        const popup = document.getElementById("popup");

        const sendButton = document.getElementById("sendPkmn");
        
        sendButton.addEventListener("click", () => {
            const game = document.getElementById("game").value;
            const runNumber = document.getElementById("runNumber").value;
            const used_in = document.getElementById("runDate").value;

            const data = { pkmnId, pkmnName, game, runNumber, used_in };
            console.log(data);
            //pokemon.id, pokemon.name, pokemon.game, pokemon.run, pokemon.used_in
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            };

            fetch('/pokemon', options);
        });

        const closeButton = document.getElementById("closePopup");
        closeButton.addEventListener("click", () => {
            popup.classList.remove("open");
        });

        popup.classList.add("open");
    }

    renderGenCard(generation) {
        if (!(Array.isArray(generation) && generation.length > 0)) {
            console.log("\nArray não populado corretamente\n");
            return;
        }

        const cardsSection = document.getElementById("pkmnCards");

        generation.forEach(pkmn => {
            const newCard = document.createElement("span");
            newCard.id = "newCard";

            const pkmnId = document.createElement("h6");
            const formatedDexNumber = pkmn.pokedex_number.toString().padStart(3, '0');
            pkmnId.appendChild(document.createTextNode("No" + formatedDexNumber));
            pkmnId.id = "dex_number";

            const pkmnName = document.createElement("h6");
            const pkName = pkmn.pkname;
            const formatedPkmnName = pkName.charAt(0).toUpperCase() + pkName.slice(1);
            pkmnName.appendChild(document.createTextNode(formatedPkmnName));
            pkmnName.id = "pkmn_name";

            const pkmnIcon = new Image;
            pkmnIcon.src = pkmn.sprite;
            pkmnIcon.id = "pkmn_sprite";

            pkmnIcon.className = "img-fluid rounded-circle border border-dark border-3";
            //Width has to be defined here for some reason:
            pkmnIcon.style = "width: 90px";

            newCard.appendChild(pkmnIcon);
            newCard.appendChild(pkmnId);
            newCard.appendChild(pkmnName);

            const firstType = document.createElement("h6");
            firstType.id = "first_type";
            firstType.appendChild(document.createTextNode(pkmn.types[0].type.name))
            newCard.appendChild(firstType);
            if (pkmn.types.length == 2) {
                const secondType = document.createElement("h6");
                secondType.id = "second_type";
                secondType.appendChild(document.createTextNode(pkmn.types[1].type.name));
                newCard.appendChild(secondType);
            }

            const checkBox = document.createElement("input");
            checkBox.id = `${pkmn.pokedex_number - 1}`;
            checkBox.className = "check_box";
            checkBox.type = "checkbox";

            //Need to pass an anonymous function to click events when calling a function with params:
            checkBox.addEventListener('click', () => {
                this.addUsedPkmn(checkBox.id);
            });

            newCard.appendChild(checkBox);

            cardsSection.appendChild(newCard);
        })
    }
}

const pkmnCard = new PkmnCard();

window.onload = function () {
    pkmnCard.getFirstGen().then(() => {
        pkmnCard.renderGenCard(pkmnCard.firstGen);
    });
};
