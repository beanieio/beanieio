const fs = require('fs');
const path = require('path');
// const https = require('https');
const http = require('http');
const { app, httpPort /*, httpsPort*/ } = require('./app.js');

// const httpsOptions = {
//   key: fs.readFileSync(path.join(__dirname, 'cert', 'domain.key')),
//   cert: fs.readFileSync(path.join(__dirname, 'cert', 'domain.crt'))
// };

http.createServer(app).listen(httpPort);
// https.createServer(httpsOptions, app).listen(httpsPort);
console.log('HTTP Server now listening on port ' + httpPort);
// console.log('HTTPS Server now listening on port ' + httpsPort);
