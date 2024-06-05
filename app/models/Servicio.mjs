import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import {
  DetalleVenta,
  Persona, TipoContribuyente, TipoEmisionDocumento, Transaccion,
} from './index.mjs';

class Servicio extends psql.Model {
  static associate() {
    this.belongsTo(TipoContribuyente, {
      foreignKey: 'id_tipo_contribuyente',
      as: 'tipo_contribuyente',
    });
    this.belongsTo(TipoEmisionDocumento, {
      foreignKey: 'id_tipo_emision_documento',
      as: 'tipo_emision_documento',
    });
    this.belongsTo(Persona, {
      foreignKey: 'id_cliente',
      as: 'cliente',
    });
    this.hasOne(DetalleVenta, {
      foreignKey: 'id_servicio',
      hooks: true,
      onDelete: 'CASCADE',
      as: 'detalle_venta',
    });
    this.belongsTo(Transaccion, {
      foreignKey: 'id_transaccion',
      as: 'transaccion_servicio',
    });
  }
}

Servicio.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_tipo_contribuyente: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'ctl_tipo_contribuyente',
        key: 'id',
      },
    },
    id_transaccion: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'mnt_transaccion',
        key: 'id',
      },
    },
    id_Servicio: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'mnt_Servicio',
        key: 'id',
      },
    },
    id_tipo_emision_documento: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'ctl_tipo_emision_documento',
        key: 'id',
      },
    },
    id_cliente: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'mnt_persona',
        key: 'id',
      },
    },
    fecha: {
      type: psql.Sequelize.DATE,
      allowNull: false,
    },
    descripcion: {
      type: psql.Sequelize.STRING(250),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_servicio',
  },
);

export default Servicio;
