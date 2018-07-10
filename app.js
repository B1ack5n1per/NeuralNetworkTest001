var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const MongoClient = require('mongodb').MongoClient;
var app = express();
const db = require('./config/db');
const port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  require('./routes/netRoute')(app, database);
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});

app.use('/users', usersRouter);

module.exports = app;
