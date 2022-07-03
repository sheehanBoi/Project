require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var matchesRouter = require('./routes/matchesRoutes');
var actionsRouter = require('./routes/actionsRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/matches', matchesRouter);
app.use('/api/playeractions', actionsRouter);

module.exports = app;
