'use strict'

const app = require('../express')
const models = require('../../database/models')
const { CreateTodoModelRequest, UpdateTodoModelRequest } = require('../models')

app.get('/todo', (req, res) => {
    models.Todo.findAll().then(todos => res.send(todos))
})

app.get('/todo/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(403)
    }

    models.Todo.findByPk(req.params.id).then(todo => {
        if (todo) {
            res.send(todo)
        } else {
            res.sendStatus(404)
        }
    })
})

app.post('/todo', (req, res) => {
    try {
        const createTodoReq = CreateTodoModelRequest.build(req.body, {
            validateMissingKeys: true,
            deleteExtraKeys: true
        })

        models.Todo.create({ ...createTodoReq, status: models.TodoStatus.PENDING }).then(todo => {
            res.send(todo)
        })
    } catch (err) {
        console.error('Error parsing body to CreateTodoModelRequest', err)
        res.sendStatus(403)
    }
})

app.put('/todo/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(403)
    }

    try {
        const updateTodoReq = UpdateTodoModelRequest.build(req.body, {
            validateMissingKeys: true,
            deleteExtraKeys: true
        })

        updateTodo(req, res, updateTodoReq)
    } catch (err) {
        console.error('Error parsing body to UpdateTodoModelRequest', err)
        res.sendStatus(403)
    }
})

app.patch('/todo/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(403)
    }

    try {
        const updateTodoReq = UpdateTodoModelRequest.build(req.body, {
            validateMissingKeys: false,
            deleteExtraKeys: true
        })

        updateTodo(req, res, updateTodoReq)

    } catch (err) {
        console.error('Error parsing body to UpdateTodoModelRequest', err)
        res.sendStatus(403)
    }
})

app.delete('/todo/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(403)
    }

    models.Todo.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.sendStatus(200)).catch(err => {
        console.error(err)
        res.sendStatus(404)
    })
})

function updateTodo(req, res, updateTodoReq) {
    if (updateTodoReq.status) {
        models.TodoStatus.findByPk(updateTodoReq.status).then(todoStatus => {
            if (todoStatus) {
                models.Todo.update({ ...updateTodoReq }, { where: { id: req.params.id } }).then(todo => {
                    models.Todo.findByPk(todo[0]).then(todo => res.send(todo))
                })
            } else {
                console.error('the status \'' + updateTodoReq.status + '\' was not found in the database')
                res.sendStatus(404)
            }
        })
    } else {
        models.Todo.update({ ...updateTodoReq }, { where: { id: req.params.id } }).then(todo => {
            models.Todo.findByPk(todo[0]).then(todo => res.send(todo))
        })
    }
}
