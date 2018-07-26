const { fetch, } = require('./src/util/util');
const Poi = require('./src/poi');
const app = require('./src/app');
const dotenv = require('dotenv');

const API_ENDPOINT = 'https://visit.gent.be/en/lod/poi';

dotenv.config();

fetch(API_ENDPOINT)
  .then(json => {
    const pois = json.map(el => new Poi(el));
    app.launch(pois);
  })
  .catch(error => {
    console.log(error);
  });
