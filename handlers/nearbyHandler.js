const nearby = require('../util/nearby');
const POICard = require('../util/POICard');

/**
 * Handler for "Nearby" intent
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

const getLocationCards = agent => {
  return nearby
    .then(cb => {
      const loc = { lat: 51.055626763148624, long: 3.722346570642415 };
      const locations = cb(loc);
      return locations.map(location => {
        return new POICard(location, agent);
      });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = nearbyHandler;
