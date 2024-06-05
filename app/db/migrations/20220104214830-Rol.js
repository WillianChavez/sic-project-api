const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_rol', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: psql.Sequelize.STRING(255),
        allowNull: false,
      },
      id_tipo_rol: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ctl_tipo_rol',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_rol');
  },
};
