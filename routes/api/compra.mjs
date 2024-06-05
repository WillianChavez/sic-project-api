import { Router } from 'express';
import Call from '../../app/utils/Call.mjs';
import CompraController from '../../app/controllers/CompraController.mjs';

const router = Router();

router.get('/', Call(CompraController.index));
router.post('/', Call(CompraController.create));
router.get('/:id', Call(CompraController.show));
router.put('/:id', Call(CompraController.update));
router.delete('/:id', Call(CompraController.destroy));

export default router;
