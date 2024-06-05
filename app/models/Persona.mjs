import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { Compra, Servicio } from './index.mjs';

class Persona extends psql.Model {
  static associate() {
    this.hasMany(Compra, {
      foreignKey: 'id_proveedor',
      as: 'compra_proveedor',
    });
    this.hasMany(Servicio, {
      foreignKey: 'id_cliente',
      as: 'servicio_cliente',
    });
  }
}

Persona.init(
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
    nit: {
      type: psql.Sequelize.STRING(20),
      allowNull: false,
    },
    nrc: {
      type: psql.Sequelize.STRING(20),
      allowNull: true,
    },

  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_persona',
  },
);

export default Persona;
