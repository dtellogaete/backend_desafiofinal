**README del Backend de Marketplace**

Este es el README para el backend del Marketplace. El backend está construido utilizando Node.js y el framework Express, y se comunica con una base de datos PostgreSQL. A continuación, se proporciona una descripción general del archivo `index.js` e información sobre la base de datos.

## Archivo index.js

El archivo `index.js` es el punto de entrada principal del backend de Marketplace. Aquí se configuran las rutas, se utilizan middlewares y se inicia el servidor.

1. **Importación de módulos y configuración**: Se importan los módulos necesarios, como `express`, `middlewares`, `jsonwebtoken`, y `dotenv`. También se carga la clave secreta desde las variables de entorno.

2. **Configuración del servidor**: Se crea una instancia de Express llamada `app`. Luego, se aplican los middlewares utilizando `app.use(middlewares)`.

3. **Definición de rutas**: Se definen las rutas para diferentes operaciones, como crear usuarios, realizar el inicio de sesión, obtener información de usuarios y productos, agregar y editar productos, gestionar tickets y detalles de tickets, y agregar contactos.

4. **Levantar el servidor**: El servidor se inicia en un puerto específico (3002 en este caso) utilizando `app.listen`.

## Base de Datos

A continuación, se describen las tablas de la base de datos:

- **contact**: Contiene información de contacto enviada por los usuarios a través de un formulario.

- **products**: Almacena información sobre los productos disponibles en el marketplace, como nombre, marca, descripción, precio, foto, entre otros.

- **users**: Almacena información sobre los usuarios registrados en el sistema, incluidos los detalles personales, como nombre, apellido, correo electrónico, dirección, contraseña, y rol.

- **tickets**: Almacena información sobre los tickets generados por los usuarios al realizar compras, incluyendo detalles como el subtotal, el total, el método de pago y el estado del ticket.

- **ticket_details**: Contiene detalles específicos de los productos incluidos en un ticket, como la cantidad de productos.

## Rutas 

Breve Descripción de las Rutas en el Backend de Marketplace:

1. **POST Usuarios**: Esta ruta permite crear nuevos usuarios. Se espera que se proporcione un objeto JSON en el cuerpo de la solicitud que contenga información del usuario, como nombre, apellido, correo electrónico, contraseña, etc. Si la creación es exitosa, se devuelve un mensaje de éxito junto con los detalles del resultado.

2. **GET Login**: Aquí se realiza el inicio de sesión de los usuarios. Se espera recibir un objeto JSON con las credenciales (correo electrónico y contraseña). Si las credenciales son válidas, se genera un token JWT que se devuelve como respuesta.

3. **GET Usuarios con JWT**: Esta ruta requiere un token JWT en el encabezado de autorización (Bearer Token). Si el token es válido, se decodifica y se utiliza para obtener información del usuario. Los datos del usuario se devuelven como respuesta.

4. **Editar usuarios con PUT**: Permite la edición de la información de un usuario existente. Se espera un objeto JSON con los detalles a actualizar. La respuesta incluirá los detalles actualizados del usuario.

5. **Backend Products**: Las siguientes rutas están relacionadas con la gestión de productos.

    - **GET Product id**: Devuelve información detallada de un producto en función de su ID.

    - **GET Productos**: Devuelve una lista de todos los productos disponibles.

    - **GET Productos de Usuarios**: Devuelve la lista de productos asociados a un usuario en particular mediante su ID.

    - **POST product**: Crea un nuevo producto. Se espera un objeto JSON con detalles del producto a agregar.

    - **UPDATE Editar Productos con PUT**: Permite editar los detalles de un producto existente. Se espera un objeto JSON con los detalles actualizados.

    - **DELETE product**: Elimina un producto según su ID.

6. **TICKETS**: Las siguientes rutas están relacionadas con la gestión de tickets.

    - **POST Ticket**: Crea un nuevo ticket. Se espera un objeto JSON con detalles del ticket a agregar.

    - **GET tickets por id_users**: Devuelve una lista de tickets relacionados con un usuario específico según su ID.

    - **POST Ticket Detail**: Agrega detalles específicos de productos a un ticket. Se espera un objeto JSON con detalles del ticket y productos asociados.

7. **ADD CONTACT**: Agrega un nuevo contacto. Se espera un objeto JSON con detalles de contacto, como nombre, correo electrónico y mensaje.
