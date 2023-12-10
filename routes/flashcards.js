var express = require('express');
var router = express.Router();
var Deck = require('../models/deck');
var Flashcard = require('../models/flashcard');

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    next(); // If logged in, proceed to the next middleware/route handler
  } else {
    res.redirect('/login'); // If not logged in, redirect to the login page
  }
}

router.get('/flashcards', isLoggedIn, function(req, res, next) {
  Flashcard.find({ user: req.session.userId })
    .then(flashcards => {
      res.json(flashcards); // Send the flashcards as JSON
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
});

module.exports = router;