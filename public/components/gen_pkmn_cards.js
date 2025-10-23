window.onload = function () {
    fetch('/first_gen').then(response => {
        response.json().then(firstGen => {
            const cardsSection = document.getElementById("pkmnCards");
            
            firstGen.forEach(pkmn => {
                const newCard = document.createElement("div");
                
                const newContent = document.createTextNode(pkmn.pkname);

                newCard.appendChild(newContent);

                document.body.insertBefore(newCard, cardsSection);
            })
        })
    })
}