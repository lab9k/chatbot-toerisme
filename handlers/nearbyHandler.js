const nearby = require('../util/nearby');
const POICard = require('../util/POICard');
const QuickReplies = require('../models/quickReplies');

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
      agent.contexts.find(
        context => context.name == 'show_nearby'
      ).lifespan = 2;
    })
    .catch(error => {
      console.log(error);
    });
}

const getLocationCards = agent => {
  const loc = agent.originalRequest.payload.data.postback.data;
  const currentPage = parseInt(
    agent.contexts.find(context => context.name == 'show_nearby').parameters
      .page
  );
  const startNextPage = (currentPage + 1) * 10;
  agent.contexts.find(context => context.name == 'show_nearby').parameters
    .page ==
    currentPage + 1;
  return nearby(loc)
    .then(locations => {
      if (locations) {
        return locations
          .slice(startNextPage, startNextPage + 10)
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
