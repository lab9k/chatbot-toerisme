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
      console.log('data', agent);
      console.log('contexts', JSON.stringify(agent.outgoingContexts));
    })
    .catch(error => {
      console.log(error);
    });
}

const getLocationCards = agent => {
  const loc = agent.originalRequest.payload.data.postback.data;
  return nearby(loc)
    .then(locations => {
      if (locations) {
        return locations
          .map(location => {
            return new POICard(location, agent.locale);
          });
      }
      return [];
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = nearbyHandler;
