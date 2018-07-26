const { Card } = require('dialogflow-fulfillment');

class POICard extends Card {
  constructor(poi, locale) {
    super(poi.name[locale][0]);
    // TEMP
    let url = poi.image[poi.image.length - 1].url;
    // change URL to non-test URL
    url = url.replace('web.test.gentgrp.', '');
    // URL in data references image which has large size
    // change URL to non-test URL
    // URL can be replaced to reference image which has smaller size
    url = url.replace('files/', 'files/styles/header_desktop/public/');
    this.setImage(url);
    this.setText(poi.description[locale][0]);
    this.setButton({
      text: 'Toon mij de weg',
      url: `https://www.google.be/maps/dir/?api=1&destination=${poi.contactPoint.field_geofield[9]}`,
    });
  }
}

module.exports = POICard;
