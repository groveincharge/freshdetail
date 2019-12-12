const express = require('express');
const router = express.Router();
const {authmiddleware} = require('./../auth');

router.get('/', (req, res, next) => {
    console.log('Inside GET req.logout() callback\n');
    console.log(`req.session ${JSON.stringify(req.session)}\n`)
	console.log(`req.isAuthenticated from GET /api/logout router ${req.isAuthenticated()}\n`);
    console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
    console.log(`req.user: ${JSON.stringify(req.user)}\n`);
    
    if (req.isAuthenticated()){
    req.logout();
     console.log(`flash: ${req.flash('logout_msg')[0]}`);
    return res.redirect('/');
    next()
     }
      console.log(`flash: ${req.flash('error_msg')[0]}`);
     return res.redirect('/')
     next()
   });

module.exports = router;