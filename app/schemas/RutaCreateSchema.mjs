const rutaCreateSchema = {
  $id: 'http://example.com/schemas/rutaCreate.json#',
  type: 'object',
  properties: {
    nombre: {
      type: 'string',
      errorMessage: {
        type: 'El nombre de la ruta debe ser de tipo alfanumerico',
      },
    },
    uri: {
      type: 'string',
      errorMessage: {
        type: 'La uri de la ruta debe ser de tipo alfanumerico',
      },
    },
    nombre_uri: {
      type: 'string',
      errorMessage: {
        type: 'El nombre de la ruta debe ser de tipo alfanumerico',
      },
    },
    mostrar: {
      type: 'boolean',
      errorMessage: {
        type: 'El parámetro mostrar de la ruta debe ser de tipo booleano',
      },
    },
    icono: {
      type: 'string',
      errorMessage: {
        type: 'El parámetro icono de la ruta debe ser de tipo alfanumerico',
      },
    },
    orden: {
      type: ['number', 'null'],
      errorMessage: {
        type: 'El parámetro orden de la ruta debe ser de tipo numérico',
      },
    },
    publico: {
      type: 'boolean',
      errorMessage: {
        type: 'El parámetro público de la ruta debe ser de tipo booleano',
      },
    },
    id_ruta_padre: {
      $ref: 'defs.json#/definitions/intOrNull',
      errorMessage: {
        type: 'El id de la ruta padre debe ser de tipo numérico',
      },
    },
  },
  required: ['nombre', 'uri', 'mostrar', 'nombre_uri'],
  errorMessage: {
    required: {
      nombre: 'El campo nombre de la ruta es requerido',
      mostrar: 'El campo mostrar de la ruta es requerido',
      uri: 'El campo uri de la ruta es requerido',
      nombre_uri: 'El campo nombre_uri de la ruta es requerido',
    },
  },
};

export default rutaCreateSchema;
