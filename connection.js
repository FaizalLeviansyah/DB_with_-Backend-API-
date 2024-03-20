// connection.js
import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

export default db; // Change to named export



// const mysql = require('mysql')

// const db = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : '',
//     database : 'test'
// })

// module.exports = db