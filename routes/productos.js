const conexion = require("../conexion");

function seleccionProductos(req, res) {
  const sql = "SELECT * FROM delilah_resto.productos";

  conexion.query(sql, function (err, productos) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal error" });
    } else {
      res.send(productos);
    }
  });
}

function crearProducto(req, res) {
  const nuevoProducto = req.body;
  let sql;
  const usuarioRol = req.params.rol.es_admin;

  if (usuarioRol == 1) {
    sql = `INSERT INTO delilah_resto.productos(nombre_producto, precio, stock, img_url, categoria)
      VALUES ('${nuevoProducto.nombre_producto}', ${nuevoProducto.precio}, ${nuevoProducto.stock}, '${nuevoProducto.img_url}', '${nuevoProducto.categoria}');`;
  } else {
    res.status(403).json({ message: "El usuario no esta autorizado para realizar esta operacion" });
    return;
  }

  conexion.query(sql, function (err, productos) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Asegurese de ingresar todos los datos del producto" });
    } else {
      res.status(201).json({
        message: "producto creado",
        productoId: productos.insertId,
      });
    }
  });
}

function actualizarProducto(req, res) {
  const actualizar = req.body;
  const productoId = req.params.id;
  let sql;
  const usuarioRol = req.params.rol.es_admin;

  if (usuarioRol == 1) {
    sql = `UPDATE delilah_Resto.productos
      SET precio = ${actualizar.precio},
      nombre_producto = '${actualizar.nombre_producto}',
      stock = ${actualizar.stock},
      img_url= '${actualizar.img_url}',
      categoria = '${actualizar.categoria}'
      WHERE id = ${productoId}`;
  } else {
    res.status(403).json({ message: "El usuario no esta autorizado para realizar esta operacion" });
    return;
  }

  conexion.query(sql, function (err, producto) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Asegurese de ingresar todos los datos para actualizar" });
    } else {
      res.status(200).json({ message: "producto actualizado", producto });
    }
  });
}

function borrarProducto(req, res) {
  const productoId = req.params.id;
  let sql;
  const usuarioRol = req.params.rol.es_admin;

  if (usuarioRol == 1) {
    sql = `DELETE FROM productos WHERE id = ${productoId}`;
  } else {
    res.status(403).json({ message: "El usuario no esta autorizado para realizar esta operacion" });
    return;
  }

  conexion.query(sql, function (err, producto) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Error" });
    } else {
      res.status(200).json({ message: "producto eliminado", producto });
    }
  });
}

module.exports = {
  seleccionProductos,
  crearProducto,
  actualizarProducto,
  borrarProducto,
};
