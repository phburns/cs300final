var mongoose = require('mongoose');

var FlashcardSchema = new mongoose.Schema({
  front: String,
  back: String,
  userId: mongoose.Schema.Types.ObjectId
});

var Flashcard = mongoose.model('Flashcard', FlashcardSchema);

module.exports = Flashcard;