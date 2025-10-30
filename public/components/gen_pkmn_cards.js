window.onload = function () {
    fetch('/first_gen').then(response => {
        response.json().then(firstGen => {
            const cardsSection = document.getElementById("pkmnCards");

            firstGen.forEach(pkmn => {
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
                checkBox.id = "check_box";
                checkBox.type = "checkbox";
                /* checkBox.disabled = false; */

                newCard.appendChild(checkBox);

                cardsSection.appendChild(newCard);
            })
        })
    })
}