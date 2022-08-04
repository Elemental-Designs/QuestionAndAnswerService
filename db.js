require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASS,
  host: process.env.HOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // database: process.env.DB_DATABASE,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
});

pool.connect()
  .then((client) =>
    client.release(),
    console.log('Connected to database'))
  .catch((err) => console.log(err));

module.exports = pool;