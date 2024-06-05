import { Router } from 'express';
import Call from '../../app/utils/Call.mjs';
import ServicioController from '../../app/controllers/ServicioController.mjs';

const router = Router();

router.get('/', Call(ServicioController.index));
router.post('/', Call(ServicioController.create));
router.get('/:id', Call(ServicioController.show));
router.put('/:id', Call(ServicioController.update));
router.delete('/:id', Call(ServicioController.destroy));

export default router;
