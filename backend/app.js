// var createError = require('http-errors');
var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var eventRouter = require("./routes/event")
var userRouter = require("./routes/user")
var loginRouter = require('./routes/login')
var projectRouter = require("./routes/project")
var userProjectsRouter = require('./routes/user_project')

var holidaysRouter = require('./routes/holidays')

var app = express();
const cors = require('cors');


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())



app.use('/login',loginRouter)
app.use('/event',eventRouter)
app.use('/user',userRouter)
app.use("/project", projectRouter)
app.use("/userProject",userProjectsRouter)

app.use("/holidays", holidaysRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


module.exports = app;
