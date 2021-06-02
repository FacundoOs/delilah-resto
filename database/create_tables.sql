CREATE TABLE delilah_resto.usuarios(
	id INT AUTO_INCREMENT NOT NULL,
  usuario VARCHAR(255) NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  tel VARCHAR(45) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  es_admin BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY(id)
);
CREATE TABLE delilah_resto.productos(
	id INT AUTO_INCREMENT NOT NULL,
  nombre_producto VARCHAR(255) NOT NULL,
  precio FLOAT(4,2) NOT NULL,
  stock BOOLEAN NOT NULL DEFAULT TRUE, 
  img_url VARCHAR(255) NOT NULL,
  categoria VARCHAR(255),
  PRIMARY KEY(id)
);
CREATE TABLE delilah_resto.ordenes(
	id INT AUTO_INCREMENT NOT NULL,
  usuario_id INT NOT NULL,
  status VARCHAR(45) NOT NULL,
  metodo_pago VARCHAR(45) NOT NULL,
  update_time TIME NOT NULL,
  PRIMARY KEY(id)
);
CREATE TABLE delilah_resto.ordenes_detalles(
	id INT AUTO_INCREMENT NOT NULL,
  orden_id INT NOT NULL,
	producto_id INT NOT NULL,
	cantidad INT NOT NULL,
  PRIMARY KEY(id)
)