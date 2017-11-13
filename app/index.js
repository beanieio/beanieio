const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { app, httpPort } = require('./app.js');

http.createServer(app).listen(httpPort, 'localhost');
console.log('HTTP Server now listening on port ' + httpPort);
