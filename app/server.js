var express = require('express');
var conf = require('./conf')
var routes = require('./routes');
var app = express();

app.set('view engine', 'ejs');
app.use('/api', routes);

app.listen(conf.webserver.port, function () {
    console.log(`API listening on http://localhost:${conf.webserver.port}/api`);
});
