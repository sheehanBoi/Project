require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var matchesRouter = require('./routes/matchesRoutes');
var actionsRouter = require('./routes/actionsRoutes');

var app = express();


// 16:12
// 1 - 16:35 -> 23 min 
// 16:41 
// 2- 17:04 -> 23 min
// 19:25
// 3- 20:00 -> 35 min
// 22:20 
// 4- 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/matches', matchesRouter);
app.use('/api/playeractions', actionsRouter);

module.exports = app;
