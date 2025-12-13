
var mysql = require("mysql2");

// create a connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "health_app",
  password: "qwertyuiop",
  database: "health",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

global.db = db;
module.exports = db;
