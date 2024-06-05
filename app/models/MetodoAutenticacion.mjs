import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
// eslint-disable-next-line import/no-cycle
import Usuario from './Usuario.mjs';
import MetodoAutenticacionUsuario from './MetodoAutenticacionUsuario.mjs';

class MetodoAutenticacion extends psql.Model {
  static associate() {
    this.belongsToMany(Usuario, {
      through: MetodoAutenticacionUsuario,
      foreignKey: 'id_metodo',
      otherKey: 'id_usuario',
      as: 'usuarios',
    });
    this.hasOne(MetodoAutenticacionUsuario, {
      foreignKey: 'id_metodo',
      as: 'MetodoAutenticacionUsuario',
    });
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      icono: this.icono,
      is_primary: this.MetodoAutenticacionUsuario?.is_primary || false,
      verified: this.MetodoAutenticacionUsuario?.verified,
      configured: !!this.MetodoAutenticacionUsuario,
    };
  }
}

MetodoAutenticacion.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: psql.Sequelize.STRING,
    },
    descripcion: {
      type: psql.Sequelize.STRING,
    },
    icono: {
      type: psql.Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_metodo_autenticacion',
  },
);

export default MetodoAutenticacion;
