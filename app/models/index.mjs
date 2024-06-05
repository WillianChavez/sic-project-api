import Usuario from './Usuario.mjs';
import RefreshToken from './RefreshToken.mjs';
import Perfil from './Perfil.mjs';
import PerfilRol from './PerfilRol.mjs';
import Rol from './Rol.mjs';
import Ruta from './Ruta.mjs';
import RutaRol from './RutaRol.mjs';
import UsuarioPerfil from './UsuarioPerfil.mjs';
import UsuarioRol from './UsuarioRol.mjs';
import MetodoAutenticacion from './MetodoAutenticacion.mjs';
import TipoCuenta from './TipoCuenta.mjs';
import Cuenta from './Cuenta.mjs';
import TipoContribuyente from './TipoContribuyente.mjs';
import TipoEmisionDocumento from './TipoEmisionDocumento.mjs';
import Servicio from './Servicio.mjs';
import Compra from './Compra.mjs';
import DetalleVenta from './DetalleVenta.mjs';
import DetalleCompra from './DetalleCompra.mjs';
import Persona from './Persona.mjs';
import Transaccion from './Transaccion.mjs';
import TransaccionCuenta from './TransaccionCuenta.mjs';

Usuario.associate();
RefreshToken.associate();
Perfil.associate();
Rol.associate();
Ruta.associate();
MetodoAutenticacion.associate();
TipoContribuyente.associate();
TipoCuenta.associate();
Cuenta.associate();
Transaccion.associate();
TransaccionCuenta.associate();
TipoEmisionDocumento.associate();
Servicio.associate();
Compra.associate();
DetalleCompra.associate();
DetalleVenta.associate();
Persona.associate();

export {
  RefreshToken,
  Usuario,
  Perfil,
  PerfilRol,
  Rol,
  Ruta,
  RutaRol,
  UsuarioPerfil,
  UsuarioRol,
  MetodoAutenticacion,
  TipoCuenta,
  Cuenta,
  TipoContribuyente,
  TipoEmisionDocumento,
  Servicio,
  Compra,
  DetalleCompra,
  DetalleVenta,
  Persona,
  Transaccion,
  TransaccionCuenta,
};
