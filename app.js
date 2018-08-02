const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const lang = require('./util/lang').detectLang;

const index = require('./routes/index');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(lang);

app.use('/', index);

module.exports = app;
