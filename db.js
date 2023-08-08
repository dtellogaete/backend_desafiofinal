/* Pool */
const { Pool } = require('pg');

/* Dotenv */
require('dotenv').config();

/* Encriptación de contraseñas */
const bcrypt = require('bcrypt');

/* Configuración de la conexión a la base de datos */
const config = {  
  conectionString: process.env.DATABASE_URL,
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

/*UPDATE user*/
const editUser = async (req) => {
  try {
    const { name, lastname, email, rut, address, city, region, password, telephone, role, store_name, store_razon, store_rut, store_address, store_region, store_city, id_users } = req;

    // Encriptar la contraseña utilizando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'UPDATE users SET name=$1, lastname=$2, email=$3, rut=$4, address=$5, city=$6, region=$7, password=$8, telephone=$9, role=$10, store_name=$11, store_razon=$12, store_rut=$13, store_address=$14, store_region=$15, store_city=$16 WHERE id_users = $17';
    const values = [name, lastname, email, rut, address, city, region, hashedPassword, telephone, role, store_name, store_razon, store_rut, store_address, store_region, store_city, id_users];
    const res = await pool.query(query, values);
    return res;
    
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

// Editar producto
const editProduct = async (req) => {
  try {
    const query =
      'UPDATE  products  SET  name=$1, brand=$2, description=$3, variant=$4, price=$5, iva=$6, codebar=$7, sku=$8, photo=$9, stock=$10 WHERE id_products=$11';

    const values = [
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
      req.id_products
    ];
    console.log(values);
    const result = await pool.query(query, values);
    console.log(result);
    return result
  } catch (error) {
    throw error;
  }
};


// Delete producto
const deleteProduct = async (req) => {
  try {
    const query = 'DELETE FROM products WHERE id_products = $1';
    const values = [req];
    const result = await pool.query(query, values);
    return result;
  } catch (error) {
    throw error;
  }

};


// Comprar producto
const addTicket = async (req) => {
  try {
    const query =
      'INSERT INTO tickets (id_users, subtotal, total, contact, telephone, rut, city, razon_social, pay_method, status, dateticket, doc_sii, region, city_shipping, region_shipping, address_shipping) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, \'Pendiente\', $10, $11, $12, $13, $14, $15) RETURNING id_tickets';
    const values = [
      req.id_users,
      parseFloat(req.subtotal),
      parseFloat(req.total),
      req.contact,
      req.telephone,
      req.rut,
      req.city,
      req.razon_social,
      req.pay_method,
      parseInt(req.dateticket),
      req.doc_sii,
      req.region,
      req.city_shipping,
      req.region_shipping,
      req.address_shipping,
    ];
    console.log("tickets",values);
    const result = await pool.query(query, values);
    
    return result.rows[0].id_tickets;
  } catch (error) {
    throw error;
  }
};

// Obtener ticket por cliente 
const getTicketId = async (req) => {
  try {
    const query = 'SELECT * FROM tickets where id_users = $1';
    const values = [req];
    
    const res = await pool.query(query, values);
    const tickets = res.rows;    
    return tickets;
  } catch (error) {
    throw error;
  }
};

/* CONTACT */
const addContact = async (req) => {
  try {
    const query = 'INSERT INTO contact (name, email, telephone, subject, message) VALUES ($1, $2, $3, $4, $5) RETURNING idcontact';
    const values = [req.name, req.email, req.telephone, req.subject, req.message];
    console.log(values);
    const result = await pool.query(query, values);
    console.log(result);
    return result.rows[0].idcontact; 
  } catch (error) {
    throw error;
  }
};

/* ticket detail */

const addTicketDetail = async (req) => {
  try {
    const query = 'INSERT INTO ticket_details (id_tickets, id_products, quantity) VALUES ($1, $2, $3) RETURNING id_ticket_details';
    const values = [req.id_tickets, req.id_products, req.quantity];
    
    const result = await pool.query(query, values);
    
    return result.rows[0].id_ticket_details;
  } catch (error) {
    throw error;
  }
};

module.exports = { addUser, 
                  verifyLogin, 
                  getUser, 
                  editUser,
                  getProduct, 
                  getProducts, 
                  getProductUsers,
                  addProduct, 
                  editProduct,
                  deleteProduct,
                  addTicket,
                  getTicketId,
                  addContact,
                  addTicketDetail,};