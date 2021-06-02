const conexion = require("../conexion");
const jwt = require("jsonwebtoken");
const firma = "Acamica 2020";

const validarToken = (token) => {
  try {
    const decoded = jwt.verify(token, firma);
    return decoded;
  } catch {
    return false;
  }
};

const definirRol = (req, res, next) => {
  //pasar el token por headers, crear uno con nombre 'token' y pasarle el token en values
  const token = req.headers["authorization"].replace("Bearer ", "");
  const decodedUser = validarToken(token);

  if (decodedUser) {
    req.params.usuario = decodedUser;
    next();
  } else {
    res.json({ mensaje: "Invalido" });
  }
};

const validarRol = (req, res, next) => {
  const info = req.params.usuario;
  const sql = `SELECT es_admin, id FROM delilah_Resto.usuarios WHERE usuarios.usuario = '${info.usuario}'`;

  conexion.query(sql, (err, rol) => {
    if (err) {
      console.log(err);
    } else {
      req.params.rol = rol[0];
      next();
    }
  });
};

module.exports = {
  definirRol,
  validarRol,
};
