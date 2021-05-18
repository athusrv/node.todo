class UpdateTodoModelRequest {
    static __keys = ['title', 'description', 'status']

    static build(payload, options) {
        const model = new UpdateTodoModelRequest()
        Object.assign(model, payload)

        if (options.validateMissingKeys) {
            UpdateTodoModelRequest.__keys.forEach(key => {
                if (!model[key]) {
                    throw Error('the key \'' + key + '\' is required')
                }
            })
        }

        if (options.deleteExtraKeys) {
            Object.keys(model).forEach(key => {
                if (!UpdateTodoModelRequest.__keys.find(k => k === key)) {
                    delete model[key]
                }
            })
        }

        return model
    }
}

module.exports = UpdateTodoModelRequest
