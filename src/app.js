const express = require('express');
const taskRoutes = require('./routes/routes');
const errorHandler = require('./middlewares/errors');

const app = express();

app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

module.exports = app;
