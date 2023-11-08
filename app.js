const express = require('express'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    helmet = require('helmet'),
    cors = require('cors');

const indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users'),
    messagesRouter = require('./routes/messages'),
    paymentRouter = require('./routes/payment'),
    config = require("./config");

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(config.files));

app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/message', messagesRouter);
app.use('/api/payment', paymentRouter);

require('./services/cron')

module.exports = app;
