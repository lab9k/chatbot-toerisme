const inquirer = require('inquirer');
const fs = require('fs');
const translator = require('./lang');
const check = require('./lang').check;
const missing = check(translator);
const questions = [];

missing.forEach(miss => {
  questions.push({
    type: 'input',
    name: `${miss.key}^${miss.lang}`,
    message: `How is "${miss.key}" translated in ${miss.lang}?`,
  });
});
inquirer.prompt(questions).then(answers => {
  const keys = Object.keys(answers);
  keys.forEach(k => {
    const key = k.split('^')[0];
    const lang = k.split('^')[1];
    const translation = answers[k];
    const path = `./translations/${lang}.json`;
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) throw err;
      const json = JSON.parse(data);
      json[key] = translation;
      console.log(json);
      fs.writeFile(path, JSON.stringify(json), 'utf8', err => {
        if (err) throw err;
      });
    });
  });
});
