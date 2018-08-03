const lang = require('../util/lang');
const { Payload } = require('dialogflow-fulfillment');
const {
  PLATFORMS,
} = require('dialogflow-fulfillment/src/rich-responses/rich-response');

module.exports = function askLocationHandler(agent) {
  agent.add(
    new Payload(PLATFORMS.FACEBOOK, {
      text: lang.translate(agent.locale, 'ask_location'),
      quick_replies: [{ content_type: 'location' }],
    })
  );
  return Promise.resolve(agent);
};

// {
//   "facebook": {
//     "text": "Gelieve uw locatie te delen, zodat ik het beziens in jouw buurt kan vinden",
//     "quick_replies": [
//       {
//         "content_type": "location"
//       }
//     ]
//   }
// }
