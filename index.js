import bodyParser from 'body-parser';
import express from 'express';
import db from './connection.js';
import { response } from './response.js';


// const db = require('connection.js')
// const response = require('./response')

const app  = express();
const PORT = 2000

// routes / URL / endpoint utama kita method GET
app.use(bodyParser.json());

app.get('/', (req, res) => {
    db.query("SELECT * FROM mahasiswa", (error, result) => {
        //hasil data dari mysql
        response(200, result, "get all data from mahasiswa", res)
    })
})

// app.get('/find',(req, res) => {
//     console.log('find nim: ', SELECT)

//     const sql = `SELECT full_name FROM mahasiswa WHERE nim = ${req.query.min}`
//     db.query(sql, (error, result) => {
//         response(200, result, "find mahasiswa name", res)
//     })
    
// })

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