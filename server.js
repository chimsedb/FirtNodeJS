//define dependency
const http = require('http');
const app = require('./app');

//content
const port = process.env.PORT || 8080 ;

const server = http.createServer(app).listen(port);