import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
// eslint-disable-next-line import/no-cycle
import Rol from './Rol.mjs';
import UsuarioRol from './UsuarioRol.mjs';
// eslint-disable-next-line import/no-cycle
import RefreshToken from './RefreshToken.mjs';
// eslint-disable-next-line import/no-cycle
import Perfil from './Perfil.mjs';
import UsuarioPerfil from './UsuarioPerfil.mjs';
// eslint-disable-next-line import/no-cycle
import MetodoAutenticacion from './MetodoAutenticacion.mjs';
import MetodoAutenticacionUsuario from './MetodoAutenticacionUsuario.mjs';

const UsuarioSchema = {
  id: {
    type: psql.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: { type: psql.Sequelize.STRING },
  password: { type: psql.Sequelize.TEXT },
  last_login: { type: psql.Sequelize.STRING },
  is_suspended: { type: psql.Sequelize.BOOLEAN },
  token_valid_after: { type: psql.Sequelize.STRING },
  two_factor_status: { type: psql.Sequelize.BOOLEAN },
  verified: { type: psql.Sequelize.BOOLEAN },
  nombre: { type: psql.Sequelize.STRING },
};

class Usuario extends psql.Model {
  static associate() {
    this.belongsToMany(Rol, {
      through: UsuarioRol,
      foreignKey: 'id_usuario',
      otherKey: 'id_rol',
      as: 'roles_usuario_usuario',
    });
    this.belongsToMany(MetodoAutenticacion, {
      through: MetodoAutenticacionUsuario,
      foreignKey: 'id_usuario',
      otherKey: 'id_metodo',
      as: 'metodos_autenticacion_usuario',
    });
    this.hasMany(RefreshToken, {
      foreignKey: 'id_usuario',
      as: 'refresh_tokens_usuario',
    });
    this.belongsToMany(Perfil, {
      through: UsuarioPerfil,
      foreignKey: 'id_usuario',
      otherKey: 'id_perfil',
      as: 'perfiles_usuario_usuario',
    });
  }

  static async getById(id) {
    return this.findOne({
      where: {
        id,
      },
      attributes: ['id', 'email'],
      include: [
        {
          model: Perfil,
          attributes: ['id', 'nombre'],
          through: {
            attributes: [],
          },
        },
        {
          model: Rol,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      last_login: this.last_login,
      is_suspended: this.is_suspended,
      perfiles: this.Perfils,
      roles: this.Rols,
      nombre: this.nombre,
    };
  }
}

Usuario.init(UsuarioSchema, {
  timestamps: true,
  updatedAt: false,
  createdAt: 'created_at',
  sequelize: DB.connection(),
  tableName: 'mnt_usuario',
});

export {
  UsuarioSchema,
};
export default Usuario;
