var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

var User;
try {
  User = mongoose.model('User');
} catch {
  User = mongoose.model('User', userSchema);
}

module.exports = User;