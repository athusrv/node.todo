'use strict';

const {sequelize, Sequelize} = require('../models')
const TodoStatus = require('../models/todostatus')(sequelize, Sequelize.DataTypes)

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('TodoStatuses', [
            {
                id: TodoStatus.PENDING,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: TodoStatus.DONE,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('TodoStatuses', null, {});
    }
};
