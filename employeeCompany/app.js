const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

// routes
const employeeRoute = require("./routes/employeeRoute");
const companyRoute = require("./routes/companyRoute");

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/db5').then(() => {
  console.log("DB is connected.");
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use("/employee", employeeRoute);
app.use("/company", companyRoute);



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
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err);

  res.status(err.status || 500).send(err.message);

  
});

module.exports = app;



// لیست کمپانی
// اضافه کردن کارمند جدید به یک کمپانی
// لیست کارمندان یک کمپانی