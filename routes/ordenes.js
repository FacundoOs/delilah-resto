const conexion = require("../conexion");

function listaOrdenes(req, res) {
  let sql;
  const usuarioRol = req.params.rol.es_admin;
  const usuarioId = req.params.rol.id;

  if (usuarioRol == 1) {
    sql = `SELECT * FROM ordenes_detalles
        INNER JOIN ordenes ON ordenes_detalles.orden_id = ordenes.id
        INNER JOIN productos ON ordenes_detalles.producto_id = productos.id
        INNER JOIN usuarios ON ordenes.usuario_id = usuarios.id`;
  } else {
    sql = `SELECT * FROM ordenes_detalles
        INNER JOIN ordenes ON ordenes_detales.orden_id = ordenes.id
        INNER JOIN productos ON ordenes_detalles.producto_id = productos.id
        INNER JOIN users ON ordenes.user_id = usuarios.id
        WHERE usuario_id = ${usuarioId}`;
  }
  conexion.query(sql, (err, ordenes) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error interno" });
      return;
    } else {
      res.send(ordenes);
    }
  });
}

function nuevaOrden(req, res) {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const d = new Date();
  const h = addZero(d.getHours());
  const m = addZero(d.getMinutes());
  const orderTime = h + ":" + m;
  const usuarioId = req.params.rol.id;

  const orden = req.body;

  const sql = `INSERT INTO delilah_resto.ordenes(usuario_id, status, metodo_pago, update_time)
  VALUES (${usuarioId}, 'nueva', '${orden.metodo_pago}', '${orderTime}')`;

  conexion.query(sql, function (err, ordenes) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error Interno" });
    } else {
      orden.detalles.forEach((element) => {
        const ordenDetalle = `INSERT INTO delilah_resto.ordenes_detalles(orden_id, producto_id, cantidad) VALUES (${ordenes.insertId}, ${element.producto_id}, '${element.cantidad}')`;

        conexion.query(ordenDetalle, (err, orden) => {
          if (err) {
            res.status(500).json({ message: "Error Interno" });
            return;
          }
        });
      });
      res.status(200).json({ message: "Orden creada" });
    }
  });
}

function actualizarOrden(req, res) {
  let actualizar = req.body;
  let ordenId = req.params.id;

  let sql;
  let usuarioRol = req.params.rol.es_admin;

  if (usuarioRol == 1) {
    sql = `UPDATE delilah_resto.ordenes
      SET status = '${actualizar.status}'
      WHERE id = ${ordenId}`;
  } else {
    res.status(403).json({ message: "El usuario no esta autorizado para realizar esta accion" });
    return;
  }

  conexion.query(sql, (err, orden) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error interno" });
    } else {
      res.status(200).json({ message: "Status de orden actualizado", orden });
    }
  });
}

function borrarOrden(req, res) {
  let ordenId = req.params.id;

  let sql;
  let usuarioRol = req.params.rol.es_admin;

  if (usuarioRol == 1) {
    sql = `DELETE FROM ordenes WHERE id = ${ordenId}`;
  } else {
    res.status(403).json({ message: "El usuario no esta autorizado para realizar esta accion" });
    return;
  }

  conexion.query(sql, function (err, orden) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Error interno" });
    } else {
      let sqlOrdenDetalles = `DELETE FROM ordenes_detalles WHERE ordenes_detalles.orden_id = ${ordenId}`;
      conexion.query(sqlOrdenDetalles, function (err, nuevaOrden) {
        if (err) {
          console.log(err);
        }
      });

      res.status(200).json({ message: "orden borrada", orden });
    }
  });
}

module.exports = {
  listaOrdenes,
  nuevaOrden,
  actualizarOrden,
  borrarOrden,
};
