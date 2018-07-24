const nearby = require('../util/nearby.js');
const { Card } = require('dialogflow-fulfillment');
/**
 * Handler for "Nearby" intent
 */
function nearbyHandler(agent) {
  getLocationCards().forEach(card => {
    agent.add(card);
  });
  
}


const getLocationCards = () => {
  const list = nearby.nearbyList();//currentLocation);
  return list.map(loc => new Card()
    .setTitle(loc.name.nl)
    .setImage(loc.image[0].url));
};
module.exports = nearbyHandler;
