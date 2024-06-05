import { Perfil, Rol, Usuario } from '../models/index.mjs';

export default class getRols {
  static async roles(userId, property = 'name') {
    const user = await Usuario.findOne({
      include: [{
        model: Rol, as: 'roles_usuario_usuario',
      },
      {
        model: Perfil,
        as: 'perfiles_usuario_usuario',
        include: [{
          model: Rol,
          as: 'roles_perfil',
        }],
      }],
      where: { id: userId },
    });
    const rolePerfils = user.perfiles_usuario_usuario.reduce((acumulador, value) => [...value.roles_perfil], []);
    /**
     * Set para hacer arreglo unico sin valores repetidos
     * */
    const rols = new Set(user.roles_usuario_usuario.concat(rolePerfils).map((row) => row[property]));
    return [...rols];
  }
}
