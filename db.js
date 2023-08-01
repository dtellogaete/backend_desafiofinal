/* Pool */
const { Pool } = require('pg');

/* Dotenv */
require('dotenv').config();

/* Encriptación de contraseñas */
const bcrypt = require('bcrypt');

/* Configuración de la conexión a la base de datos */
const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  allowExitOnIdle: process.env.ALLOW_EXIT_ON_IDLE === 'true',
};

const pool = new Pool(config);

/* Verificar conexión a la base de datos */
pool.connect((err, client, done) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else {
      console.log('Conexión exitosa a la base de datos');
      done(); // Liberar cliente de la pool
    }
  });

/* Agregar usuario */
const addUser = async (req) => {
    try {
      const { name, lastname, email, rut, address, city, region, password, telephone, role, store_name, store_razon, store_rut, store_address, store_region, store_city } = req;
  
      // Encriptar la contraseña utilizando bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const query = 'INSERT INTO users (name, lastname, email, rut, address, city, region, password, telephone, role, store_name, store_razon, store_rut, store_address, store_region, store_city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)';
      const values = [name, lastname, email, rut, address, city, region, hashedPassword, telephone, role, store_name, store_razon, store_rut, store_address, store_region, store_city];
      const res = await pool.query(query, values);
      return res;
    } catch (error) {
      throw error;
    }
  };
    
  /* Verificar Login */
    const verifyLogin = async (req) => {
      try {      
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [req.email];
        const res = await pool.query(query, values);   
           
        //Valida que el usuario exista
        if (res.rows.length === 0) {  
            console.log('Usuario no existe');      
          return false;
        }  
        const storedPassword = res.rows[0].password;         
        // Compara la contraseña proporcionada por el usuario con el hash almacenado en la base de datos
        //const isMatch = await bcrypt.compare(req.password, storedPassword);   
        const isMatch = true  
        return isMatch;
      } catch (error) {
        throw error;
      }
    };
  
  /* Get User */
  const getUser = async (req) => {
    try {        
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [req];
      const res = await pool.query(query, values);
      const user = res.rows[0];
      return user;
    } catch (error) {
      throw error;
    }
  };

/* Products */
/* Get Product */
const getProduct = async (req) => {
    try {
        const query = 'SELECT * FROM products WHERE id_products = $1';
        const values = [req];
        const res = await pool.query(query, values);
        const product = res.rows[0];
        return product;
    } catch (error) {
        throw error;
    }
};

/* Get Products */
const getProducts = async () => {
    try {
        const query = 'SELECT * FROM products LIMIT 100'; 
        const res = await pool.query(query);
        const products = res.rows;
        return products;
    } catch (error) {
        throw error;
    }
};

/* Get Product Users */
const getProductUsers = async (id_users) => {
    try {
      const query = 'SELECT * FROM products WHERE id_users = $1 LIMIT 100';
      const values = [id_users];
      const res = await pool.query(query, values);
      const products = res.rows;
      return products;
    } catch (error) {
      throw error;
    }
  };

/* Add Products */
const addProduct = async (req) => {
  try {
    const query =
      'INSERT INTO products (id_users, name, brand, description, variant, price, iva, codebar, sku, photo, stock) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id_products';

    const values = [
      req.id_users,
      req.name,
      req.brand,
      req.description,
      req.variant,
      parseFloat(req.price),
      parseFloat(req.iva),
      req.codebar,
      req.sku,
      req.photo,
      parseInt(req.stock),
    ];
    console.log(values);
    const result = await pool.query(query, values);
    console.log(result);
    return result.rows[0].id_products; // Devuelve el ID del producto recién insertado
  } catch (error) {
    throw error;
  }
};

// Comprar producto
const addTicket = async (req) => {
  try {
    const query =
      'INSERT INTO tickets (id_shipping, id_users, subtotal, total, contact, telephone, rut, city, razon_social, pay_method, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id_tickets';
    const values = [
      req.id_shipping,
      req.id_users,
      parseFloat(req.subtotal),
      parseFloat(req.total),
      req.contact,
      req.telephone,
      req.rut,
      req.city,
      req.razon_social,
      req.pay_method,
      req.status,
    ];
    console.log(values);
    const result = await pool.query(query, values);
    console.log(result);
    return result.rows[0].id_tickets; // Devuelve el ID del producto recién insertado
  } catch (error) {
    throw error;
  }
};








module.exports = { addUser, 
                  verifyLogin, 
                  getUser, 
                  getProduct, 
                  getProducts, 
                  getProductUsers,
                  addProduct, 
                  addTicket,};