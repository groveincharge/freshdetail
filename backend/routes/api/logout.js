const express = require('express');
const router = express.Router();
const {authmiddleware} = require('./../auth');

router.get('/', (req, res, next) => {
    console.log('Inside GET req.logout() callback');
    console.log(`req.session ${JSON.stringify(req.session)}`)
	console.log(`req.isAuthenticated from GET /api/logout router ${req.isAuthenticated()}`);
    console.log(`req.session.id: ${JSON.stringify(req.session.id)}`);
    console.log(`req.user: ${JSON.stringify(req.user)}`);
    
    if (req.isAuthenticated()){
    req.logout();
    console.log(`flash: ${req.flash('logout_msg')[0]}`);
    return res.redirect('/');
     }
     console.log(`flash: ${req.flash('error_msg')[0]}`);
     return res.redirect('/')
   });

module.exports = router;