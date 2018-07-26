const poi = require('../util/poi');
const POICard = require('../util/POICard');

/**
 * Handler for "info.category" intent
 */
function categoryHandler(agent) {
  return poi.then(data => {
    data.forEach(poi => {
      let category = poi.subject[0][0]['@id'];
      category = category.substring(category.length - 36, category.length);
      if (category === agent.paramaters.category) {
        agent.add(new POICard(poi, agent.locale));
      }
    });
  });
}

module.exports = categoryHandler;
