const Poi = require('./src/poi');
const app = require('./src/app');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

fs.readFile(
  path.join(__dirname, '..', 'data', 'combined.json'),
  (err, data) => {
    if (err) throw err;
    const json = JSON.parse(data);
    app.launch(json.map(el => new Poi(el)));
  }
);
