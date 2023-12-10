// deckbuilder.js
var express = require('express');
var router = express.Router();
var Deck = require('../models/deck'); // Assuming you have a Deck model

// Middleware to check if the user is authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Route to get all decks for the logged in user
router.get('/', checkAuthenticated, function(req, res, next) {
  Deck.find({ user: req.user._id }).exec()
    .then(decks => {
      res.render('deckbuilder', { title: 'Build a New Deck!', decks: decks });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Route for creating a flashcard deck
router.post('/', checkAuthenticated, function(req, res) {
  // Get the details for the new deck from the request body
  var deckName = req.body.name;
  var question = req.body.question;
  var answer = req.body.answer;

  // Create a new deck in the database
  var deck = new Deck({ 
    name: deckName, 
    user: req.user._id, 
    flashcards: [{ question: question, answer: answer }] 
  });

  deck.save()
    .then(() => {
      res.redirect('/deckbuilder');
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Route for adding a flashcard to a deck
router.post('/:deckId/flashcards', checkAuthenticated, function(req, res) {
  // Get the details for the new flashcard from the request body
  var question = req.body.question;
  var answer = req.body.answer;
  // Add the new flashcard to the specified deck in the database
  Deck.findById(req.params.deckId, function(err, deck) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    deck.flashcards.push({ question: question, answer: answer });
    deck.save(function(err) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      // Redirect the user back to the flashcard deck page
      res.redirect('/decks');
    });
  });
});

module.exports = router;