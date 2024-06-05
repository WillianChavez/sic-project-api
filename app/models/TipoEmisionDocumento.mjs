import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { Servicio } from './index.mjs';

class TipoEmisionDocumento extends psql.Model {
  static associate() {
    this.hasMany(Servicio, {
      foreignKey: 'id_tipo_emision_documento',
      as: 'servicio_tipo_emision_documento',
    });
  }
}

TipoEmisionDocumento.init(
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
    tableName: 'ctl_tipo_emision_documento',
  },
);

export default TipoEmisionDocumento;
