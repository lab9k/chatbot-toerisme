const express = require('express');
const router = express.Router();
const { WebhookClient } = require('dialogflow-fulfillment');

const nearbyHandler = require('../handlers/nearbyHandler');
const nearestHanldler = require('../handlers/nearestHandler');
const categoriesHandler = require('../handlers/categoriesHandler');
const categoryHandler = require('../handlers/categoryHandler');
const welcomeHandler = require('../handlers/welcomeHandler');

// ? handle dialogflow intents
const intentMap = new Map();
intentMap.set('info.show.nearby', nearbyHandler);
intentMap.set('Nearest Intent', nearestHanldler);
intentMap.set('info.categories', categoriesHandler);
intentMap.set('info.category', categoryHandler);
intentMap.set('smalltalk.welcome', welcomeHandler);

/**
 * Routes HTTP POST requests to index
 */
router.post('/', function(request, response) {
  if (
    !request.hasOwnProperty('body') ||
    Object.keys(request.body).length === 0
  ) {
    response.status(400).send('Empty body');
  }

  if (
    !request.body.hasOwnProperty('queryResult') ||
    Object.keys(request.body.queryResult).length === 0 ||
    !request.body.queryResult.hasOwnProperty('queryText') ||
    Object.keys(request.body.queryResult.queryText).length === 0
  ) {
    response.status(400).send('Invalid data format');
  }

  let agent = new WebhookClient({ request, response });
  agent.locale = request.language;
  console.log('LOCALE: ' + agent.locale);
  if (request.body.originalDetectIntentRequest.hasOwnProperty('source')) {
    agent.requestSource = request.body.originalDetectIntentRequest.source.toUpperCase();
  }

  agent.handleRequest(intentMap);
});

/**
 * Blocks all other HTTP methods
 */
router.all('/', function(req, res) {
  res.sendStatus(405);
});

module.exports = router;
