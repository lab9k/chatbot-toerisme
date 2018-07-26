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
} //TODO ix this :(

Promise.all(promises)
  .then(data => {
    const singleArray = data.reduce((accum, value) => {
      return [...accum, ...value];
    }, []);
    let check = singleArray[0];
    const newArray = [];
    while (singleArray.length > 0) {
      const temp = [];
      let plaats = singleArray.findIndex(val => val['@id'] === check['@id']);
      while (plaats > -1) {
        const index = singleArray.findIndex(val => val['@id'] === check['@id']);
        temp.push(singleArray.splice(index, 1)[0]);
        plaats = singleArray.findIndex(val => val['@id'] === check['@id']);
      }
      check = singleArray[0];

      const obj = toSingleObj(temp);
      newArray.push(obj);
    }
    return newArray;
  })
  .then(parsedArray => {
    console.log(parsedArray.length);
    console.log(
      parsedArray.find(
        el => el.page === 'http://visit.web.test.gentgrp.gent.be/node/2456'
      ).url
    );
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
  return {
    ...arr[0],
    url: urls,
  };
}

function getLangUrl(obj) {
  return obj.url.split('/')[3];
}
