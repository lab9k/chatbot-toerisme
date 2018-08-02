#!/usr/bin/env node
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
    message: `How is "${miss.key}" defined in ${miss.lang}?`,
  });
});
inquirer.prompt(questions).then(answers => {
  const keys = Object.keys(answers);
  keys.forEach(k => {
    const key = k.split('^')[0];
    const lang = k.split('^')[1];
    const translation = answers[k];
    const path = `./translations/${lang}.json`;
    const data = fs.readFileSync(path, 'utf8');
    const json = JSON.parse(data);
    json[key] = translation;
    fs.writeFileSync(path, JSON.stringify(json), 'utf8');
  });
});
