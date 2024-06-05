const bcrypt = require('bcryptjs');
const Speakeasy = require('speakeasy');

module.exports = {
  up: async (queryInterface) => {
    const TRANSACTION = await queryInterface.sequelize.transaction();

    try {
      const salt = bcrypt.genSaltSync();

      const [PROFILE] = await queryInterface.bulkInsert(
        'mnt_perfil',
        [
          {
            nombre: 'SUPER_ADMIN',
          },
          {
            nombre: 'USUARIO',
          },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      const METODOAUTENTICACION = await queryInterface.bulkInsert(
        'mnt_metodo_autenticacion',
        [
          {
            nombre: 'Correo Electrónico',
            descripcion: 'Envío de codigo de seguridad por correo electrónico',
            icono: 'mdi-email',
          },
          {
            nombre: 'Código QR',
            descripcion: 'Creacion de código mediante Autenticador de Google',
            icono: 'mdi-qrcode',
          },
        ],
        { returning: ['id'], transaction: TRANSACTION },
      );
      const passwordCrypt = bcrypt.hashSync(process.env.PASSWORD_INICIAL, salt);

      const [USUARIO] = await queryInterface.bulkInsert(
        'mnt_usuario',
        [
          {
            email: process.env.EMAIL_INICIAL,
            password: passwordCrypt,
            is_suspended: false,
            two_factor_status: process.env.TWO_FACTOR_AUTH === 'true',
            verified: true,
            nombre: process.env.NOMBRE_INICIAL,
          },
        ],
        {
          returning: ['id', 'email'],
          transaction: TRANSACTION,
        },
      );

      await queryInterface.bulkInsert(
        'mnt_metodo_autenticacion_usuario',
        [
          {
            id_usuario: USUARIO.id,
            id_metodo: METODOAUTENTICACION[0].id,
            secret_key: Speakeasy.generateSecret().base32,
            is_primary: true,
            verified: true,
          },
        ],
        {
          transaction: TRANSACTION,
        },
      );

      const [backend, admin] = await queryInterface.bulkInsert(
        'ctl_tipo_rol',
        [
          { name: 'Backend', prefijo: 'ROLE_' },
          { name: 'Admin', prefijo: 'ROLE_ADMIN_' },
          { name: 'Frontend', prefijo: 'ROLE_FRONT_' },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      /**
       * ROLES PARA EL BACKEND
       * */
      const ROLES = await queryInterface.bulkInsert(
        'mnt_rol',
        [
          // Roles de perfil
          { name: 'ROLE_PROFILE_LIST', id_tipo_rol: backend.id },
          { name: 'ROLE_PROFILE_CREATE', id_tipo_rol: backend.id },
          { name: 'ROLE_PROFILE_UPDATE', id_tipo_rol: backend.id },
          // Roles de rol :(
          { name: 'ROLE_ROLE_LIST', id_tipo_rol: backend.id },
          { name: 'ROLE_ROLE_CREATE', id_tipo_rol: backend.id },
          { name: 'ROLE_ROLE_UPDATE', id_tipo_rol: backend.id },
          { name: 'ROLE_ROLE_DELETE', id_tipo_rol: backend.id },
          // Roles de ruta
          { name: 'ROLE_PATH_LIST', id_tipo_rol: backend.id },
          { name: 'ROLE_PATH_CREATE', id_tipo_rol: backend.id },
          { name: 'ROLE_PATH_UPDATE', id_tipo_rol: backend.id },
          // Roles de Usuario
          { name: 'ROLE_USER_LIST', id_tipo_rol: backend.id },
          { name: 'ROLE_USER_CREATE', id_tipo_rol: backend.id },
          { name: 'ROLE_USER_UPDATE', id_tipo_rol: backend.id },
          { name: 'ROLE_USER_DELETE', id_tipo_rol: backend.id },
          { name: 'ROLE_USER_AUTH_METHOD_LIST', id_tipo_rol: backend.id },

          /**
           * ROLES PARA EL ADMIN
           * */
          { name: 'ROLE_ADMIN_PROFILE_DELETE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_ROLE_DELETE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_PATH_DELETE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_USER_DELETE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_ROLE_UPDATE', id_tipo_rol: admin.id },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      /**
       * ROLES PARA LAS RUTAS DEL ADMIN
       * */
      const ROLES_RUTAS_ADMIN = await queryInterface.bulkInsert(
        'mnt_rol',
        [
          { name: 'ROLE_ADMIN_DASHBOARD_VIEW', id_tipo_rol: admin.id },
          // Roles de perfil
          { name: 'ROLE_ADMIN_PROFILE_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_PROFILE_CREATE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_PROFILE_UPDATE', id_tipo_rol: admin.id },
          // Roles de rol :(
          { name: 'ROLE_ADMIN_ROLE_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_ROLE_CREATE', id_tipo_rol: admin.id },
          // Roles de ruta
          { name: 'ROLE_ADMIN_PATH_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_PATH_CREATE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_PATH_UPDATE', id_tipo_rol: admin.id },
          // Roles de Usuario
          { name: 'ROLE_ADMIN_USER_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_USER_CREATE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_USER_UPDATE', id_tipo_rol: admin.id },
          { name: 'ROLE_USER_ADMIN', id_tipo_rol: admin.id },

          // roles para ver, crear y editar los servicios
          { name: 'ROLE_ADMIN_SERVICE_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_SERVICE_CREATE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_SERVICE_UPDATE', id_tipo_rol: admin.id },

          // roles para ver, crear y editar las compras
          { name: 'ROLE_ADMIN_PURCHASE_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_PURCHASE_CREATE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_PURCHASE_UPDATE', id_tipo_rol: admin.id },

          // roles para ver las cuentas
          { name: 'ROLE_ADMIN_ACCOUNT_LIST', id_tipo_rol: admin.id },

          // roles para ver los reportes
          { name: 'ROLE_ADMIN_REPORT_LIST', id_tipo_rol: admin.id },
          // reporte de libro de ventas a contribuyentes
          { name: 'ROLE_ADMIN_REPORT_SALES_BOOK_LIST', id_tipo_rol: admin.id },
          // reporte de libro de ventas a consumidores finales
          { name: 'ROLE_ADMIN_REPORT_SALES_BOOK_CONSUMERS_LIST', id_tipo_rol: admin.id },
          // reporte de libro de compras
          { name: 'ROLE_ADMIN_REPORT_PURCHASE_BOOK_LIST', id_tipo_rol: admin.id },
          // reporte de libro de diario mayor
          { name: 'ROLE_ADMIN_REPORT_GENERAL_LEDGER_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_REPORT_LEDGER_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_REPORT_LEDGER_ST', id_tipo_rol: admin.id },

        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      const RUTAS = await queryInterface.bulkInsert(
        'mnt_ruta',
        [
          {
            nombre: 'dashboard',
            uri: '/',
            nombre_uri: 'dashboard',
            mostrar: true,
            icono: 'mdi-home',
            orden: 1,
            publico: false,
            admin: true,
          },
          {
            nombre: 'perfiles',
            uri: '/profiles',
            nombre_uri: 'profiles',
            mostrar: false,
            icono: 'mdi-account',
            orden: 2,
            publico: false,
            admin: true,
          },
          {
            nombre: 'perfiles',
            uri: '/profiles/create',
            nombre_uri: 'profilesCreate',
            mostrar: false,
            icono: 'mdi-account',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'perfiles',
            uri: '/profiles/edit',
            nombre_uri: 'profilesEdit',
            mostrar: false,
            icono: 'mdi-account',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'roles',
            uri: '/roles',
            nombre_uri: 'roles',
            mostrar: false,
            icono: 'mdi-account-group',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'roles',
            uri: '/roles/create',
            nombre_uri: 'rolesCreate',
            mostrar: false,
            icono: 'mdi-account-multiple-plus',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'rutas',
            uri: '/paths',
            nombre_uri: 'paths',
            mostrar: false,
            icono: 'mdi-routes',
            orden: 2,
            publico: false,
            admin: true,
          },
          {
            nombre: 'rutas',
            uri: '/paths/create',
            nombre_uri: 'pathsCreate',
            mostrar: false,
            icono: 'mdi-routes',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'rutas',
            uri: '/paths/edit',
            nombre_uri: 'pathsEdit',
            mostrar: false,
            icono: 'mdi-routes',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'usuarios',
            uri: '/users',
            nombre_uri: 'users',
            mostrar: true,
            icono: 'mdi-face-man',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'usuarios',
            uri: '/users/create',
            nombre_uri: 'usersCreate',
            mostrar: false,
            icono: 'mdi-face-man',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'usuarios',
            uri: '/users/edit',
            nombre_uri: 'usersEdit',
            mostrar: false,
            icono: 'mdi-face-man',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'perfil',
            uri: '/profile',
            nombre_uri: 'profile',
            mostrar: false,
            icono: 'mdi-account-lock',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'seguridad',
            uri: '/security',
            nombre_uri: 'security',
            mostrar: false,
            icono: null,
            orden: null,
            publico: false,
            admin: false,
          },
          // rutas para ver, crear y editar los servicios
          {
            nombre: 'servicios',
            uri: '/servicios',
            nombre_uri: 'servicios',
            mostrar: true,
            icono: 'mdi-cog',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'servicios',
            uri: '/servicios/crear',
            nombre_uri: 'servicios-crear',
            mostrar: false,
            icono: 'mdi-cog',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'servicios',
            uri: '/servicios/editar/:id',
            nombre_uri: 'servicios-editar',
            mostrar: false,
            icono: 'mdi-cog',
            orden: null,
            publico: false,
            admin: true,
          },
          // rutas para ver, crear y editar las compras
          {
            nombre: 'compras',
            uri: '/compras',
            nombre_uri: 'compras',
            mostrar: true,
            icono: 'mdi-cart',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'compras',
            uri: '/compras/crear',
            nombre_uri: 'compras-crear',
            mostrar: false,
            icono: 'mdi-cart',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'compras',
            uri: '/compras/editar/:id',
            nombre_uri: 'compras-editar',
            mostrar: false,
            icono: 'mdi-cart',
            orden: null,
            publico: false,
            admin: true,
          },
          // rutas para ver las cuentas
          {
            nombre: 'cuentas',
            uri: '/cuentas',
            nombre_uri: 'cuentas',
            mostrar: true,
            icono: 'mdi-cash',
            orden: null,
            publico: false,
            admin: true,
          },
          // rutas para ver los reportes
          {
            nombre: 'reportes',
            uri: '/reportes',
            nombre_uri: 'reportes',
            mostrar: true,
            icono: 'mdi-file-chart',
            orden: null,
            publico: false,
            admin: true,
          },
          // reporte de libro de ventas a contribuyentes
          {
            nombre: 'reportes',
            uri: '/reportes/libro-ventas-contribuyentes',
            nombre_uri: 'reportes-libro-ventas-contribuyentes',
            mostrar: false,
            icono: 'mdi-file-chart',
            orden: null,
            publico: false,
            admin: true,
          },
          // reporte de libro de ventas a consumidores finales
          {
            nombre: 'reportes',
            uri: '/reportes/libro-ventas-consumidores-finales',
            nombre_uri: 'reportes-libro-ventas-consumidores-finales',
            mostrar: false,
            icono: 'mdi-file-chart',
            orden: null,
            publico: false,
            admin: true,
          },
          // reporte de libro de compras
          {
            nombre: 'reportes',
            uri: '/reportes/libro-compras',
            nombre_uri: 'reportes-libro-compras',
            mostrar: false,
            icono: 'mdi-file-chart',
            orden: null,
            publico: false,
            admin: true,
          },
          // reporte de libro de diario mayor
          {
            nombre: 'reportes',
            uri: '/reportes/libro-diario',
            nombre_uri: 'reportes-libro-diario',
            mostrar: false,
            icono: 'mdi-file-chart',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'reportes',
            uri: '/reportes/libro-mayor',
            nombre_uri: 'reportes-libro-mayor',
            mostrar: false,
            icono: 'mdi-file-chart',
            orden: null,
            publico: false,
            admin: true,
          },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      // ASIGNAR ROLES AL PERFIL ADMIN
      await queryInterface.bulkInsert(
        'mnt_perfil_rol',
        ROLES.concat(ROLES_RUTAS_ADMIN).map((role) => ({
          id_perfil: PROFILE.id,
          id_rol: role.id,
        })),
        {
          transaction: TRANSACTION,
        },
      );

      await queryInterface.bulkInsert(
        'mnt_ruta_rol',
        ROLES_RUTAS_ADMIN.map((role, index) => ({
          id_ruta: RUTAS[index].id,
          id_rol: role.id,
        })),
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      /** Perfil relacionar con Usuario */
      await queryInterface.bulkInsert(
        'mnt_usuario_perfil',
        [
          {
            id_perfil: PROFILE.id,
            id_usuario: USUARIO.id,
          },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      await queryInterface.bulkInsert(
        'ctl_tipo_cuenta',
        [
          {
            nombre: 'ACTIVO',
            codigo: '1',
          },
          {
            nombre: 'PASIVO',
            codigo: '2',
          },
          {
            nombre: 'PATRIMONIO',
            codigo: '3',
          },
          {
            nombre: 'CUENTAS DE RESULTADO DEUDORAS',
            codigo: '4',
          },
          {
            nombre: 'CUENTAS DE RESULTADO ACREEDORAS',
            codigo: '5',
          },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      await queryInterface.bulkInsert(
        'mnt_cuenta',
        [
          {
            id_tipo_cuenta: 1,
            nombre: 'Caja',
            codigo: '110101',
            requerido: true,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Bancos',
            codigo: '110102',
            requerido: true,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Cuentas por cobrar',
            codigo: '110201',
            requerido: false,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Documentos por cobrar',
            codigo: '110202',
            requerido: false,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Otras cuentas por cobrar',
            codigo: '110203',
            requerido: false,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Crédito fiscal IVA',
            codigo: '1103',
            requerido: true,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Pagos adicionales',
            codigo: '1104',
            requerido: false,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Suministros de oficina',
            codigo: '110401',
            requerido: false,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Alquiler de local',
            codigo: '110402',
            requerido: false,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Publicidad',
            codigo: '110403',
            requerido: false,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Deudores diversos',
            codigo: '1105',
            requerido: false,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Mobiliario y equipo',
            codigo: '120101',
            requerido: false,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Equipo de computo',
            codigo: '120102',
            requerido: false,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Depreciación acumulada propiedad y equipos',
            codigo: '1202',
            requerido: false,
          },
          {
            id_tipo_cuenta: 1,
            nombre: 'Licencias',
            codigo: '1203',
            requerido: false,
          },
          {
            id_tipo_cuenta: 2,
            nombre: 'Préstamos bancarios',
            codigo: '2101',
            requerido: false,
          },
          {
            id_tipo_cuenta: 2,
            nombre: 'Documentos por pagar',
            codigo: '2102',
            requerido: false,
          },
          {
            id_tipo_cuenta: 2,
            nombre: 'Cuentas por pagar',
            codigo: '2103',
            requerido: false,
          },
          {
            id_tipo_cuenta: 2,
            nombre: 'Debito fiscal IVA',
            codigo: '2104',
            requerido: true,
          },
          {
            id_tipo_cuenta: 2,
            nombre: 'Acreedores diversos',
            codigo: '2105',
            requerido: false,
          },
          {
            id_tipo_cuenta: 2,
            nombre: 'Préstamos bancarios a largo plazo',
            codigo: '2201',
            requerido: false,
          },
          {
            id_tipo_cuenta: 2,
            nombre: 'Documentos por pagar a largo plazo',
            codigo: '2202',
            requerido: false,
          },
          {
            id_tipo_cuenta: 3,
            nombre: 'Capital',
            codigo: '3101',
            requerido: false,
          },
          {
            id_tipo_cuenta: 3,
            nombre: 'Utilidad del ejercicio',
            codigo: '3102',
            requerido: false,
          },
          {
            id_tipo_cuenta: 4,
            nombre: 'Costos por servicios',
            codigo: '4101',
            requerido: false,
          },
          {
            id_tipo_cuenta: 4,
            nombre: 'Costos de adquisición de licencias',
            codigo: '4102',
            requerido: false,
          },
          {
            id_tipo_cuenta: 4,
            nombre: 'Salarios',
            codigo: '4103',
            requerido: true,
          },
          {
            id_tipo_cuenta: 4,
            nombre: 'Vacaciones',
            codigo: '4104',
            requerido: false,
          },
          {
            id_tipo_cuenta: 4,
            nombre: 'Aguinaldo',
            codigo: '4105',
            requerido: false,
          },
          {
            id_tipo_cuenta: 4,
            nombre: 'Cuota patronal ISSS',
            codigo: '4106',
            requerido: false,
          },
          {
            id_tipo_cuenta: 4,
            nombre: 'Cuota patronal AFP',
            codigo: '4107',
            requerido: false,
          },
          {
            id_tipo_cuenta: 4,
            nombre: 'INSAFORP',
            codigo: '4108',
            requerido: false,
          },
          {
            id_tipo_cuenta: 4,
            nombre: 'Mantenimiento de equipos',
            codigo: '4109',
            requerido: false,
          },
          {
            id_tipo_cuenta: 4,
            nombre: 'Gastos por servicios vendidos',
            codigo: '4110',
            requerido: false,
          },
          {
            id_tipo_cuenta: 4,
            nombre: 'Gastos de administración',
            codigo: '4111',
            requerido: false,
          },
          {
            id_tipo_cuenta: 4,
            nombre: 'Gastos financieros',
            codigo: '4112',
            requerido: false,
          },
          {
            id_tipo_cuenta: 5,
            nombre: 'Servicios de consultoría',
            codigo: '510101',
            requerido: false,
          },
          {
            id_tipo_cuenta: 5,
            nombre: 'Servicios de desarrollo',
            codigo: '510102',
            requerido: false,
          },
          {
            id_tipo_cuenta: 5,
            nombre: 'Descuentos por servicios',
            codigo: '510201',
            requerido: false,
          },
          {
            id_tipo_cuenta: 5,
            nombre: 'Reclamos por servicios',
            codigo: '510202',
            requerido: false,
          },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      await queryInterface.bulkInsert(
        'ctl_tipo_contribuyente',
        [
          {
            id: 1,
            nombre: 'Gran contribuyente',
          },
          {
            id: 2,
            nombre: 'Otros contribuyentes',
          },
          {
            id: 3,
            nombre: 'Ninguno',
          },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      await queryInterface.bulkInsert(
        'ctl_tipo_emision_documento',
        [
          {
            id: 1,
            nombre: 'Factura de exportación',
          },
          {
            id: 2,
            nombre: 'Comprobante crédito fiscal',
          },
          {
            id: 3,
            nombre: 'Factura',
          },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      await TRANSACTION.commit();
    } catch (e) {
      console.log(e);
      await TRANSACTION.rollback();
    }
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await Promise.all([
      queryInterface.bulkDelete('mnt_usuario_perfil', null, {}),
      queryInterface.bulkDelete('mnt_ruta_rol', null, {}),
      queryInterface.bulkDelete('mnt_perfil_rol', null, {}),
      queryInterface.bulkDelete('mnt_ruta', null, {}),
      queryInterface.bulkDelete('mnt_rol', null, {}),
      queryInterface.bulkDelete('ctl_tipo_rol', null, {}),
      queryInterface.bulkDelete('mnt_metodo_autenticacion_usuario', null, {}),
      queryInterface.bulkDelete('refresh_tokens', null, {}),
      queryInterface.bulkDelete('mnt_usuario', null, {}),
      queryInterface.bulkDelete('mnt_metodo_autenticacion', null, {}),
      queryInterface.bulkDelete('mnt_perfil', null, {}),
    ]);
  },
};
