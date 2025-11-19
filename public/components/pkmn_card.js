export class PkmnCard {
    currentGen = [];

    async getCurrentGen(url) {
        const response = await fetch(url);

        this.currentGen = await response.json();

        return this.currentGen;
    }

    async isInDb(id) {
        const response = await fetch(`/pokemon/${id}`);

        const dbResult = await response.json();

        return "id" in dbResult;
    }

    addUsedPkmn(id) {
        const pkmnData = this.currentGen[id];
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

            alert(pkmnName + " Adicionado com sucesso!");
        } catch (err) {
            alert(err);
        }
    }

    renderPopup(id) {
        const requestedPkmn = this.currentGen[id];

        const pkmnId = requestedPkmn.pokedex_number;
        const formatedDexNumber = pkmnId.toString().padStart(3, '0');

        const pkName = requestedPkmn.pkname;
        const formatedPkmnName = pkName.charAt(0).toUpperCase() + pkName.slice(1);
        //console.log("\nID passado para renderPopup: " + id);
        //console.log("\nRendering popup for pokemon:" + pkmnId + pkName);

        const paragraph = document.getElementById("requested_pkmn");
        paragraph.innerHTML = "No" + formatedDexNumber + " " + formatedPkmnName;
        paragraph.style.fontWeight = 'bold';

        const popup = document.getElementById("popup");

        const sendButton = document.getElementById("sendPkmn");

        //Esta porcao do codigo abaixo eh a solucao para que o eventlistener para 'addUsedPkmn' so seja chamada 1 vez por button press
        if (this.currentListener) {
            sendButton.removeEventListener("click", this.currentListener);
        }
        const newListener = () => {
            this.addUsedPkmn(id);
            popup.classList.remove("open");
        }
        sendButton.addEventListener("click", newListener);
        this.currentListener = newListener;
        //

        const closeButton = document.getElementById("closePopup");
        closeButton.addEventListener("click", () => {
            popup.classList.remove("open");
        });

        popup.classList.add("open");
    }

    renderGenCard() {
        const cardsSection = document.getElementById("pkmnCards");

        this.currentGen.map(async (pkmn) => {
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
    }
}