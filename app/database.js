const conf = require('./conf');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.database.host,
  user: conf.database.username,
  password: conf.database.password,
  database: conf.database.name,
  port: conf.database.port,
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
