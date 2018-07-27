const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data');

const readFile = index => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${dataPath}/${index}.json`, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
};

let promises = [];
for (let i = 1; i <= 55; i++) {
  promises.push(readFile(i));
}

// TODO is data broken or this code ?
Promise.all(promises)
  .then(data => {
    let singleArray = data.reduce((accum, value) => {
      return [...accum, ...value];
    }, []);
    const parsedObjects = [];
    while (singleArray.length > 0) {
      const check = singleArray[0];
      const match = [];
      singleArray = singleArray.reduce(function(pre, curr) {
        if (curr['@id'] !== check['@id']) {
          pre.push(curr);
        } else {
          match.push(curr);
        }
        return pre;
      }, []);
      const single = toSingleObj(match);
      parsedObjects.push(single);
    }
    return parsedObjects;
  })
  .then(parsedArray => {
    console.log(parsedArray.map(el => el.url));
    console.log(parsedArray.length);
  })
  .catch(err => console.log(err));

function toSingleObj(arr) {
  const urls = {
    nl: [],
    en: [],
    fr: [],
    es: [],
    de: [],
  };
  arr.forEach(el => {
    urls[getLangUrl(el)].push(el.url);
  });
  for (const k in urls) {
    urls[k] = [...new Set(urls[k])];
  }
  return {
    ...arr[0],
    url: urls,
  };
}

function getLangUrl(obj) {
  return obj.url.split('/')[3];
}
