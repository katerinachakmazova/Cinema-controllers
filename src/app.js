const fs = require('fs');
const path = require('path');
// ============================
const express = require('express');
const cors = require('cors')
// ==============================
const router = require('./routers')
const {errorHandlers: {errorHandler, validationErrorHandler}, time: {getTime, showTime}} = require('./middleware')

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static(path.resolve( 'public')));
app.use(validationErrorHandler, errorHandler)
app.use(router);
app.use('/time', getTime, showTime);
module.exports = app;

