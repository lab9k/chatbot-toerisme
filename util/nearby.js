const poi = require('./poi');

function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}

const distance = location => toLocation => {
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

const nearbyList = currentUserLocation => {
  return poi
    .then(data =>{
      console.log('data', JSON.stringify(data).replace('\n', ' '));
      data
        .map(location => ({
          dist: distance(location)(currentUserLocation),
          ...location
        }))
        .sort(compareLocationsByDistance)
    })
    .catch(error => console.error(error));
};

/* example*/
/*nearbyList(API_ENDPOINT)
  .then(cb => {
    const loc = { lat: 51.055626763148624, long: 3.722346570642415 };
    const closest = cb(loc);
    //console.log('nearest: ', JSON.stringify(closest));
  })
  .catch(err => console.error(err));
*/

const compareLocationsByDistance = (a, b) => {
  return a.dist - b.dist;
};

module.exports = nearbyList;
