var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var { verifyHoutaiToken, verifyXcxToken } = require('./util/jwt/verify')

var houtaiRouter = require('./routes/houtai');
var xcxRouter = require('./routes/xcx');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 允许跨域请求
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/houtai', verifyHoutaiToken, houtaiRouter);
app.use('/api/xcx', verifyXcxToken, xcxRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  console.error(err.stack);

  res.locals.message = err.message;
  console.log(res.locals.message)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
