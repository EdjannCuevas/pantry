require('dotenv').config;
const knex = require('knex');
const config = require('../knexfile');
const env = NODE_ENV ? 'production' : 'development';

module.exports = knex(config[env]);