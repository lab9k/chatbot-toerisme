const fetch = require('node-fetch');

const API_ENDPOINT = 'https://visit.gent.be/en/lod/poi';

function fetchPOI() {
  return fetch(API_ENDPOINT)
    .then(res => res.json())
    .catch(error => console.error(error));
}

module.exports = fetchPOI();