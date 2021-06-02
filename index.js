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

// Routes
app.get("/usuarios", definirRol, validarRol, listaUsuarios);
app.post("/usuarios", crearUsuario);
app.post("/login", logIn);

// Starting server
app.listen(PORT, function () {
  console.log(`App listening on PORT: ${PORT}`);
});
