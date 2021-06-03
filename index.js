const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// Route requires
const { crearUsuario, listaUsuarios, logIn } = require("./routes/usuario");
const { validarRol, definirRol } = require("./middlewares/validacion");
const {
  seleccionProductos,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} = require("./routes/productos");
const { listaOrdenes, nuevaOrden, actualizarOrden, borrarOrden } = require("./routes/ordenes");

// Routes
app.get("/usuarios", definirRol, validarRol, listaUsuarios);
app.post("/usuarios", crearUsuario);
app.post("/login", logIn);

app.get("/productos", seleccionProductos);
app.post("/productos", definirRol, validarRol, crearProducto);
app.put("/productos/:id", definirRol, validarRol, actualizarProducto);
app.delete("/productos/:id", definirRol, validarRol, borrarProducto);

app.get("/ordenes", definirRol, validarRol, listaOrdenes);
app.post("/ordenes", definirRol, validarRol, nuevaOrden);
app.put("/ordenes/:id", definirRol, validarRol, actualizarOrden);
app.delete("/ordenes/:id", definirRol, validarRol, borrarOrden);

// Starting server
app.listen(PORT, function () {
  console.log(`App listening on PORT: ${PORT}`);
});
