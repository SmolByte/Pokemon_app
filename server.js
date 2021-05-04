/**
 * Author: Nikhil Parikh
 */
const http = require('http');
const fs = require('fs');
const { resolveNaptr } = require('dns');
const app = require('./app.js');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
