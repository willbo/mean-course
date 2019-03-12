const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();


// signing up a new user
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
});


// logging in as a user
router.post('/login', (req, res, next) => {
  let user;
  User.findOne({ email: req.body.email })
    .then(record => {
      if(!record) {
        return res.status(401).json({
          message: 'No user found'
        });
      }
      user = record;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Incorrect password'
        });
      }
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        'secret_this_should_be_longer',
        {expiresIn: '1h'}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: user._id
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: 'Auth failed'
      });
    });
});

module.exports = router;
