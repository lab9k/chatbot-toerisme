const { Card } = require('dialogflow-fulfillment');

class POICard extends Card {
  constructor(poi, locale) {
    super(poi.name[locale][0]);
    this.setImage(poi.image[0].url);
    this.setText(poi.description[locale][0]);
    this.setButton({
      text: 'Toon mij de weg',
      url: `https://www.google.be/maps/dir/?api=1&destination=${poi.contactPoint.field_geofield[9]}`,
    });
  }
}

module.exports = POICard;
