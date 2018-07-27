const nearby = require('../util/nearby');
const POICard = require('../util/POICard');

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
  return nearby(loc)
    .then(locations => {  
      console.log('locations', JSON.stringify(locations));             
      return locations
      .filter(location => location !== undefined)
      .map(location => {
        return new POICard(location, agent.locale);
      });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = nearbyHandler;
