class FullTeamPopup {
    //maximo de 6 elementos:
    pkmnToAdd = [];

    constructor() {
        const popup = document.getElementById("full_team_popup");
        const teamSelection = document.getElementById("full_team_selection");
        const fullTeamBtn = document.getElementById("full_team_btn");
        const exitBtn = document.getElementById("closePopupFullTeam");
        const sendBtn = document.getElementById("sendPkmnFullTeam");

        teamSelection.addEventListener("click", async (event) => {
            const clickedButton = event.target.id;

            const chosenPkmn = prompt("Please enter the NAME or DEX NUMBER of the Pokemon: ");

            if (chosenPkmn) {
                let isIn = await this.isPokemonPushed(chosenPkmn);
                //Pq 'isIn' retorna falso independente do resultado?
                console.log("\nBoolean Value: " + isIn);
                if (isIn) {
                    alert("This Pokemon is alreay on your Team!");
                } else {
                    this.pushPokemon(chosenPkmn, clickedButton);
                }
            }

            event.stopImmediatePropagation();
        });

        fullTeamBtn.addEventListener("click", () => {
            popup.classList.add("open")
        });

        exitBtn.addEventListener("click", () => {
            popup.classList.remove("open");
        });

        sendBtn.addEventListener("click", () => {
            alert("Oiiiiii");
            popup.classList.remove("open");
        })
    }

    async isPokemonPushed(id) {
        console.log("\nPrintando Pokemons do array: ");
        this.pkmnToAdd.map((pkmn) => {
            console.log("- " + pkmn.name + "\n");
        })

        this.pkmnToAdd.map(async (pkmn) => {
            console.log("\Checando este ID no array: " + pkmn.id);
            console.log("\nIs " + pkmn.id + "==" + id + " ?");
            if (pkmn.id == id) {
                console.log("\nIt is equal!");
                return true;
            }
        });

        return false;
    }

    async pushPokemon(chosenPkmn, clickedButton) {
        const response = await fetch(`/pokemon_api/${chosenPkmn}`);
        const data = await response.json();

        let pkmnInfo = {
            id: data.id,
            name: data.name,
            game: undefined,
            run: undefined,
            used_in: undefined
        };

        const pkmnIcon = new Image;
        pkmnIcon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
        pkmnIcon.style = "width:100%";

        const clickedButtonId = `pkmnIconSpan${clickedButton}`;

        const squareBtn = document.getElementById(clickedButtonId)
        //Quando apago o textContent ele buga ao tentar adicionar outro Pokemon
        //TypeError: can't access property "textContent", squareBtn is null
        squareBtn.textContent = '';
        squareBtn.appendChild(pkmnIcon);

        this.pkmnToAdd.push(pkmnInfo);
    }

    async addFullTeam() {

    }
}

const teamHandler = new FullTeamPopup();