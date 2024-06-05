import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { Compra, Servicio } from './index.mjs';

class TipoContribuyente extends psql.Model {
  static associate() {
    this.hasMany(Compra, {
      foreignKey: 'id_tipo_contribuyente',
      as: 'compra_tipo_contribuyente',
    });
    this.hasMany(Servicio, {
      foreignKey: 'id_tipo_contribuyente',
      as: 'servicio_tipo_contribuyente',
    });
  }
}

TipoContribuyente.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: psql.Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'ctl_tipo_contribuyente',
  },
);

export default TipoContribuyente;
