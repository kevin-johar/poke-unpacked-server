const fs = require('fs');

let idCounter = 1;

async function changeIds() {
  const cards = JSON.parse(fs.readFileSync('poke-cards.json'));
  const newCards = cards.map((card, index) => {
    card.oldId = card.id;
    card.id = index + 1;
    return card;
  });

  console.log(newCards[0]);

  fs.writeFileSync('poke-cards-new-id.json', JSON.stringify([...newCards]), err => {
    // error checking
    if (err) throw err;

    console.log("New data added");
  });
}


changeIds().then(() => {

});
