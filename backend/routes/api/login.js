const express = require('express');
const router = express.Router();
const passport = require('passport');

// create the login get and post routes
router.get('/', (req, res) => {
  console.log('Inside GET /login callback')
  console.log(`req.sessionID from ./login GET route ${req.sessionID}`)
  res.end(`You got the login api page!\n`)
});

router.post('/', (req, res, next) => {
  //const { body: { user } } = req;
  const user = req.body;

   console.log('Inside POST /login callback');
   console.log(`POST user ${JSON.stringify(user)}`);
   req.session.user = user;
  console.log(`req.session ${JSON.stringify(req.session)}`);
  console.log('req.sessionID '+req.sessionID);

  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport.authenticate() callback');
    console.log(`user inside passport.authenticate ${JSON.stringify(user)}`)
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
    console.log(`req.user: ${JSON.stringify(req.user)}`);

    req.login(user, (err) => {
      console.log('Inside req.login() callback');
       console.log(`req.session.cookie ${JSON.stringify(req.session.cookie)}`);
      console.log(`req.session ${JSON.stringify(req.session)}`);
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
      console.log(`user inside req.login ${JSON.stringify(user)}`);
      console.log(`req.session.id: ${JSON.stringify(req.session.id)}`);
      console.log(`req.user: ${JSON.stringify(req.user)}`);
     // return res.send('You were authenticated & logged in!\n');
      if (req.isAuthenticated()) {
         console.log(`flash: ${req.flash('login_msg')[0]}`);
          res.redirect('/api/contact');
          };
       if (!req.isAuthenticated()) {
         console.log(`flash: ${req.flash('error_msg')[0]}`);
         return res.redirect('/');
      };    
   })

  })(req, res, next);

   });

  module.exports = router;