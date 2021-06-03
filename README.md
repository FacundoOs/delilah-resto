# Delilah Resto

Esta API permite crear un sistema de pedidos online para un restaurante. </br></br>
Un administrador puede:
- ver, crear, editar y eliminar productos.
- actualizar el status de una orden.
- ver la informacion de todos los usuarios.</br></br>

Un cliente puede:
- ver todos los productos.
- ver su informacion de usuario.
- crear pedidos.
- ver solo sus pedidos.</br></br>

Un usuario sin loguearse puede:
- ver todos los productos

## Procedimiento:

### **1 - Instalacion**

Clonar el repositorio:
https://github.com/FacundoOs/delilah-resto

Instalar dependencias:
```
npm install
```

### **2 - Crear base de datos**
Accede a mysql:
```
mysql -u root -p
```
- Copia el codigo que se encuentra en: **database/sql/create_database.sql** </br>
- Luego copia el codigo que se encuentra en **database/sql/create_tables.sql**


### **3- Iniciar el servidor**

Corre:
```
nodemon index.js
```

### **4 - Documentacion con el listado de los endpoints**
Importa el archivo **swagger/spec.yaml** en [Swagger](https://swagger.io/)

### **5 - Uso de la API**

#### *Usuarios*
- Ver todos los usuarios o uno solo dependiendo del rol  </br>
  GET
  ```
  http://localhost:3000/usuarios
  ```

- Creacion de usuario con permisos de administrador:</br>
  POST
  ```
  {
     "usuario":"Facundo",
      "fullname":"Facundo Os",
     "email":"facundoOs@gmail.com",
      "tel":"123456789",
      "direccion":"Leopardi 140",
     "password":"facundo123",
     "es_admin": true
  }
  ```
- Para crear un usuario sin permisos de administrador modifica:
  ```
  "es_admin": false
  ```

- Login:
  ```
  http://localhost:3000/login
  ```
  POST
  ```
  {
      "usuario": "Facundo",
      "password": "facundo123"
  }
  ```

  Copia el token recibido. Si esta usando [POSTMAN](https://www.postman.com/) peguelo en ```Authorization```.

_ _ _

#### Productos
- Ver todos los productos:</br>
  GET
  ```
  http://localhost:3000/productos
  ```
  
- Crear productos:
  ```
  http://localhost:3000/productos
  ```
  POST
  ```
  {
     "nombre_producto" : "ensalada",
     "precio" : 40.00,
     "stock" : 20,
     "img_url" : "https://url_image.com",
     "categoria" : "ensalada"
  }
  ```

- Actualizar un producto:
  ```
  http://localhost:3000/products/:id
  ```
  PUT
  ```
  {
     "nombre_producto" : "ensalada",
     "precio" : 40.00,
     "stock" : 0,
      "img_url" : "https://url_image.com",
      "categoria" : "ensalada"
  }
  ```

- Borrar un producto: DELETE  </br>
  Solo necesitas el id del producto que quieres borrar

_ _ _

#### Ordenes
- Ver todas las ordenes o solo las suyas dependiendo del rol </br>
  GET
  ```
  http://localhost:3000/ordenes
  ```

- Crear una orden:
  POST
  ```
  {
      "detalles": [
         {
             "producto_id": 3,
              "cantidad": 2
          },
         {
             "producto_id": 14,
             "cantidad": 3
          }
     ],
     "metodo_pago": "tarjeta"
  }
  ```

- Actualizar el status de una orden
  ```
  http://localhost:3000/ordenes/:id
  ```
  PUT
  ```
  {
      "status": "confirmado"
  }
  ```
- Borrar una orden: DELETE  </br>
  Solo necesitas el id de la orden que quieres borrar

