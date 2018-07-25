const nearbyList = require('../util/nearby.js');
const { Card } = require('dialogflow-fulfillment');
/**
 * Handler for "Nearby" intent
 */
function nearbyHandler(agent) {
  const cardsPromise = getLocationCards();
  console.log('cardsPromise', cardsPromise);
  return cardsPromise
    .then(cards => {
      console.log('Promise resolved');
      agent.add(cards);
      console.log('cards', cards);
    })
    .catch(error => {
      console.log(error);
    });
}

const getLocationCards = () => {
  return nearbyList.then(cb => {
    const loc = { lat: 51.055626763148624, long: 3.722346570642415 };
    const locations = cb(loc);
    const cards2 = locations.map(location => {
      console.log(JSON.stringify(location.name));
      return new Card(location.name.nl[0]).setImage(location.image[0].url);
    });
    console.log('cards2', cards2);
    return cards2;
  });
};
module.exports = nearbyHandler;
