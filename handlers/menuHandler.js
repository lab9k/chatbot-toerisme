const lang = require('../util/lang');
const { Payload } = require('dialogflow-fulfillment');
const {
  PLATFORMS,
} = require('dialogflow-fulfillment/src/rich-responses/rich-response');

module.exports = function menuHandler(agent) {
  agent.add(
    new Payload(PLATFORMS.FACEBOOK, {
      text: lang.translate(agent.locale, 'search_places'),
      quick_replies: [
        lang.translate(agent.locale, 'search_nearby'),
        lang.translate(agent.locale, 'search_category'),
      ].map(el => ({
        content_type: 'text',
        title: el,
        payload: el,
      })),
    })
  );
  return Promise.resolve(agent);
};
