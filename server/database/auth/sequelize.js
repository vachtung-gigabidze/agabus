// config/sequelize.js
const { Sequelize } = require('sequelize');
const config = require('./database');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
  }
);

module.exports = sequelize;