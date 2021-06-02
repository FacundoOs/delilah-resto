const conexion = require("../conexion");
const jwt = require("jsonwebtoken");

const firma = "Acamica 2020";

function listaUsuarios(req, res) {
  let sql;
  let usuarioRol = req.params.rol.es_admin;
  let usuarioId = req.params.rol.id;

  if (usuarioRol == 1) {
    console.log(`Es admin`);
    sql = "SELECT * FROM delilah_resto.usuarios";
  } else {
    console.log(`No es admin`);
    sql = `SELECT * FROM delilah_resto.usuarios WHERE id = ${usuarioId}`;
  }

  conexion.query(sql, function (err, usuarios) {
    if (err) {
      res.send(err);
    } else {
      res.send(usuarios);
    }
  });
}

function crearUsuario(req, res) {
  const usuario = req.body;
  const token = jwt.sign(usuario.password, firma);
  const validar = "SELECT email, usuario FROM delilah_resto.usuarios";

  conexion.query(validar, function (err, info) {
    const resultEmail = info.find((elem) => elem.email === usuario.email);
    const resultUsuario = info.find((elem) => elem.usuario === usuario.usuario);

    if (resultEmail || resultUsuario) {
      res.status(409).json({ message: "El usuario existe" });
      return;
    }

    const sql = `INSERT INTO delilah_resto.usuarios(usuario, fullname, email, tel, direccion, password, es_admin)
   VALUES ('${usuario.usuario}', '${usuario.fullname}', '${usuario.email}', '${usuario.tel}', '${usuario.direccion}', '${token}', ${usuario.es_admin});`;

    conexion.query(sql, function (err, usuario) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "No ingreso todos los datos" });
      } else {
        res.status(201).json({ message: "usuario creado" });
      }
    });
  });
}

function logIn(req, res) {
  let usuario = req.body;
  let token = jwt.sign(usuario.password, firma);
  let sql = `SELECT password FROM delilah_resto.usuarios WHERE usuarios.password = '${token}' AND usuarios.usuario = '${usuario.usuario}'`;

  conexion.query(sql, function (err, passwords) {
    if (err || passwords.length == 0) {
      res.status(500).json({ message: "Usuario no exite o password incorrecto" });
      return;
    } else {
      let userLogged = jwt.sign(usuario, firma);

      res.json({
        mensaje: "Usuario autenticado correctamente",
        jwt: userLogged,
      });
    }
  });
}

module.exports = {
  listaUsuarios,
  crearUsuario,
  logIn
};
