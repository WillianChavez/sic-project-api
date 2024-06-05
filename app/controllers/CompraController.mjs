import {
  Compra, DetalleCompra, Persona, Transaccion, TransaccionCuenta,
} from '../models/index.mjs';
import HttpCode from '../../configs/httpCode.mjs';
import DB from '../nucleo/DB.mjs';
import VerifyModel from '../utils/VerifyModel.mjs';

export default class CompraController {
  static async index(req, res) {
    const {
      page = 1,
      per_page: perPage = 10,
      paginacion = 'true',
    } = req.query;
    const options = {};

    if (paginacion === 'true') {
      VerifyModel.isValid(perPage, 'cantidad por pagina debe ser de tipo entero');
      VerifyModel.isValid(page, 'pagina debe ser de tipo entero');

      options.offset = perPage * (page - 1);
      options.limit = Number(perPage);
      options.distinct = true;
    }

    const { count: totalRows, rows: compras } = await Compra.findAndCountAll({
      ...options,
      include: [
        {
          model: DetalleCompra,
          as: 'detalle_compra',
        },
        {
          model: Transaccion,
          as: 'transaccion_compra',
          include: [
            {
              model: TransaccionCuenta,
              as: 'transaccion_cuenta',
            },
          ],
        },
        {
          model: Persona,
          as: 'proveedor',
        },
      ],
    });

    if (paginacion === 'true') {
      res.set({
        total_rows: Number(totalRows),
        page: Number(page),
        per_page: Number(perPage),
      });
    }

    return res.status(HttpCode.HTTP_OK).json(compras);
  }

  static async create(req, res) {
    const t = await DB.connection().transaction();
    try {
      const {
        detalleCompra, cuentas, persona, ...newcompra
      } = req.body;
      const transaccion = await Transaccion.create({}, { transaction: t });
      await TransaccionCuenta.bulkCreate(
        cuentas.map((cuenta) => ({ ...cuenta, id_transaccion: transaccion.id })),
        { transaction: t },
      );
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

      const compra = await Compra.create(
        { ...newcompra, id_transaccion: transaccion.id, id_persona: personaModel.id },
        { transaction: t },
      );

      await DetalleCompra.create(
        { ...detalleCompra, id_compra: compra.id },
        { transaction: t },
      );

      await t.commit();
      return res.status(HttpCode.HTTP_OK).json(compra);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  static async show(req, res) {
    const compra = await Compra.findByPk(req.params.id, {
      include: [
        {
          model: DetalleCompra,
        },
        {
          model: Transaccion,
          include: [
            {
              model: TransaccionCuenta,
            },
          ],
        },
        {
          model: Persona,
        },
      ],
    });
    return res.status(HttpCode.HTTP_OK).json(compra);
  }

  static async destroy(req, res) {
    const compra = await Compra.findByPk(req.params.id);
    await compra.destroy();
    return res.status(HttpCode.HTTP_OK).json(compra);
  }

  static async update(req, res) {
    const t = await DB.connection().transaction();
    try {
      const {
        detalleCompra, cuentas, persona, ...newcompra
      } = req.body;
      const compra = await Compra.findByPk(req.params.id, {
        include: [
          {
            model: DetalleCompra,
          },
          {
            model: Transaccion,
            include: [
              {
                model: TransaccionCuenta,
              },
            ],
          },
        ],
      });

      const personaExistente = await Persona.findOne({
        where: {
          nit: persona.nit,
        },
      });
      let personaModel = null;

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

      await compra.update(
        { ...newcompra, id_persona: personaModel.id },
        {
          transaction: t,
        },
      );

      await DetalleCompra.update(
        { ...detalleCompra },
        {
          where: {
            id: compra.DetalleCompra.id,
          },
          transaction: t,
        },
      );

      await TransaccionCuenta.destroy({
        where: {
          id_transaccion: compra.id_transaccion,
        },
        transaction: t,
      });

      await TransaccionCuenta.bulkCreate(
        cuentas.map((cuenta) => ({ ...cuenta, id_transaccion: compra.id_transaccion })),
        { transaction: t },
      );

      await t.commit();
      return res.status(HttpCode.HTTP_OK).json(compra);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}
