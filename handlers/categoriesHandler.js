const poi = require('../util/poi');
const { Payload } = require('dialogflow-fulfillment');

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
    agent.add(new Payload(agent.FACEBOOK, {
      text: 'Kies uit één van de volgende categorieën',
      quick_replies: categories.map(category => {
        return {
          content_type: 'text',
          title: category,
          payload: category
        };
      })
    }));
  });
}

module.exports = categoriesHandler;
