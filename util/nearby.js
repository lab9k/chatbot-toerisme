const tj = require('@mapbox/togeojson');
const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;

const FILE_PATH = './data/POI-Toerisme.kml';

function toRad($Value) {
  return ($Value * Math.PI) / 180;
}

const distance = location => toLocation => {
  const [currentLong, currentLat] = location.geometry.coordinates;
  const { long: toLong, lat: toLat } = toLocation;
  var R = 6371e3; // metres
  var φ1 = toRad(currentLat);
  var φ2 = toRad(toLat);
  var Δφ = toRad(toLat - currentLat);
  var Δλ = toRad(toLong - currentLong);

  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;
  console.log(`${location.properties.NAAM}: \n\t${d} meter\n`);
  return d;
};

const convert = filePath => {
  const kml = new DOMParser().parseFromString(
    fs.readFileSync(filePath, 'utf8')
  );
  const converted = tj.kml(kml);
  const data = [...converted.features];
  return function(currentUserLocation) {
    const closest = data.reduce((previous, current) => {
      if (
        distance(current)(currentUserLocation) >
        distance(previous)(currentUserLocation)
      ) {
        return previous;
      } else {
        return current;
      }
    });
    return closest;
  };
};

// * example
// console.log(
//   convert(FILE_PATH)({ lat: 51.055626763148624, long: 3.722346570642415 })
// );

module.exports = convert(FILE_PATH);
