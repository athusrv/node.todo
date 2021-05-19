'use strict'

const bodyParser = require('body-parser')
const app = require('express')()
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const httpServer = require("http").createServer(app);
const options = {
    cors: {
        origin: "*"
    }
};
const io = require('socket.io')(httpServer, options);

io.on("connection", socket => console.log('new connection'));

module.exports = { app, httpServer, io }
