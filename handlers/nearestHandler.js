const near = require('../util/nearby');
const { Card } = require('dialogflow-fulfillment');
const {
  PLATFORMS,
} = require('dialogflow-fulfillment/src/rich-responses/rich-response');
/**
 * Handler for "Nearest" intent
 */
function nearestHandler(agent) {
  return near.then(callback => {
    const loc = { lat: 51.055626763148624, long: 3.722346570642415 };
    const closest = callback(loc)[0];
    const response = new Card(closest.name.nl[0]);
    response.setImage(
      'https://s3-us-west-1.amazonaws.com/greenfuture/uploads/posts/May2017/sKxM7qPlYeHJNMsFkdIP.jpg'
    );
    response.setPlatform(PLATFORMS.FACEBOOK);
    response.setButton({ text: 'test', url: closest.page });
    response.setText(closest.description);
    agent.add(response);
  });
}

module.exports = nearestHandler;
