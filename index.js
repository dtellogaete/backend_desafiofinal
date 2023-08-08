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
        addTicketDetail,
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
app.post('/users', async (req, res) => {
  try {
      const payload = req.body;
      const result = await addUser(payload);

      res.status(201).json({ message: 'Usuario creado exitosamente', result }); 
  } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor', errorMessage: error.message });
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
       
    const token = authorization.split("Bearer ")[1];    

    jwt.verify(token, secretKey);
    console.log("token verificado")
    const decodificado = jwt.decode(token, secretKey);   
    const usuarios = await getUser(decodificado.email);
    res.status(200).json(usuarios);
    } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
});

/*Editar usuarios con PUT*/
app.put('/users', async (req, res) => {
  try {
    const payload = req.body;
    const user = await editUser(payload);
    res.status(200).json(user);
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

/* GET Productos de Usuarios */
app.get('/products/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const products = await getProductUsers(id);
        res.status(200).json(products);
        }
        catch (error) {
        res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
        }
}
);

/* POST product */
app.post('/products', async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    const product = await addProduct(payload);
    console.log(product)
    res.status(200).json(product);
    console.log(res.status)
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
});

/* UPDATE Editar Productos con PUT*/
app.put('/products', async (req, res) => {
  try {
    const payload = req.body;
    const product = await editProduct(payload);
    res.status(200).json(product);
    console.log(res.status)
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
});

/* DELETE product */
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await deleteProduct(id);
    res.status(200).json(product);
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
});


/* TICKETS */
/* POST Ticket */
app.post('/tickets', async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    const ticket = await addTicket(payload);
    console.log(ticket)
    res.status(200).json(ticket);
    console.log(res.status)
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
}
);

/* GET tickets por id_users */

app.get('/tickets/users/:id', async (req, res) => {
  try {
      const { id } = req.params;
        
      const tickets = await getTicketId(id);
      console.log(tickets);
      res.status(200).json(tickets);      
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
});






/* POST Ticket Detail */
app.post('/ticketdetail', async (req, res) => {
  try {
    const payload = req.body;
    const ticketdetail = await addTicketDetail(payload);
    console.log(ticketdetail)
    res.status(200).json(ticketdetail);
    console.log(res.status)
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
}
);


/*ADD CONTACT */
app.post('/contact', async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    const contact = await addContact(payload);
    console.log(contact)
    res.status(200).json(contact);
    console.log(res.status)
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
}
);

module.exports = app

