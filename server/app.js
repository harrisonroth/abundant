var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const cron = require("node-cron");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileRouter = require('./routes/files');
var bottlesRouter = require('./routes/bottles');
var orderRouter = require('./routes/order');
var productsRouter = require('./routes/products');
var measurementRouter = require('./routes/measurement');

var updateMeasurementsDaily = require('./controllers/CronController');

var db = require('./controllers/db');

var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', usersRouter);
app.use('/files', fileRouter);
app.use('/bottles', bottlesRouter);
app.use('/order', orderRouter);
app.use('/measurement', measurementRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(
    {"Error": "An Error Occured"}
  );
});

//average measurements from previous day and backlog older data
cron.schedule("30 23 * * *", updateMeasurementsDaily);

app.listen(4200);

module.exports = app;
