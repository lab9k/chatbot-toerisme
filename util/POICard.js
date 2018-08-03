const { Card } = require('dialogflow-fulfillment');
const lang = require('../util/lang');

class POICard extends Card {
  constructor(poi, locale) {
    super(getValueOrUndefined(poi.name, locale) ||
      poi.name['nl'][0]);
    // TEMP
    this.poi = poi;
    this.locale = locale;
    let url = poi.image[poi.image.length - 1].url;
    // change URL to non-test URL
    url = url.replace('web.test.gentgrp.', '');
    // URL in data references image which has large size
    // change URL to non-test URL
    // URL can be replaced to reference image which has smaller size
    url = url.replace('files/', 'files/styles/header_desktop/public/');
    this.setImage(url);
    this.setText(
      getValueOrUndefined(poi.description, locale) ||
      getValueOrUndefined(poi.description, 'nl') ||
        `No description available in ${locale}`
    );
    if (
      poi.hasOwnProperty('contactPoint') &&
      poi.contactPoint !== null &&
      poi.contactPoint.hasOwnProperty('field_geofield')
    ) {
      this.setButton({
        text: lang.translate(this.locale, 'show_route'),
        url: `https://www.google.be/maps/dir/?api=1&destination=${
          poi.contactPoint.field_geofield[9]
        }`
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
      if (!response.card.buttons) {
        response.card.buttons = [];
      }
      response.card.buttons.push({
        text: lang.translate(this.locale, 'show_more'),
        postback: `${this.poi.page}`
      });
    }
    return response;
  }
}

const getValueOrUndefined = (val, locale) => {
  try {
    val = val[locale][0];
    if (val) {
      return val;
    }
  } catch (e) {
    return undefined;
  }
  
};
module.exports = POICard;
