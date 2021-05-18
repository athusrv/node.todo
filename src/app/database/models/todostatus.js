'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TodoStatus extends Model {
        static PENDING = 'PENDING'
        static DONE = 'DONE'

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            TodoStatus.hasMany(models.Todo, {
                foreignKey: 'status'
            })
        }
    }

    TodoStatus.init({}, {
        sequelize,
        modelName: 'TodoStatus',
    })

    return TodoStatus;
};
