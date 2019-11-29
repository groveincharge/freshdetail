//npm packages
const express = require('express');
const router = express.Router();
const {authmiddleware} = require('./auth');

// create the login get and post routes
router.get('/', (req, res) => {
  console.log('Inside GET /home callback');
  console.log(`req.session from GET / home router ${JSON.stringify(req.session)}`);
  console.log(`req.isAuthenticated from GET / home router ${req.isAuthenticated()}`);
   console.log(`req.user from GET / home router ${req.user}`);
   //console.log(`req.flash from GET /api/home route ${req.flash('success_msg')}`);
  res.end(`You got the /home page!\n`);
});

module.exports = router;