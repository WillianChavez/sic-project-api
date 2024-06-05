const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_transaccion_cuenta', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_transaccion: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mnt_transaccion',
          key: 'id',
        },
      },
      id_cuenta: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mnt_cuenta',
          key: 'id',
        },
      },
      debe: {
        type: psql.Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      haber: {
        type: psql.Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_transaccion_cuenta');
  },
};
