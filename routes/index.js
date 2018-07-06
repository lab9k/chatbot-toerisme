const express = require("express");
const router = express.Router();
const {WebhookClient, Card, Suggestion} = require('dialogflow-fulfillment');

/**
 * Routes HTTP POST requests to index
 */
router.post("/", function (request, response) {
    // TODO: validate origin/host
    // response.send("Invalid domain", 403);
    if (!request.hasOwnProperty("body") || Object.keys(request.body).length === 0) {
        response.status(400).send("Empty body");
    }
    if (!request.body.hasOwnProperty("queryResult") || Object.keys(request.body.queryResult).length === 0 ||
        !request.body.queryResult.hasOwnProperty("queryText") || Object.keys(request.body.queryResult.queryText).length === 0) {
        response.status(400).send("Invalid data format");
    }

    const agent = new WebhookClient({request, response});

    function yourFunctionHandler(agent) {
      agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
      agent.add(new Card({
          title: `Title: this is a card title`,
          imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
          text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
          buttonText: 'This is a button',
          buttonUrl: 'https://assistant.google.com/'
        })
      );
      agent.add(new Suggestion(`Quick Reply`));
      agent.add(new Suggestion(`Suggestion`));
      agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
    }

    let intentMap = new Map();
    intentMap.set('Jorg', yourFunctionHandler);
    agent.handleRequest(intentMap);
});

/**
 * Blocks all other HTTP requests
 */
router.all("/", function (req, res) {
    response.sendStatus(405)
});

module.exports = router;
