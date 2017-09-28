const app = require('./app.js');
const port = process.env.PORT || 3000;
const debug = process.env.DEBUG || false;
app.listen(port);
console.log('Server now listening on port ' + port);
