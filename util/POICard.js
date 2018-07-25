const { Card } = require('dialogflow-fulfillment');

class POICard extends Card {
  constructor(poi, agent) {
    super(poi.name[agent.locale][0]);
    this.setImage(poi.image[0].url);
    this.setText(poi.description[agent.locale]);
    this.setButton({
      text: 'Toon mij de weg',
      url: `https://www.google.be/maps/dir/?api=1&destination=${poi.contactPoint.field_geofield[9]}`
    });
  }
}

module.exports = POICard;