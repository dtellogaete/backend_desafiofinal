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
    const { email, password, rol, lenguage } = req;

    // Encriptar la contraseña utilizando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)';
    const values = [email, hashedPassword, rol, lenguage];
    const res = await pool.query(query, values);
    return res;
  } catch (error) {
    throw error;
  }
};
  
/* Verificar Login */
  const verifyLogin = async (req) => {
    try {      
      const query = 'SELECT * FROM usuarios WHERE email = $1';
      const values = [req.email];
      const res = await pool.query(query, values);          
      //Valida que el usuario exista
      if (res.rows.length === 0) {        
        return false;
      }  
      const storedPassword = res.rows[0].password;  
      // Compara la contraseña proporcionada por el usuario con el hash almacenado en la base de datos
      const isMatch = await bcrypt.compare(req.password, storedPassword);     
      return isMatch;
    } catch (error) {
      throw error;
    }
  };

/* Get User */
const getUser = async (req) => {
  try {        
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const values = [req];
    const res = await pool.query(query, values);
    const user = res.rows[0];
    return user;
  } catch (error) {
    throw error;
  }
};



module.exports = { addUser, verifyLogin, getUser};