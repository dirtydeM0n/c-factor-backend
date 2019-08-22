import config = require('./config');
const Sequelize = require('sequelize');

let instance;
if (config.DB_URI) {
  // Option 1: Passing a connection URI
  // const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
  instance = new Sequelize(config.DB_URI);
} else {
  // Option 2: Passing parameters separately
  instance = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'postgres', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    pool: {
      min: 0,
      max: config.db.max || 5,
      acquire: 30000,
      idle: config.db.idleTimeoutMillis || 10000
    }
  });
}

export const Database = instance;