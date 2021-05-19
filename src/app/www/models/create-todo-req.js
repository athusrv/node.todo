'use strict'

class CreateTodoModelRequest {
    static __keys = ['title', 'description']

    static build(payload, options) {
        const model = new CreateTodoModelRequest()
        Object.assign(model, payload)

        if (options.validateMissingKeys) {
            CreateTodoModelRequest.__keys.forEach(key => {
                if (!model[key] && (!options.optionalKeys || !options.optionalKeys.find(k => k === key))) {
                    throw Error('the key \'' + key + '\' is required')
                }
            })
        }

        if (options.deleteExtraKeys) {
            Object.keys(model).forEach(key => {
                if (!CreateTodoModelRequest.__keys.find(k => k === key)) {
                    delete model[key]
                }
            })
        }

        return model
    }
}

module.exports = CreateTodoModelRequest
