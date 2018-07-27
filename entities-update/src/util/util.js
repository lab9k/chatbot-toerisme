const nfetch = require('node-fetch');

const fetch = (url, options) =>
  nfetch(url, {
    ...options,
    headers: new nfetch.Headers({
      Authorization: 'Bearer ' + process.env.DEV_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    }),
  }).then(data => data.json());

module.exports = {
  fetch,
};
