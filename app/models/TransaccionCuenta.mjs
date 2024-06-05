import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { Cuenta, Transaccion } from './index.mjs';

class TransaccionCuenta extends psql.Model {
  static associate() {
    this.belongsTo(Transaccion, {
      foreignKey: 'id_transaccion',
      as: 'transaccion_cuenta_transaccion',
    });
    this.belongsTo(Cuenta, {
      foreignKey: 'id_cuenta',
      as: 'transaccion_cuenta_cuenta',
    });
  }
}

TransaccionCuenta.init(
  {
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
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_transaccion_cuenta',
  },
);

export default TransaccionCuenta;
