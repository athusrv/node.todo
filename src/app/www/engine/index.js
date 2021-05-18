'use strict'
const bodyParser = require('body-parser')
const app = require('express')()
app.use(bodyParser.json())

const httpServer = require("http").createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(httpServer, options);

io.on("connection", socket => console.log('new connection'));

module.exports = { app, httpServer, io }
