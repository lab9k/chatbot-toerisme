const nearby = require('../util/nearby');
const POICard = require('../util/POICard');
const QuickReplies = require('../models/quickReplies');
const { Payload } = require('dialogflow-fulfillment');

/**
 * Handler for "info.nearby" intent
 */
function nearbyHandler(agent) {
  const cardsPromise = getLocationCards(agent);
  const quickReplies = new QuickReplies('Wat wil je doen?');
  quickReplies.addQuickReply('Toon meer in de buurt', 'toon meer');
  quickReplies.addQuickReply('Zoeken per categorie', 'per categorie');
  return cardsPromise
    .then(cards => {
      agent.add(cards);
      console.log('contexts', JSON.stringify(agent.contexts));

      //agent.add(new Payload(agent.FACEBOOK, quickReplies.getResponse()));
      agent.contexts.set('show_nearby', 2);
    })
    .catch(error => {
      console.log(error);
    });
}

const getLocationCards = agent => {
  const loc = agent.originalRequest.payload.data.postback.data;
  const currentPage = parseInt(agent.contexts
    .find(context => context.name == 'show_nearby')
    .parameters.page);
  const startNextPage = currentPage + 10;
  return nearby(loc)
    .then(locations => {
      if (locations) {
        return locations
          .slice(startNextPage, startNextPage+10)
          .map(location => {
            return new POICard(location, agent.locale);
          });
      }
      return [];
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = nearbyHandler;
