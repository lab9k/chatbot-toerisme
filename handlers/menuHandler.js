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
    {
      text: lang.translate(agent.locale, 'search_nearby'),
      payload: lang.translate('nl', 'search_nearby')
    },
    {
      text: lang.translate(agent.locale, 'search_category'),
      payload: lang.translate('nl', 'search_category')
    }
  );

  agent.add(new Payload(PLATFORMS.FACEBOOK, quickReply.getResponse()));
  return Promise.resolve(agent);
};
