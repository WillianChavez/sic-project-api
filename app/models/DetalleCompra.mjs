import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { Compra } from './index.mjs';

class DetalleCompra extends psql.Model {
  static associate() {
    this.belongsTo(Compra, {
      foreignKey: 'id_compra',
      as: 'compra',
    });
  }
}

DetalleCompra.init(
  {
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
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_detalle_compra',
  },
);

export default DetalleCompra;
