const { Card } = require('dialogflow-fulfillment');

class POICard extends Card {
  constructor(poi, locale) {
    super(poi.name[locale][0]);
    // TEMP
    // change URL to non-test URL
    this.setImage(poi.image[poi.image.length - 1].url.replace('web.test.gentgrp.', ''));
    this.setText(poi.description[locale][0]);
    this.setButton({
      text: 'Toon mij de weg',
      url: `https://www.google.be/maps/dir/?api=1&destination=${poi.contactPoint.field_geofield[9]}`,
    });
  }
}

module.exports = POICard;
