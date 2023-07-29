const {config} = require('./config');

// Loading and initializing the library:
const pgp = require('pg-promise')({
  // Initialization Options
});

// Preparing the connection details:
const cn = {
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password
};

// Creating a new database instance from the connection details:
const db = pgp(cn);

// Run sql query
const runSql = async function(SqlQuery) {
  try {
    await db.any(SqlQuery);
    return true;
  } catch (e) {
    return Promise.reject(e);
  }
}


// Exporting the database object for shared use:
module.exports.pgp = pgp;
module.exports.db = db;
module.exports.runSql = runSql;
