const mysql = require("mysql2");

const conexion = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "020404Ma@",
  database: "delilah_resto",
});

module.exports = conexion;
