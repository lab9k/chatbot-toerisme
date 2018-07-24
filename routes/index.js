const express = require('express');
const router = express.Router();
const { WebhookClient } = require('dialogflow-fulfillment');
const nearbyHandler = require('../handlers/nearbyHandler');

// // Intent actions
// router.all('/', (req, res, next) => {
//   let fn;
//   switch (req.type) {
//     case 'nearby_poi':
//       fn = get_nearby_poi;
//       break;
//     case 'nearest_poi':
//       fn = get_nearest_poi;
//       break;
//     case 'categories':
//       fn = getCategories;
//       break;
//     default:
//       return next(
//         new Error(
//           `type not defined: ${req.type}, action: ${
//             req.body.queryResult.action
//           }`
//         )
//       );
//   }
//   return fn(req, res, next);
// });

/**
 * Routes HTTP POST requests to index
 */
router.post('/', function(request, response) {
  if (!request.hasOwnProperty('body') || Object.keys(request.body).length === 0) {
    response.status(400).send('Empty body');
  }

  if (!request.body.hasOwnProperty('queryResult') || Object.keys(request.body.queryResult).length === 0
    || !request.body.queryResult.hasOwnProperty('queryText')
    || Object.keys(request.body.queryResult.queryText).length === 0) {
    response.status(400).send('Invalid data format');
  }

  const agent = new WebhookClient({ request, response });

  let intentMap = new Map();
  intentMap.set('get_nearby_poi', get_nearby_poi);
  intentMap.set('get_nearest_poi', get_nearest_poi);
  intentMap.set('get_categories', getCategories);
  intentMap.set('test', test);

  agent.handleRequest(intentMap);
});

/**
 * Blocks all other HTTP requests
 */
router.all('/', function(req, res) {
  res.sendStatus(405);
});

const get_nearby_poi = (agent) => {
  agent.add('Dingen om te doen in jouw buurt: Gent bezoeken.');
};

const get_nearest_poi = (agent) => {};

const getCategories = (agent) => {};

const test = (agent) => {
  agent.add('Test 123');
};

module.exports = router;
