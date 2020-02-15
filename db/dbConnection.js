const mysql = require('mysql2');
const config = require('config');

let connectionParameters = 'mysql.connection.'

const connection = mysql.createConnection({
    host: config.get(connectionParameters + 'host'),
    user: config.get(connectionParameters + 'user'),
    password: config.get(connectionParameters + 'password'),
    database: config.get(connectionParameters + 'database'),
    timezone: config.get(connectionParameters + 'timezone'),
    dateStrings: config.get(connectionParameters + 'dateStrings')
}).promise();

module.exports = connection;
