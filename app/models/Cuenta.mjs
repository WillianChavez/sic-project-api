import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { TipoCuenta, TransaccionCuenta } from './index.mjs';

class Cuenta extends psql.Model {
  static associate() {
    this.belongsTo(TipoCuenta, {
      foreignKey: 'id_tipo_cuenta',
      as: 'tipo_cuenta_cuenta',
    });
    this.hasMany(TransaccionCuenta, {
      foreignKey: 'id_cuenta',
      hooks: true,
      onDelete: 'CASCADE',
      as: 'transaccion_cuenta',
    });
  }
}

Cuenta.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_tipo_cuenta: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'ctl_tipo_cuenta',
        key: 'id',
      },
    },
    nombre: {
      type: psql.Sequelize.STRING(250),
      allowNull: false,
    },
    codigo: {
      type: psql.Sequelize.STRING(20),
      allowNull: false,
    },
    requerido: {
      type: psql.Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: psql.Sequelize.DATE,
      allowNull: false,
      defaultValue: psql.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: psql.Sequelize.DATE,
      allowNull: true,
      defaultValue: psql.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    deleted_at: {
      type: psql.Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    sequelize: DB.connection(),
    tableName: 'mnt_cuenta',
  },
);

export default Cuenta;
