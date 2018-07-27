const fs = require('fs');
const path = require('path');

function fetchPOI() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '..', 'data', 'combined.json'), 'utf8', (error, data) => {
      if (error) {
        reject();
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

module.exports = fetchPOI();
