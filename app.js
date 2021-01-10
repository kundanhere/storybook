const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');

// load config
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport);

// connect with database
connectDB();

// initialize the app
const app = express();

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// morgan logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// handlebar helpers
const { formatDate, stripTags, truncate } = require('./helpers/hbs');

// handlebars
app.engine(
  '.hbs',
  exphbs({
    helpers: {
      formatDate,
      stripTags,
      truncate,
    },
    defaultLayout: 'main',
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// set app routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

// set server port
const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
