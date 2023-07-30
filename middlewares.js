/* Middelwares */

/*Express*/
const express = require('express');
/*Cors*/
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3002',
}));

app.use(express.json());

module.exports = app;
