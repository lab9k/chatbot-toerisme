const poi = require('../util/poi');
const { Suggestion } = require('dialogflow-fulfillment');

/**
 * Handler for "Category" intent
 */
function categoryHandler(agent) {
  poi.then(data => {
    let categories = [];
    data.forEach(poi => {
      let category = poi.subject[0][0]['@id'];
      category = category.substring(category.length - 36, category.length);
      if (categories.indexOf(category) === -1) {
        categories.push(category);
      }
    });
    categories.forEach(category => {
      agent.add(new Suggestion(category));
    });
  });
}

module.exports = categoryHandler;
