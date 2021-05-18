'use strict'

require('./controllers')
const { httpServer, io } = require('./engine')

module.exports = { httpServer, io }
