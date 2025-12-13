
var mysql = require("mysql2");
global.db = db;

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

module.exports = db;
