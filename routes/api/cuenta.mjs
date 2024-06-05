import { Router } from 'express';
import Call from '../../app/utils/Call.mjs';
import CuentaController from '../../app/controllers/CuentaController.mjs';

const router = Router();

router.get('/', Call(CuentaController.index));
router.post('/', Call(CuentaController.create));
router.get('/:id', Call(CuentaController.show));
router.put('/:id', Call(CuentaController.update));
router.delete('/:id', Call(CuentaController.destroy));

export default router;
