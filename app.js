const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');

// load config
dotenv.config({ path: './config/config.env' });

// connect with database
connectDB();

// initialize the app
const app = express();

// morgan logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// set app engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// set app routes
app.use('/', require('./routes/index'));

// set server port
const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
