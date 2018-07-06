const { Suggestion } = require("dialogflow-fulfillment");
const resource = require("../res/welcome");

/**
 * Handler for Default welcome intent
 *
 * @param agent
 */
function welcomeHandler(agent) {
    agent.add(resource.hello[agent.locale]);
    agent.add(resource.vicinity[agent.locale]);
    agent.add(resource.category[agent.locale]);
}

module.exports = welcomeHandler;