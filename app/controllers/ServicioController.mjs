import {
  Servicio, DetalleVenta, Transaccion, Persona, TransaccionCuenta,
} from '../models/index.mjs';
import HttpCode from '../../configs/httpCode.mjs';
import DB from '../nucleo/DB.mjs';

export default class ServicioController {
  static async index(req, res) {
    const servicios = await Servicio.findAll({
      include: [
        {
          model: DetalleVenta,
        },
      ],
    });
    return res.status(HttpCode.HTTP_OK).json(servicios);
  }

  static async create(req, res) {
    const t = await DB.connection().transaction();
    try {
      const {
        detalleVenta, persona, cuentas, ...servicio
      } = req.body;

      let personaModel = null;

      const personaExistente = await Persona.findOne({
        where: {
          nit: persona.nit,
        },
      });

      if (personaExistente) {
        personaModel = await personaExistente.update(
          { ...persona },
          {
            transaction: t,
          },
        );
      } else {
        personaModel = await Persona.create(
          { ...persona },
          {
            transaction: t,
          },
        );
      }

      const transaccion = await Transaccion.create({}, { transaction: t });

      await TransaccionCuenta.bulkCreate(
        cuentas.map((cuenta) => ({ ...cuenta, id_transaccion: transaccion.id })),
        { transaction: t },
      );

      const newServicio = await Servicio.create(
        { ...servicio, id_transaccion: transaccion.id, id_persona: personaModel.id },
        { transaction: t },
      );

      await DetalleVenta.create(
        { ...detalleVenta, id_servicio: newServicio.id },
        { transaction: t },
      );

      await t.commit();

      return res.status(HttpCode.HTTP_OK).json(newServicio);
    } catch (error) {
      t.rollback();
      throw error;
    }
  }

  static async show(req, res) {
    const servicio = await Servicio.findByPk(req.params.id, {
      include: [
        {
          model: DetalleVenta,
        },
      ],
    });

    return res.status(HttpCode.HTTP_OK).json(servicio);
  }

  static async update(req, res) {
    const servicio = await Servicio.findByPk(req.params.id);

    const { detalleVenta, ...newServicio } = req.body;
    await Servicio.update(newServicio, { where: { id: req.params.id } });
    await DetalleVenta.update(detalleVenta, {
      where: { id: servicio.id_detalle_venta },
    });

    return res.status(HttpCode.HTTP_OK).json(servicio);
  }

  static async destroy(req, res) {
    const servicio = await Servicio.findByPk(req.params.id);
    await servicio.destroy();
    return res.status(HttpCode.HTTP_OK).json(servicio);
  }
}
