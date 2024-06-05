import { Router } from 'express';
import validate from '../../app/middlewares/validate.mjs';
import UsuarioController from '../../app/controllers/UsuarioController.mjs';
import usuarioCreateSchema from '../../app/schemas/UsuarioCreateSchema.mjs';
import Call from '../../app/utils/Call.mjs';
import usuarioPasswordUpdate from '../../app/schemas/UsuarioPasswordUpdateSchema.mjs';
import usuarioUpdateEmailSchema from '../../app/schemas/UsuarioUpdateEmailSchema.mjs';
import validateRole from '../../app/middlewares/validateRole.mjs';
import usuarioUpdateSchema from '../../app/schemas/UsuarioUpdateSchema.mjs';

const router = Router();
router.get('/2fa/method', [validateRole('ROLE_USER_AUTH_METHOD_LIST')], Call(UsuarioController.getMetodosUsuario));
router.get('/', [validateRole('ROLE_USER_LIST')], Call(UsuarioController.index));
router.post('/', [validateRole('ROLE_USER_CREATE'), validate(usuarioCreateSchema)], Call(UsuarioController.store));
router.get('/:id', [validateRole('ROLE_USER_LIST')], Call(UsuarioController.show));
router.put('/:id', [validateRole('ROLE_USER_UPDATE'), validate(usuarioUpdateSchema)], Call(UsuarioController.update));
router.delete('/:id', [validateRole('ROLE_USER_DELETE')], Call(UsuarioController.destroy));
router.put('/update/password', [validate(usuarioPasswordUpdate)], Call(UsuarioController.updatePassword));
router.put('/update/email', [validate(usuarioUpdateEmailSchema)], Call(UsuarioController.updateEmail));
router.post('/2fa/method', Call(UsuarioController.storeMethodUser));
router.post('/2fa/method/verify', Call(UsuarioController.authMethodVerification));
router.put('/2fa/method/:id_method', Call(UsuarioController.updatePrimaryMethod));

export default router;
