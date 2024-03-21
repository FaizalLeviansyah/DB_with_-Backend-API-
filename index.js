import bodyParser from 'body-parser';
import express from 'express';
import db from './connection.js';
import { response } from './response.js';
// const db = require('connection.js')
// const response = require('./response')*+
const app  = express();
const PORT = 2000

// routes / URL / endpoint utama kita method GET
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const sql_mahasiswa = "SELECT * FROM mahasiswa"

    db.query(sql_mahasiswa, (error, result) => {
        //hasil data dari mysql
        response(200, result, "get all data from mahasiswa", res)
    })
})

app.get('/find',(req, res) => {
    const sql_mahasiswa = `SELECT full_name FROM mahasiswa WHERE nim = ${req.query.nim}`
    console.log('find nim: ', req.query.nim)
    
    db.query(sql_mahasiswa, (error, result) => {
        response(200, result, "find mahasiswa name", res)
    })
    
})

app.post('/login', (req, res) => {
    console.log({requestFromOutside:req.body})
    res.send('login berhasil');
})

app.put('/username' , (req, res) => {
    console.log({updateData: req.body}) 
    res.send('Update Worked!!!')
})


app.listen(PORT, () => {
    console.log(`server running on port : ${PORT}`);
})