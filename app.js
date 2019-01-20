var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var flash = require('express-flash')

var taskOutput = require('./routes/task-output');
var login = require('./routes/login');
var routes = require('./routes/index');
var su = require('./routes/su');
var su_task = require('./routes/su-task');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules', 'katex', 'dist')))
app.use('/pickr-widget', express.static(path.join(__dirname, 'node_modules', 'pickr-widget', 'dist')))
app.use(session({
    secret: 'ccdefcb9-f6f3-438b-aa52-22e4c0ebf31f',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use('/', taskOutput)
app.use('/secret', su_task);
app.use('/su', su)
app.use('/', login)
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
