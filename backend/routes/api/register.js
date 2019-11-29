const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('./../../models/User');
const bcrypt = require('bcrypt');


router.post('/', (req, res) => {
    const user = req.body;
      //const {body: {user}} = req;

       console.log(`user from register POST in register ${JSON.stringify(user)}`)
        User.find({email: user.email})
       .exec()
       .then(list => {
         if (list.length >= 1) {
           return res.status(409).json({
             message: 'Email already registered'
           })
         }
         else {
          bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            }
            else
            { 
             const user = new User({
                           _id: new mongoose.Types.ObjectId(),
                           firstName: user.firstName,
                           lastName: user.lastName,
                           email: user.email,
                           username: user.username,
                           password: hash
                             })
                    user.save()
                        .then(result => {
                                    res.status(201).json({
                                      message: 'User Saved to DB',
                                      person: result
                                    })
                                  })
                                  .catch(err => {
                                    res.status(500).json({
                                      message: 'User Already Registered',
                                         error: err
                                    })
                                  }) 
                      
                      };
                    });
         }
       });
});


router.get('/', (req, res, next) => {
    User.find()
        .then(result => {
         console.log(result);
           res.status(200).json({
               message: 'user List.',
               count: result.length,
                contact: result.map(doc => {
           return{
         firstName: doc.firstName,
           lastName: doc.lastName,
             email: doc.email,
             username: doc.username,
               _id: doc._id,
                  request: {
                      type: 'GET',
                      url: 'http://localhost:4000/register/' + doc._id
                  }
            }
          })
           })
        })
        .catch(err => {
         res.status(500).json({
               message: 'List failed to load.',
               error: err
         })
       })
});

   module.exports = router;