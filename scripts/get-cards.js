const axios = require('axios');
const fs = require('fs');

const address = 'https://api.pokemontcg.io/v2/cards?page=';
let counter = 1;

async function getCards(prevCards) {
  console.log('Page #', counter, " - ", address+counter);
  const { data: res } = await axios.get(address + counter);
  const { data: nextCards, count } = res;
  const combinedCards = [...prevCards, ...nextCards];

  if (count !== 250) {
    fs.writeFileSync('poke-cards.json', JSON.stringify([...combinedCards]), err => {
      // error checking
      if (err) throw err;

      console.log("New data added");
    });
    return combinedCards;
  }

  counter++;
  return await getCards(combinedCards);
}

getCards([]).then((cards) => {
  console.log(cards.length);
});
