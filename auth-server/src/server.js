'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const v2Routes = require('./auth/routes.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v2', v2Routes);

// Catchalls
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Server Up on ${port}`));
  },
};
