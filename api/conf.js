const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Guillon11',
  database: 'intwetion'
});

module.exports = connection;