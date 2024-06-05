import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import {
  DetalleCompra, Persona, TipoContribuyente, Transaccion,
} from './index.mjs';

class Compra extends psql.Model {
  static associate() {
    this.belongsTo(TipoContribuyente, {
      foreignKey: 'id_tipo_contribuyente',
      as: 'tipo_contribuyente_compra',
    });
    this.hasOne(DetalleCompra, {
      foreignKey: 'id_compra',
      hooks: true,
      onDelete: 'CASCADE',
      as: 'detalle_compra',
    });
    this.belongsTo(Persona, {
      foreignKey: 'id_proveedor',
      as: 'proveedor',
    });
    this.belongsTo(Transaccion, {
      foreignKey: 'id_transaccion',
      as: 'transaccion_compra',
    });
  }
}

Compra.init(
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
    id_tipo_contribuyente: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'ctl_tipo_contribuyente',
        key: 'id',
      },
    },
    fecha_emision: {
      type: psql.Sequelize.DATE,
      allowNull: false,
    },
    descripcion: {
      type: psql.Sequelize.STRING(250),
      allowNull: false,
    },
    numero_documento_ccf: {
      type: psql.Sequelize.STRING(20),
      allowNull: false,
    },
    id_proveedor: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'mnt_persona',
        key: 'id',
      },
    },
    es_sujeto_excluido: {
      type: psql.Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_compra',
  },
);

export default Compra;
