import { Cuenta, TipoCuenta } from '../models/index.mjs';
import HttpCode from '../../configs/httpCode.mjs';
import VerifyModel from '../utils/VerifyModel.mjs';

export default class CuentaController {
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

    const { count: totalRows, rows: cuentas } = await Cuenta.findAndCountAll({
      ...options,
      include: [
        {
          model: TipoCuenta,
          as: 'tipo_cuenta_cuenta',
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

    return res.status(HttpCode.HTTP_OK).json(cuentas);
  }

  static async create(req, res) {
    const cuenta = await Cuenta.create(req.body);
    return res.status(HttpCode.HTTP_OK).json(cuenta);
  }

  static async show(req, res) {
    const cuenta = await Cuenta.findByPk(req.params.id);
    return res.status(HttpCode.HTTP_OK).json(cuenta);
  }

  static async update(req, res) {
    const cuenta = await Cuenta.findByPk(req.params.id);
    await cuenta.update(req.body);
    return res.status(HttpCode.HTTP_OK).json(cuenta);
  }

  static async destroy(req, res) {
    const cuenta = await Cuenta.findByPk(req.params.id);
    await cuenta.destroy();
    return res.status(HttpCode.HTTP_OK).json(cuenta);
  }
}
