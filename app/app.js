const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const debug = process.env.DEBUG || false;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '..', 'public')));

/*
=====
OTHER ROUTES GO HERE
=====
*/

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});

module.exports = app;
