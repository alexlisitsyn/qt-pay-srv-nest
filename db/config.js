require('dotenv').config();

const config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    schema: process.env.DB_SCHEMA
  }
}

exports.config = config;
