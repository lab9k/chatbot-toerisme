const fs = require('fs');
const path = require('path');

function fetchPOI() {
  return new Promise((resolve, reject) => {
    let poi = [];
    let dataPath = path.join(__dirname, '..', 'data');
    fs.readdir(dataPath, (error, files) => {
      let promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(new Promise((resolve1, reject1) => {
          fs.readFile(path.join(dataPath, files[i]), 'utf8', (error, data) => {
            if (error) {
              reject1();
            } else {
              poi.push(...JSON.parse(data));
              resolve1();
            }
          });
        }));
      }
      Promise.all(promises).then(() => resolve(poi)).catch(() => reject());
    });
  });
}

module.exports = fetchPOI();
