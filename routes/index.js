const express = require("express");
const router = express.Router();
const { WebhookClient } = require("dialogflow-fulfillment");
const welcomeHandler = require("../handlers/welcomeHandler");

/**
 * Routes HTTP POST requests to index
 */
router.post("/", function (request, response) {
    // TODO: validate origin/host
    // response.send("Invalid domain", 403);

    if (!request.hasOwnProperty("body") || Object.keys(request.body).length === 0) {
        response.status(400).send("Empty body");
    }

    if (!request.body.hasOwnProperty("queryResult")
        || Object.keys(request.body.queryResult).length === 0
        || !request.body.queryResult.hasOwnProperty("queryText")
        || Object.keys(request.body.queryResult.queryText).length === 0) {
        response.status(400).send("Invalid data format");
    }

    const agent = new WebhookClient({request, response});

    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcomeHandler);

    agent.handleRequest(intentMap);
});

/**
 * Blocks all other HTTP requests
 */
router.all("/", function (req, res) {
    response.sendStatus(405)
});

module.exports = router;
