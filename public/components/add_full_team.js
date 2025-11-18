const pkmnToAdd = [];

const popup = document.getElementById("full_team_popup");
const teamSelection = document.getElementById("full_team_selection");
const fullTeamBtn = document.getElementById("full_team_btn");
const exitBtn = document.getElementById("closePopupFullTeam");
const sendBtn = document.getElementById("sendPkmnFullTeam");

teamSelection.addEventListener("click", (event) => {
    const clickedButton = event.target.id;

    const chosenPkmn = prompt("Please enter the NAME or DEX NUMBER of the Pokemon: ");

    pushPokemon(chosenPkmn, clickedButton);
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

async function pushPokemon(chosenPkmn, clickedButton) {
    const response = await fetch(`/pokemon_api/${chosenPkmn}`);
    const data = await response.json();

    let pkmnInfo = {
        id: data.id,
        name: data.name,
        game: undefined,
        run: undefined,
        used_in: undefined
    };

    console.log("\nAdding Pokemon: " + data.name);

    const pkmnIcon = new Image;
    pkmnIcon.src = data.sprites.other["official-artwork"].front_default;

    const iconSrc = data.sprites.other["official-artwork"].front_default;

    //PAREI AQUI:
    const square = document.getElementById(clickedButton)
    square.style = "background: url(iconSrc)";

    /* square.innerHTML = "";
    square.innerHTML = "< img src = 'iconSrc' >"; */

    pkmnToAdd.push(pkmnInfo);
}

async function addFullTeam() {

}