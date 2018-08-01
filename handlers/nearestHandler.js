const nearby = require('../util/nearby');
const POICard = require('../util/POICard');

/**
 * ! deprecated method
 * Handler for "Nearest" intent
 * @param {*} agent dialogflow agent
 * @return {Promise} Promise that adds the nearest location to the agent.
 */
function nearestHandler(agent) {
  const loc = { lat: 51.055626763148624, long: 3.722346570642415 };
  return nearby(loc).then(locations => {
    const nearest = locations[0];
    agent.add(new POICard(nearest, agent.locale));
  });
}

module.exports = nearestHandler;
