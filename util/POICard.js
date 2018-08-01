const { Card } = require('dialogflow-fulfillment');
const lang = require('../util/lang');

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

  /**
   * ! This method is not meant to be called manually, the dialogflow library handles this.
   * Will create and return the dialogflow response object, adding an extra button if the poi has a homepage.
   *
   * @param {*} platform the platform the response is specified for
   * @returns dialogflow V2 response object
   * @memberof POICard
   */
  getV2ResponseObject_(platform) {
    const response = super.getV2ResponseObject_(platform);
    if (this.poi.page) {
      response.card.buttons.push({
        text: lang.translate('en', 'extra_info'),
        postback: `${this.poi.page}`,
      });
    }
    return response;
  }
}

module.exports = POICard;
