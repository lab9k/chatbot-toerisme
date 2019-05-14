const poi = require('./poi');

/**
 * calculate the distance between 2 points
 *
 * @param {*} location
 * @param {{long:number,lat:number}} toLocation
 * @returns {number} the distance between the 2 coordinates
 */
const distance = (location, toLocation) => {
  const [, , currentLat, currentLong] = location.contactPoint.field_geofield;
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

/**
 *
 *
 * @param {{long:number,lat:number}} currentUserLocation
 * @returns {Promise<Object>} resolves to a list of 10 pois, sorted by proximity to the user.
 */
const nearbyList = currentUserLocation => {
  return poi
    .then(data => {
      return data
        .filter(location => location !== undefined && location.contactPoint)
        .map(location => ({
          dist: distance(location, currentUserLocation),
          ...location
        }))
        .sort(compareLocationsByDistance);
    })
    .catch(error => console.error(error));
};

function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}

const compareLocationsByDistance = (a, b) => {
  return a.dist - b.dist;
};

module.exports = nearbyList;
