const fs = require('fs');
const path = require('path');

/**
 * fetch the Points of Interest from a json file
 *
 * @returns Promise - if successfull, the promise will resolve to the parsed JSON data
 */
function fetchPOI() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, '..', 'data', 'combined.json'),
      'utf8',
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(data));
        }
      }
    );
  });
}

module.exports = fetchPOI();
