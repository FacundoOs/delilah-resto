const mysql = require("mysql2");

const conexion = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "your_password",
  database: "delilah_resto",
});

module.exports = conexion;
