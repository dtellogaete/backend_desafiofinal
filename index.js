/* Express */
const express = require('express');

/* Importar Middleware */
const middlewares = require('./middlewares'); 

/* JWT */
const jwt = require('jsonwebtoken');

/* Dotenv */
require('dotenv').config();

/* SecretKey */
const secretKey = process.env.TOKEN_SECRET;

/*Crypto */
const crypto = require('crypto');

/* Import consultas DB*/
const { addUser, 
        verifyLogin,  
        getUser,
        getProduct,
        getProducts,
        Auth,
      } = require('./db.js');
const { error } = require('console');
const e = require('express');

const app = express();

/* Utilizar middelwares */
app.use(middlewares);



/* Levantar el servidor con puerto 3002 */
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running in port: ${PORT}`);
});

/* POST Usuarios */
app.post('/usuarios', async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload.email);
    const user = await addUser(payload);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

/* GET Login */
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;  
    
    const isValidCredentials = await verifyLogin(req.body);
    console.log(isValidCredentials);
    if (isValidCredentials) {
      // Generar el token utilizando jwt.sign() y la clave secreta    
      console.log(email);         
      const token = jwt.sign({ email }, secretKey, { expiresIn: 600 });            
      res.status(200).json({ token });      
    } else {
      res.status(401).json({ error: 'Unauthorized', message: 'Credenciales inválidas' });
     
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
});

/* GET Usuarios con JWT */
app.get('/users', async (req, res) => {
  try {       
    const authorization = req.header("Authorization");  
    console.log("authorization", authorization);    
    
    const token = authorization.split("Bearer ")[1];    
    console.log("token", token);
    jwt.verify(token, secretKey);
    const decodificado = jwt.decode(token, secretKey);   
    const usuarios = await getUser(decodificado.email);
    res.status(200).json(usuarios);
    } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
});

/* Backend Products */
/* GET Product id */
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProduct(id);
        res.status(200).json(product);
        }
        catch (error) {
        res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
        }
});

/* GET Producs */
app.get('/products', async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
        }
        catch (error) {
        res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
        }
    }
);
