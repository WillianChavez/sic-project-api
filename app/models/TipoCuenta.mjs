import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { Cuenta } from './index.mjs';

class TipoCuenta extends psql.Model {
  static associate() {
    this.hasMany(Cuenta, {
      foreignKey: 'id_tipo_cuenta',
      as: 'cuentas',
    });
  }
}

TipoCuenta.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: psql.Sequelize.STRING(250),
      allowNull: false,
    },
    codigo: {
      type: psql.Sequelize.STRING(20),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'ctl_tipo_cuenta',
  },
);

export default TipoCuenta;
