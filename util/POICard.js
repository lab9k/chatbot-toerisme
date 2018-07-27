const { Card } = require('dialogflow-fulfillment');

class POICard extends Card {
  constructor(poi, locale) {
    super(poi.name[locale][0]);
    // TEMP
    this.poi = poi;
    let url = poi.image[poi.image.length - 1].url;
    // change URL to non-test URL
    url = url.replace('web.test.gentgrp.', '');
    // URL in data references image which has large size
    // change URL to non-test URL
    // URL can be replaced to reference image which has smaller size
    url = url.replace('files/', 'files/styles/header_desktop/public/');
    this.setImage(url);
    this.setText(poi.description[locale][0]);
    if (
      poi.hasOwnProperty('contactPoint') &&
      poi.contactPoint !== null &&
      poi.contactPoint.hasOwnProperty('field_geofield')
    ) {
      this.setButton({
        text: 'Toon mij de weg',
        url: `https://www.google.be/maps/dir/?api=1&destination=${
          poi.contactPoint.field_geofield[9]
        }`,
      });
    }
  }

  getV2ResponseObject_(platform) {
    const response = super.getV2ResponseObject_(platform);
    if (this.poi.page) {
      response.card.buttons.push({
        text: 'website',
        postback: `${this.poi.page}`,
      });
    }
    return response;
  }
}

module.exports = POICard;
