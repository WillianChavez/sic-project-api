const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_persona', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: psql.Sequelize.STRING(250),
        allowNull: false,
      },
      nit: {
        type: psql.Sequelize.STRING(20),
        allowNull: false,
      },
      nrc: {
        type: psql.Sequelize.STRING(20),
        allowNull: true,
      },

    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_persona');
  },
};
