/* Middelwares */

/*Express*/
const express = require('express');
/*Cors*/
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());

module.exports = app;
