const { Suggestion } = require('dialogflow-fulfillment');

function welcomeHandler(agent) {
    agent.add(`Hallo!`);
    agent.add(new Suggestion(`Plaatsen in de buurt`));
    agent.add(new Suggestion(`Plaatsen per categorie`));
}

module.exports = welcomeHandler;