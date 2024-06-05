import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { Servicio } from './index.mjs';

class DetalleVenta extends psql.Model {
  static associate() {
    this.belongsTo(Servicio, {
      foreignKey: 'id_servicio',
      as: 'servicio',
    });
  }
}

DetalleVenta.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_servicio: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'mnt_servicio',
        key: 'id',
      },
    },
    numero_factura: {
      type: psql.Sequelize.STRING(20),
      allowNull: false,
    },
    gravado_local: {
      type: psql.Sequelize.DECIMAL(20, 2),
      allowNull: true,
    },
    cantidad_exento: {
      type: psql.Sequelize.DECIMAL(20, 2),
      allowNull: false,
    },
    cantidad_no_sujeta: {
      type: psql.Sequelize.DECIMAL(20, 2),
      allowNull: true,
    },
    gravado_exportacion: {
      type: psql.Sequelize.DECIMAL(20, 2),
      allowNull: true,
    },
    total_ventas: {
      type: psql.Sequelize.DECIMAL(20, 2),
      allowNull: false,
    },
    anticipo_uno_porciento_retenido: {
      type: psql.Sequelize.DECIMAL(20, 2),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_detalle_venta',
  },
);

export default DetalleVenta;
