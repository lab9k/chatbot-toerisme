const tj = require("@mapbox/togeojson");
const DOMParser = require("xmldom").DOMParser;
const fetch = require("node-fetch");

const FILE_PATH =
  "http://geo.gent.be/geoserver/SG-E-CultuurSportVrijetijd/ows?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/vnd.google-earth.kml+xml&typeName=SG-E-CultuurSportVrijetijd:POI-Toerisme";

function toRad($Value) {
    return ($Value * Math.PI) / 180;
}

const distance = location => toLocation => {
    const [currentLong, currentLat] = location.geometry.coordinates;
    const { long: toLong, lat: toLat } = toLocation;
    const R = 6371e3; // metres
    const φ1 = toRad(currentLat);
    const φ2 = toRad(toLat);
    const Δφ = toRad(toLat - currentLat);
    const Δλ = toRad(toLong - currentLong);

    const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
};

const nearest = filePath => {
    return fetch(filePath)
        .then(res => {
            return res.text();
        })
        .then(text => {
            const kml = new DOMParser().parseFromString(text);
            const converted = tj.kml(kml);
            const data = [...converted.features];
            return function(currentUserLocation) {
                const closest = data.reduce((previous, current) => {
                    if (distance(current)(currentUserLocation) > distance(previous)(currentUserLocation)) {
                        return previous;
                    } else {
                        return current;
                    }
                });
                return closest;
            };
        })
        .catch(error => console.error(error));
};

/* example
nearest(FILE_PATH)
   .then(cb => {
       const loc = { lat: 51.055626763148624, long: 3.722346570642415 };
       const closest = cb(loc);
       console.log('nearest: ', closest);
   })
   .catch(err => console.error(err));
*/

module.exports = nearest(FILE_PATH);
