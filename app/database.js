var conf = require('./conf')
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: conf.database.host,
    user: conf.database.username,
    password: conf.database.password,
    database: conf.database.name,
    port: conf.database.port
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
