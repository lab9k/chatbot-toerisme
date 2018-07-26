const dialogflow = require('dialogflow');

class App {
  launch (pois) {}

  listEntityTypes (projectId) {
    const entityTypesClient = new dialogflow.EntityTypesClient();
    const intentsClient = new dialogflow.IntentsClient();

    // The path to the agent the entity types belong to.
    const agentPath = intentsClient.projectAgentPath(projectId);

    const request = {
      parent: agentPath,
    };
    return entityTypesClient
      .listEntityTypes(request)
      .then(responses => {
        console.log(JSON.stringify(responses));
        return responses[0];
      })
      .catch(err => {
        console.error('Failed to list entity types:', err);
      });
  }
}
module.exports = new App();
