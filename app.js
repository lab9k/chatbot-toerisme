const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mw = require('./util/middleware');

const index = require('./routes/index');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'), {
  skip: function(_req, res) {
    return res.statusCode < 400;
  },
});
app.use(mw.langMiddleWare);
app.use(mw.typeMiddleware);

app.use('/', index);

module.exports = app;
