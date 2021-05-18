'use strict'

const { sequelize } = require('./database/sequelize')
const { httpServer } = require('./www')
const port = 3000

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => {
        console.error('Unable to connect to the database:', err)
        throw err
    })

httpServer.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
