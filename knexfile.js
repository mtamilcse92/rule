// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'casa',
      user: 'postgres',
      password: '55555'
    },

    migrations: {
      tableName: 'knex_migrations',
    },
    seed: { directory: './seeds' },
    debug: false
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'casa',
      user: 'postgres',
      password: '55555'
    },

    migrations: {
      tableName: 'knex_migrations',
    },
    seed: { directory: './seeds' },
    debug: false
  }

};