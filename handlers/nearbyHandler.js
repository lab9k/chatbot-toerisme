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
  const loc = agent.originalRequest.payload.data.postback.data;
  console.log('param', JSON.stringify(agent.originalRequest).replace('\n', ' '));  
  return nearby(loc)
    .then(locations => {  
      console.log('locations', loc);             
      return locations.map(location => {
        return new POICard(location, agent.locale);
      });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = nearbyHandler;
