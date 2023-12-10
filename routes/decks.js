var express = require('express');
var router = express.Router();
var { checkAuthenticated } = require('../middleware');
var Deck = require('../models/deck');

// Route to get all decks for the logged-in user
router.get('/', checkAuthenticated, function(req, res, next) {
  Deck.find({ user: req.user._id })
    .then(decks => {
      res.render('decks', { decks: decks }); // Pass the decks array to the view
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
});

// Route to get a specific deck
router.get('/:id', checkAuthenticated, async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).send('Deck not found');
    }
    res.render('deckflashcards', { deck: deck });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE route for a specific deck
router.delete('/:id', async (req, res) => {
  console.log('DELETE /decks/:id');
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).send('Deck not found');
    }
    await Deck.deleteOne({ _id: req.params.id });
    res.redirect('/decks');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;