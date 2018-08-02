const poi = require('../util/poi');
const { Payload } = require('dialogflow-fulfillment');
const lang = require('../util/lang');

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
    agent.add(
      new Payload(agent.FACEBOOK, {
        text: lang.translate(agent.locale, 'choose_category'),
        quick_replies: categories
          .map(category => {
            return {
              content_type: 'text',
              title: category,
              payload: category,
            };
          })
          .slice(0, 11),
      })
    );
  });
}

module.exports = categoriesHandler;
