const { Payload } = require('dialogflow-fulfillment');
const {
  PLATFORMS,
} = require('dialogflow-fulfillment/src/rich-responses/rich-response');
/**
 *
 *
 * @param {WebhookClient} agent
 */
function welcomeHandler(agent) {
  const t = new Payload(PLATFORMS.FACEBOOK, {
    richResponse: [
      {
        simpleRespone: {
          displayText: 'Hi',
        },
      },
      {
        simpleRespone: {
          displayText: 'Choose language',
        },
      },
    ],
    quick_replies: [
      'English',
      'Nederlands',
      'Français',
      'Espanol',            
      'Deutsch',
    ].map(el => ({
      content_type: 'text',
      title: el,
      payload: el,
    })),
  });
  agent.add(t);
  return Promise.resolve(agent);
}

module.exports = welcomeHandler;
