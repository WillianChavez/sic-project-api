const config = {
  connections: {
    postgres: {
      motor: process.env.DB_DIALECT || 'postgres', // mysql, mariadb, sqlite, postgres
      options: {
        db_host: process.env.DB_HOST || 'localhost',
        db_port: process.env.DB_PORT || 5432,
        db_name: process.env.DB_DATABASE || 'api_node',
        db_username: process.env.DB_USERNAME || 'username',
        db_password: process.env.DB_PASSWORD || 'password',
      },
    },
  },
  default: 'postgres',
};

export default config;
