//npm modules
const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/User');
const flash = require('connect-flash');
require('dotenv').config();

// create the server
const app = express();

//express middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(flash());

   //passport and session middleware
   app.use(session({
    // Set the session ID
    genid: (req) => {
      console.log(`Inside the server.js session middleware ${req.sessionID}`);
      return uuid() //use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: process.env.SESSION_KEY,
        cookie: {maxAge: 600000, path: '/', httpOnly: true, secure: false},
    resave: false,
    saveUninitialized: false
    }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    res.locals.login_msg = req.flash('login_msg','You Have Successful Logged In!');
    res.locals.logout_msg = req.flash('logout_msg','You Have Successful Logged Out!');
      res.locals.error_msg = req.flash('error_msg','Invalid Credentials');
      res.locals.isAuthenticated = req.isAuthenticated();
      //res.locals.logout = req.logout();
      res.locals.user = req.user;
      next() 
  });

//models & routes
require('./models/User');
require('./models/Contact');
require('./models/Product');
require('./models/Order');
require('./models/mongoConnect');
app.use(require('./routes'));

app.use(express.static('/public'));

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    axios.get(`http://localhost:4000/api/getEmail/${email}`)
    .then(result => {
      const user = result.data;
      console.log(`user.password from inside new strategy ${user.password}`)
      console.log(`password from inside new strategy ${password}`)
      console.log(`user from inside new strategy ${JSON.stringify(user)}`);
      if (!(user.email === email)) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      };
      
// Load hash from your password DB.
bcrypt.compare(password, user.password, function(err, res) {
  if (err) {return done(null, false, { message: 'Invalid credentials.\n' })};
    if (res) {
       return done(null, user)
     } 
     else
        {
       return done(null, false, { message: 'Invalid credentials.\n' });
       };
  });
    })
    .catch(error => done(error));
 }
));


// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log(`user from inside serialize ${JSON.stringify(user)}`);
  console.log(`user._id from inside serialize ${JSON.stringify(user._id)}`);
     done(null, user._id);
   });

   
passport.deserializeUser(function(_id, done) {
  User.findById(_id, function(err, user) {
    console.log(`user from inside deserialize ${JSON.stringify(user)}`);
    done(err, user);
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`Listening on PORT ${port}`)})