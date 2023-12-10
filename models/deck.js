
var mongoose = require('mongoose');

var flashcardSchema = new mongoose.Schema({
  question: String,
  answer: String
});

var deckSchema = new mongoose.Schema({
  name: String,
  flashcards: [flashcardSchema],
  user: mongoose.Schema.Types.ObjectId // To associate each deck with a user
});

var Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;