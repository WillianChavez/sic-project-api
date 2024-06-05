const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_detalle_compra', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_compra: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mnt_compra',
          key: 'id',
        },
      },
      gravado_interno: {
        type: psql.Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      exento_interno: {
        type: psql.Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      exento_importacion: {
        type: psql.Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      compras_sujeto_excluido: {
        type: psql.Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      anticipo_uno_porciento_retenido: {
        type: psql.Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_detalle_compra');
  },
};
