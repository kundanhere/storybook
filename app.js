const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// load config
dotenv.config({ path: './config/config.env' });

// initialize app
const app = express();

// set static folder
app.use(path.join(__dirname, 'public'));

// set server port
const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
