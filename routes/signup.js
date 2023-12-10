var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
var User = require('../models/user'); // Import the User model

router.get('/', function(req, res) {
  res.render('signup');
});

router.post('/', async function(req, res) {
  try {
    var hashedPassword = await bcrypt.hash(req.body.password, 10);

    var user = new User({ username: req.body.username, password: hashedPassword });
    await user.save();

    res.redirect('/login');
  } catch {
    res.redirect('/signup');
  }
});

module.exports = router;