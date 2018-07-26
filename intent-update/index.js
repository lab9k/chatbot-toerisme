const fetch = require('node-fetch');
const Poi = require('./src/poi');
const app = require('./src/app');
const dotenv = require('dotenv');
const fs = require('fs');

const API_ENDPOINT = 'https://visit.gent.be/en/lod/poi';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const creds = JSON.parse(
  fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)
);
for (const key in creds) {
  process.env[key] = process.env[key] || creds[key];
}

fetch(API_ENDPOINT)
  .then(data => data.json())
  .then(json => {
    const pois = json.map(el => new Poi(el));
    app.launch(pois);
    app.listEntityTypes(process.env.project_id);
  })
  .catch(error => {
    console.log(error);
  });
