'use strict'

require('./controllers')
const app = require('./express')

const httpServer = require("http").createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(httpServer, options);

io.on("connection", socket => console.log('new connection'));

module.exports = { httpServer, io }
