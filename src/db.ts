const Sequelize = require('sequelize');
import config = require('./config');

let instance;
if (config.DATABASE_URL) {
  // Option 1: Passing a connection URI
  // const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
  instance = new Sequelize(config.DATABASE_URL, { query: { raw: true } });
} else {
  // Option 2: Passing parameters separately
  instance = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'postgres', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    forceSchema: true,
    pool: {
      min: 0,
      max: config.db.max || 5,
      acquire: 30000,
      idle: config.db.idleTimeoutMillis || 10000
    },
    query: { raw: true }
  });

  /*if (config.NODE_ENV === 'development') {
    instance.sync({ alter: true }).then(() => {
      console.log('All data has been reset');
    }, (err) => {
      console.log('An error occurred while creating the table:', err);
    });
  }*/
}

export const Database = instance;