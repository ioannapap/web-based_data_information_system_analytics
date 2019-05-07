const express = require('express');
const conf = require('./conf');
const routes = require('./routes');
const app = express();

app.set('view engine', 'ejs');
app.use('/api', routes);
app.use(express.static('static'));

app.listen(conf.webserver.port, function() {
  console.log(`API listening on http://localhost:${conf.webserver.port}/api`);
  console.log(`Frontend is visible on http://localhost:${conf.webserver.port}/`);
});

module.exports = app;
