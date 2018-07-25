const nearby = require('../util/nearby');
const POICard = require('../util/POICard');

/**
 * Handler for "Nearest" intent
 */
function nearestHandler(agent) {
  return nearby.then(callback => {
    const loc = { lat: 51.055626763148624, long: 3.722346570642415 };
    const nearest = callback(loc)[0];
    agent.add(new POICard(nearest, agent));
  });
}

module.exports = nearestHandler;
