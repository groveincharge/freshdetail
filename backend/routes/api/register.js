const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const User = require('./../../models/User');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
   const user = req.body;
   req.session.errors = null;

  await check('email', 'Invalid Credentials').isEmail().run(req)
  await check('password', 'Invalid Credentials').isLength({ min: 6 })
             .withMessage('password must be at least six chars long')
             .matches(/\d/)
            .withMessage('password must contain at least one number')
            .equals(req.body.confirmPassword)
            .withMessage('passwordConfirmation field must have the same value as the password field')
            .run(req);

  const errors = validationResult(req);
        req.session.user = {};
        req.session.isLoaded = false;
        req.session.lastVisit = null;

  if (!errors.isEmpty()) {
      req.session.errors = errors;
       console.log(`req.flash from POST: ${req.flash('error_msg')}`)
      errors.errors.map(error => {
        console.log(`Register error from POST: ${JSON.stringify(error.msg)}`)
      })
    return res.status(422).json({ errors: errors.array() });
    }else{
      req.session.user = user;
       req.session.isLoaded = true;
       req.session.lastVisit = null;
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
             const newUser = new User({
                           _id: new mongoose.Types.ObjectId(),
                           firstName: user.firstName,
                           lastName: user.lastName,
                           email: user.email,
                           username: user.username,
                           password: hash
                             })
                    newUser.save()
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
    }
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