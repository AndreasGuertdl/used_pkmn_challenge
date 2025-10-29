window.onload = function () {
    fetch('/first_gen').then(response => {
        response.json().then(firstGen => {
            const cardsSection = document.getElementById("pkmnCards");

            firstGen.forEach(pkmn => {
                const newCard = document.createElement("div");

                const pkmnId = document.createTextNode(pkmn.pokedex_number);
                const pkmnName = document.createTextNode(pkmn.pkname);

                const pkmnIcon = new Image;
                pkmnIcon.src = pkmn.sprite;

                newCard.appendChild(pkmnIcon);
                newCard.appendChild(pkmnId);
                newCard.appendChild(pkmnName);

                if(pkmn.types.length == 1){
                    const type = document.createTextNode(type);
                    newCard.appendChild(type);
                }else{
                    const firstType = document.createTextNode(pkmn.types[0].type.name);
                    const secondType = document.createTextNode(pkmn.types[1].type.name);
                    newCard.appendChild(firstType);
                    newCard.appendChild(secondType);
                }

                cardsSection.appendChild(newCard);
                //document.body.insertBefore(newCard, cardsSection);
            })
        })
    })
}