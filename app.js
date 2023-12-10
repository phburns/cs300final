var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var mongoose = require('mongoose');
var methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var { checkAuthenticated } = require('./middleware');
var deckbuilderRouter = require('./routes/deckbuilder');
var deckRouter = require('./routes/decks');
var decksRouter = require('./routes/decks');
var logoutRouter = require('./routes/logout');
var deckflashcardsRouter = require('./routes/deckflashcards');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Load environment variables
require('dotenv').config();

// set up mongoose connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Error: ' + err.message));

// Set up session middleware
app.use(session({
  store: new FileStore(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var User = require('./models/user'); // Import the User model

passport.use(new LocalStrategy(
  async function(username, password, done) {
    // Retrieve the user from the database
    var user = await User.findOne({ username: username });

    // If the user is not found or the password is wrong, return an error
    if (!user || !await bcrypt.compare(password, user.password)) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    // If the username and password are correct, return the user
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    var user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/deckbuilder', deckbuilderRouter);
app.use('/decks', deckRouter);
app.use('/logout', logoutRouter);
app.use('/decks', deckflashcardsRouter);


app.get('/', function(req, res) {
  res.render('index');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
