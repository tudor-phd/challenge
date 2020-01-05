const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');

const app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongodb

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);
// use routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`sever running on port ${port}`));