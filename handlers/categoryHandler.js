const poi = require('../util/poi');
const POICard = require('../util/POICard');

/**
 * Handler for "info.category" intent
 */
function categoryHandler(agent) {
  return poi.then(data => {
    let cardCount = 0;
    let i = 0;
    while (i < data.length && cardCount < 10) {
      let category = data[i].subject[0][0]['@id'];
      category = category.substring(category.length - 36, category.length);
      if (
        cardCount < 10 &&
        category === agent.request_.body.queryResult.queryText
      ) {
        agent.add(new POICard(data[i], agent.locale));
        cardCount++;
      }
      i++;
    }
  });
}

module.exports = categoryHandler;
