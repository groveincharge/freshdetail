const express = require('express');
const router = express.Router();
const passport = require('passport');
const Cookies = require('cookies');
const { check, validationResult } = require('express-validator');

// create the login get and post routes
router.get('/', (req, res) => {
      const getMessages = req.flash('logout_msg')
       console.log(`req.flash ${getMessages}`)
       console.log('Inside GET /login callback')
       console.log(`req.session.cookie ${JSON.stringify(req.session.cookie)}\n`);
       console.log(`req.session ${JSON.stringify(req.session)}\n`);
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
      console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
      console.log(`req.session.user: ${JSON.stringify(req.session.user)}\n`);
  console.log(`req.sessionID from ./login GET route ${req.sessionID}`)
  res.end(`You got the GET login api page!\n`)
});

router.post('/', async (req, res, next) => {

  // Optionally define keys to sign cookie values
  // to prevent client tampering
  let keys = [process.env.SESSION_KEY]

    // Create a cookies object
  let cookies = new Cookies(req, res, { keys: keys })
 
  // Get a cookie
  let lastVisit = cookies.get('LastVisit', { signed: true })
 
  // Set the cookie to a value
  cookies.set('LastVisit', new Date().toISOString(), { signed: true })

  await check('email', 'Invalid Credentials').isEmail().run(req)
  await check('password', 'Invalid Credentials').isLength({ min: 6 })
             .withMessage('password must be at least six chars long')
             .matches(/\d/)
            .withMessage('password must contain at least one number')
            .run(req);
            
        req.session.user = {};
        req.session.isLoaded = false;
        req.session.lastVisit = null;
        req.session.errors = null;

   // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      req.session.errors = errors;
      console.log(`req.flash from POST login: ${req.flash('error_msg')}`)
      errors.errors.map(error => {
        console.log(`Login error from POST: ${JSON.stringify(error.msg)}`)
      })
    return res.status(422).json({ errors: errors.array() });
  }else{

  //const { body: { user } } = req;
  const user = req.body;
       req.session.user = {};
       req.session.isLoaded = false;
       req.session.lastVisit = null;

   console.log('Inside POST /login callback\n');
   console.log(`POST user ${JSON.stringify(user)}\n`);
   req.session.user = user;
  console.log(`req.session ${JSON.stringify(req.session)}\n`);
  console.log(`req.sessionID ${req.sessionID}\n`);

  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport.authenticate() callback\n');
    console.log(`user inside passport.authenticate ${JSON.stringify(user)}\n`)
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
    console.log(`req.user: ${JSON.stringify(req.user)}\n`);

    req.login(user, (err) => {
      req.session.user = user;
      req.session.isLoaded = true;
      req.session.lastVisit = lastVisit;
      console.log('Inside req.login() callback\n');
       console.log(`req.session.cookie ${JSON.stringify(req.session.cookie)}\n`);
      console.log(`req.session ${JSON.stringify(req.session)}\n`);
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
      console.log(`user inside req.login ${JSON.stringify(user)}\n`);
      console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
      console.log(`req.user: ${JSON.stringify(req.user)}\n`);
     // return res.send('You were authenticated & logged in!\n');

      if (!lastVisit && req.isAuthenticated()) {
   // res.setHeader('Content-Type', 'text/plain')
    //console.log(`flash: ${req.flash('login_msg')[0]}`);
   // res.end('Welcome, first time visitor!')
   next()
  } else
     if (lastVisit && req.isAuthenticated()) {
   // res.setHeader('Content-Type', 'text/plain')
   //console.log(`flash: ${req.flash('login_msg')[0]}`);
   // res.end('Welcome back! Nothing much changed since your last visit at ' + lastVisit + '.')
   next()
  } 
 else {
      //return res.redirect('/');
     //console.log(`flash: ${req.flash('error_msg')[0]}`);
     next
  };
    
   })

  })(req, res, next);
   
   }

   });

  module.exports = router;