const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const app = require('./app.js');

const debug = process.env.DEBUG || false;
const httpPort = process.env.HTTP_PORT || 3000;
const httpsPort = process.env.HTTPS_PORT || 3100;

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'domain.key')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'domain.crt'))
};

http.createServer(app).listen(httpPort);
https.createServer(httpsOptions, app).listen(httpsPort);
console.log('HTTP Server now listening on port ' + httpPort);
console.log('HTTPS Server now listening on port ' + httpsPort);
