'use strict'

const app = require('../express')

app.get('/todo', (req, res) => {
    res.send({
        action: 'get_todos'
    })
})

app.get('/todo/:id', (req, res) => {
    res.send({
        action: 'get_todo_by_id',
        id: req.params.id
    })
})

app.post('/todo', (req, res) => {
    res.send({
        action: 'create_todo'
    })
})

app.put('/todo/:id', (req, res) => {
    res.send({
        action: 'update_todo',
        id: req.params.id
    })
})

app.patch('/todo/:id', (req, res) => {
    res.send({
        action: 'update_todo_partially',
        id: req.params.id
    })
})
