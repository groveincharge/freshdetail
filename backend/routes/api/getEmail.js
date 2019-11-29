const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../../models/User');
//const Users = mongoose.model('Users');

// create the getUser route
router.get('/:email', (req, res) => {
    console.log(req.params.email);
   User.find({email: req.params.email})
  .exec()
  .then(user => {
    if(user.length >= 1){
       return res.status(200).send({
                      message: 'User found',
                      _id: user[0]._id,
                      email: user[0].email,
                      username: user[0].username,
                      password: user[0].password
       });
    }else{
      res.status(409)
        .json({
          message: 'User Not Found',
          email: req.params.email
        })
    };
          
  })
  .catch(err => {
    res.status(500).json({
      message: 'User Not Found',
      error: err
    })
  })
});

module.exports = router;