const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_servicio', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_tipo_contribuyente: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ctl_tipo_contribuyente',
          key: 'id',
        },
      },
      id_transaccion: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mnt_transaccion',
          key: 'id',
        },
      },
      id_tipo_emision_documento: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ctl_tipo_emision_documento',
          key: 'id',
        },
      },
      fecha: {
        type: psql.Sequelize.DATE,
        allowNull: false,
      },
      id_cliente: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mnt_persona',
          key: 'id',
        },
      },
      descripcion: {
        type: psql.Sequelize.STRING(250),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_servicio');
  },
};
