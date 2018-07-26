const poi = require('../util/poi');
const { Payload } = require('dialogflow-fulfillment');
const { PLATFORMS } = require('dialogflow-fulfillment/src/rich-responses/rich-response');

/**
 * Handler for "info.categories" intent
 */
function categoriesHandler(agent) {
  return poi.then(data => {
    let categories = [];
    data.forEach(poi => {
      let category = poi.subject[0][0]['@id'];
      category = category.substring(category.length - 36, category.length);
      if (categories.indexOf(category) === -1) {
        categories.push(category);
      }
    });
    agent.add(new Payload(PLATFORMS.FACEBOOK, {
      text: 'Kies uit één van de volgende categorieën',
      quick_replies: categories
    }));
  });
}

module.exports = categoriesHandler;
