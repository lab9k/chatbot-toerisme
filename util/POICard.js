const { Card } = require('dialogflow-fulfillment');
const Jimp = require('jimp');
const path = require('path');
const rootDir = path.dirname(require.main.filename);

class POICard extends Card {
  constructor(poi, agent) {
    super(poi.name[agent.locale][0]);
    const nameNL = poi.name.nl[0];
    Jimp.read(poi.image[0].url)
      .then(function(image) {
        image
          .resize(512, Jimp.AUTO)
          .quality(60)
          .write(__dirname)
          .write(rootDir + '/images/' + nameNL + '.jpg');
      })
      .catch(function(err) {
        console.error(err);
      });
    this.setImage(rootDir + '/images/' + nameNL + '.jpg');
    this.setText(poi.description[agent.locale][0]);
    this.setButton({
      text: 'Toon mij de weg',
      url: `https://www.google.be/maps/dir/?api=1&destination=${
        poi.contactPoint.field_geofield[9]
      }`,
    });
  }
}

module.exports = POICard;
