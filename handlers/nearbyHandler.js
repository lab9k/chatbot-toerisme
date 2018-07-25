const nearbyList = require('../util/nearby.js');
const { Card } = require('dialogflow-fulfillment');
/**
 * Handler for "Nearby" intent
 */
function nearbyHandler(agent) {
  const cardsPromise = getLocationCards();
  return cardsPromise
    .then(cards => {
      agent.add(cards);
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
      return new Card(location.name.nl[0]).setImage('https://www.photoenlarger.com/ajax.php?task=download&uid=5b586865ed853&fileName=ghent-1139784_960_720.v2.jpg');
    });
    return cards2;
  });
};
module.exports = nearbyHandler;
