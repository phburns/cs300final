var express = require('express');
var router = express.Router();
var { checkAuthenticated } = require('../middleware');
var Deck = require('../models/deck');

// POST route to add a flashcard to a specific deck
router.post('/:deckId/flashcards', checkAuthenticated, async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.deckId);
    if (!deck) {
      return res.status(404).send('Deck not found');
    }

    // Check if a flashcard with the same question and answer already exists
    const duplicateFlashcard = deck.flashcards.find(flashcard => 
      flashcard.question === req.body.question && flashcard.answer === req.body.answer
    );

    if (duplicateFlashcard) {
      // If a duplicate flashcard exists, don't add a new one and redirect back to the deck
      res.redirect(`/decks/${req.params.deckId}`);
    } else {
      // If no duplicate flashcard exists, add a new one
      deck.flashcards.push({ question: req.body.question, answer: req.body.answer });
      await deck.save();
      res.redirect(`/decks/${req.params.deckId}`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE route for a specific flashcard in a deck
router.delete('/:deckId/flashcards/:flashcardId', checkAuthenticated, async (req, res) => {
    try {
      const deck = await Deck.findById(req.params.deckId);
      if (!deck) {
        return res.status(404).send('Deck not found');
      }
  
      // Find the index of the flashcard in the deck's flashcards array
      const flashcardIndex = deck.flashcards.findIndex(flashcard => flashcard._id.toString() === req.params.flashcardId);  
      if (flashcardIndex === -1) {
        return res.status(404).send('Flashcard not found');
      }
  
      // Remove the flashcard from the deck's flashcards array
      deck.flashcards.splice(flashcardIndex, 1);
  
      // Save the deck
      await deck.save();
  
      res.redirect(`/decks/${req.params.deckId}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

// PUT route to update a specific flashcard in a deck
router.put('/:deckId/flashcards/:flashcardId', checkAuthenticated, async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.deckId);
    if (!deck) {
      return res.status(404).send('Deck not found');
    }
    const flashcard = deck.flashcards.id(req.params.flashcardId);
    if (!flashcard) {
      return res.status(404).send('Flashcard not found');
    }
    flashcard.question = req.body.question;
    flashcard.answer = req.body.answer;
    await deck.save();
    res.redirect(`/decks/${req.params.deckId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;