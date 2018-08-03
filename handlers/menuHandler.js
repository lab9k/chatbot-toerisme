const lang = require('../util/lang');
const { Payload } = require('dialogflow-fulfillment');
const {
  PLATFORMS
} = require('dialogflow-fulfillment/src/rich-responses/rich-response');
const quickReplies = require('../models/quickReplies');

module.exports = function menuHandler(agent) {
  const quickReply = new quickReplies(
    lang.translate(agent.locale, 'search_places')
  );
  
  quickReply.addQuickReplies(
    lang.translate(agent.locale, 'search_nearby'),
    lang.translate(agent.locale, 'search_category')
  );

  agent.add(new Payload(PLATFORMS.FACEBOOK, quickReply.getResponse()));
  return Promise.resolve(agent);
};
