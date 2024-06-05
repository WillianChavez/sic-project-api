const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_transaccion', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_transaccion');
  },
};
