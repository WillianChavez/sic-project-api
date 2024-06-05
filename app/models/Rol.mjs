/* eslint-disable import/no-cycle */
import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
// eslint-disable-next-line import/no-cycle
import Ruta from './Ruta.mjs';
import RutaRol from './RutaRol.mjs';
// eslint-disable-next-line import/no-cycle
import Perfil from './Perfil.mjs';
import PerfilRol from './PerfilRol.mjs';
// eslint-disable-next-line import/no-cycle
import Usuario from './Usuario.mjs';
import UsuarioRol from './UsuarioRol.mjs';
import TipoRol from './TipoRol.mjs';

class Rol extends psql.Model {
  static associate() {
    this.belongsToMany(Ruta, {
      through: RutaRol,
      foreignKey: 'id_rol',
      otherKey: 'id_ruta',
      as: 'ruta_rol_rol',
    });
    this.belongsToMany(Perfil, {
      through: PerfilRol,
      foreignKey: 'id_rol',
      otherKey: 'id_perfil',
      as: 'perfil_rol_rol',
    });

    this.belongsToMany(Usuario, {
      through: UsuarioRol,
      foreignKey: 'id_rol',
      otherKey: 'id_usuario',
      as: 'usuario_rol_rol',
    });
    this.belongsTo(TipoRol, {
      foreignKey: 'id_tipo_rol',
      as: 'tipo_rol_rol',
    });
  }
}

Rol.init({
  id: {
    type: psql.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: psql.Sequelize.STRING(255),
    allowNull: false,
  },
  id_tipo_rol: {
    type: psql.Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  sequelize: DB.connection(),
  tableName: 'mnt_rol',
});

export default Rol;
