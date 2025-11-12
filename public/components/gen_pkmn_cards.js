class PkmnCard {
    firstGen = [];
    secondGen = [];
    thirdGen = [];
    currentListener = null;

    constructor() {
        console.log("\nClasse PkmnCard criada.\n");
    }

    async getFirstGen() {
        const response = await fetch('/first_gen');

        this.firstGen = await response.json();

        return this.firstGen;
    }

    async isInDb(id) {
        const response = await fetch(`/pokemon/${id}`);
        const dbResult = await response.json();

        return "id" in dbResult;
    }

    getAllUsedPkmn() {

    }

    addUsedPkmn(id) {
        const pkmnData = this.firstGen[id];
        const pkmnId = pkmnData.pokedex_number;
        const pkmnName = pkmnData.pkname;
        const game = document.getElementById("game").value;
        const runNumber = document.getElementById("runNumber").value;
        const used_in = document.getElementById("runDate").value;

        const data = { pkmnId, pkmnName, game, runNumber, used_in };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };

        try {
            fetch('/pokemon', options);

            const iconId = `${pkmnId}`;
            const icon = document.getElementById(iconId);

            icon.classList.remove("not_used");
            icon.classList.add("used");
        } catch (err) {
            alert(err);
        }
    }

    renderPopup(id) {
        const requestedPkmn = this.firstGen[id];

        const pkmnId = requestedPkmn.pokedex_number;
        const formatedDexNumber = pkmnId.toString().padStart(3, '0');

        const pkName = requestedPkmn.pkname;
        const formatedPkmnName = pkName.charAt(0).toUpperCase() + pkName.slice(1);

        const paragraph = document.getElementById("requested_pkmn");
        paragraph.innerHTML = "No" + formatedDexNumber + " " + formatedPkmnName;
        paragraph.style.fontWeight = 'bold';

        const popup = document.getElementById("popup");

        const sendButton = document.getElementById("sendPkmn");
        
        //Esta porcao do codigo abaixo eh a solucao para que o eventlistener para 'addUsedPkmn' so seja chamada 1 vez por button press
        if(this.currentListener){
            sendButton.removeEventListener("click", this.currentListener);
        }

        const newListener = () =>{
            this.addUsedPkmn(pkmnId - 1);
            popup.classList.remove("open");
        }

        sendButton.addEventListener("click", newListener);

        this.currentListener = newListener;

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

        generation.map(async (pkmn) => {
            const newCard = document.createElement("span");
            newCard.id = "newCard";

            const pkmnId = document.createElement("h6");
            const formatedDexNumber = pkmn.pokedex_number.toString().padStart(3, '0');
            pkmnId.appendChild(document.createTextNode("No" + formatedDexNumber));
            pkmnId.id = "dex_number";

            const pkmnIcon = new Image;
            pkmnIcon.src = pkmn.sprite;
            pkmnIcon.className = "pkmn_sprite";
            pkmnIcon.setAttribute('id', `${pkmn.pokedex_number}`);
            pkmnIcon.style = "width: 90px";

            /* pkmnIcon.addEventListener('click', () => {
                this.renderPopup(pkmnIcon.id - 1);
            }); */

            newCard.appendChild(pkmnId);
            newCard.appendChild(pkmnIcon);
            cardsSection.appendChild(newCard);

            const inDb = await this.isInDb(pkmn.pokedex_number);
            if (inDb) {
                pkmnIcon.classList.add("used");
            } else {
                pkmnIcon.classList.add("not_used");
            }
        })

        cardsSection.addEventListener("click", (event) => {
            const clickedPkmnIcon = event.target.id;

            const pkmnId = generation[clickedPkmnIcon].pokedex_number

            this.renderPopup(pkmnId - 2);
        })
    }
}

const pkmnCard = new PkmnCard();

window.onload = function () {
    pkmnCard.getFirstGen().then(() => {
        pkmnCard.renderGenCard(pkmnCard.firstGen);
    });
};


