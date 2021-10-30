const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bs',
});

database.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Mysql connected...');
});

module.exports = database;
