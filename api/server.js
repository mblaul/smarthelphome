var express = require('express');
var bodyparser = require('body-parser');
var session = require('express-session');
var mongoose =require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var config = require('./config/database');
var app = express();


mongoose.connect(config.database);
//var database = mongoose.connection;
//database.on('error', console.error.bind(console, "connection error"));

app.use(passport.initialize());

//Set static directory to /public
app.use(express.static(__dirname + '/public'));

app.use('/static', express.static(__dirname + '/public'));

//Use pug files for templates/views
app.set('view engine', 'pug');

app.use(bodyparser.json());       // to support JSON-encoded bodies
app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(require('./routes'));

//Error handling
app.use((req, res, next) => {
  var err = new Error('File not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(`there was an error: ${err.message}\n code: ${err.status}`)
});

app.listen(5000, () => {
  console.log('Express app listening on port 5000')
})
