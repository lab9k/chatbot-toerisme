const express = require("express");
const google = require("actions-on-google")
const router = express.Router();
const {WebhookClient, Card, Suggestion} = require('dialogflow-fulfillment');

/**
 * Routes HTTP POST requests to index
 */
router.post("/", function (request, response) {
    // TODO: validate origin/host
    // response.send("Invalid domain", 403);
    if (!request.hasOwnProperty("body") || Object.keys(requestbody).length === 0) {
        response.send("Empty body", 400);
    }
    if (!request.body.hasOwnProperty("queryResult") || Object.keys(request.body.queryResult).length === 0 ||
        !request.body.queryResult.hasOwnProperty("queryText") || Object.keys(request.body.queryResult.queryText).length === 0) {
        response.send("Invalid data format", 400);
    }

    const agent = new WebhookClient({request, response});
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    // // Uncomment and edit to make your own intent handler
    // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
    // // below to get this funciton to be run when a Dialogflow intent is matched
    // function yourFunctionHandler(agent) {
    //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
    //   agent.add(new Card({
    //       title: `Title: this is a card title`,
    //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
    //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
    //       buttonText: 'This is a button',
    //       buttonUrl: 'https://assistant.google.com/'
    //     })
    //   );
    //   agent.add(new Suggestion(`Quick Reply`));
    //   agent.add(new Suggestion(`Suggestion`));
    //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
    // }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    // intentMap.set('your intent name here', yourFunctionHandler);
    agent.handleRequest(intentMap);
});

/**
 * Blocks all other HTTP requests
 */
router.all("/", function (req, res) {
    response.sendStatus(405)
});

module.exports = router;
