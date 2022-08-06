require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
});

pool.connect()
  .then((client) =>
    client.release(),
    console.log('Connected to database'))
  .catch((err) => console.log(err));

module.exports = pool;