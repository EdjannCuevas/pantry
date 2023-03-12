require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DB_URL_LOCAL,
        searchPath: 'public',
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL + '?sslmode=require',
        searchPath: 'public',
        ssl: true,
        migrations: {
            tableName: 'knex_migrations',
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    }
};