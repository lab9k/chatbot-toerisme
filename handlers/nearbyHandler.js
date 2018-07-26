const nearby = require('../util/nearby');
const POICard = require('../util/POICard');
const util = require('util');

/**
 * Handler for "info.nearby" intent
 */
function nearbyHandler(agent) {
  const cardsPromise = getLocationCards(agent);
  return cardsPromise
    .then(cards => {
      agent.add(cards);
    })
    .catch(error => {
      console.log(error);
    });
}

const getLocationCards = (agent) => {
  const loc = { lat: 51.055626763148624, long: 3.722346570642415 };
  console.log('param', util.inspect(agent));  
  return nearby(loc)
    .then(locations => {               
      return locations.map(location => {
        return new POICard(location, agent.locale);
      });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = nearbyHandler;
