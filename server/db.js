const Pool = require("pg").Pool;
const config = require("config");
const DB = config.get("dbConfig");

const { user, password, host, port, database } = DB;

const pool = new Pool({
  user,
  password,
  host,
  port,
  database,
});

module.exports = pool;
