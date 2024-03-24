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

// GET all data from mahasiswa
app.get('/', (req, res) => {
    const sql_mahasiswa = "SELECT nim, full_name, class, address FROM mahasiswa";

    db.query(sql_mahasiswa, (error, result) => {
        response(200, result, "get all data from mahasiswa", res);
    });
});

// GET full_name by nim
app.get('/findnamebynim', (req, res) => {
    const sql_mahasiswa = `SELECT full_name FROM mahasiswa WHERE nim = ${req.query.nim}`;
    console.log('find Nim:', req.query.nim);

    db.query(sql_mahasiswa, (error, result) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            response(500, null, "Internal Server Error", res);
        } else {
            if (result.length > 0) {
                response(200, result[0].full_name, "Find mahasiswa full name by NIM", res);
            } else {
                response(404, 'ERROR! NIM not exist / not complete', "Nim not found", res);
            }
        }
    });
});

// GET nim by full_name
app.get('/findnimbyname', (req, res) => {
    const fullName = req.query.full_name;
    console.log('find Full Name:', fullName);

    const sql_mahasiswa = `SELECT nim FROM mahasiswa WHERE full_name = ?`;
    db.query(sql_mahasiswa, [fullName], (error, result) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            response(500, null, "Internal Server Error", res);
        } else {
            if (result.length > 0) {
                response(200, result[0].nim, "find mahasiswa nim by Name", res);
            } else {
                response(404, 'ERROR! Name not exist / not complete', "Name not found", res);
            }
        }
    });
});

// GET address by full_name
app.get('/findaddressbyname', (req, res) => {
    const fullName = req.query.full_name;
    console.log('Find Full Name:', fullName);

    const sql_mahasiswa = `SELECT address FROM mahasiswa WHERE full_name = ?`;
    db.query(sql_mahasiswa, [fullName], (error, result) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            response(500, null, "Internal Server Error", res);
        } else {
            if (result.length > 0) {
                response(200, result[0].address,"Find mahasiswa address by name", res);
            } else {
                response( 404, "ERROR! Name not exist / not complete from those name!", "Name not found", res);
                
            }
        }
    });
});

// GET full_name by address
app.get('/findnamebyaddress', (req, res) => {
    const address = req.query.address;
    console.log('Find Address: ', address);

    const sql_mahasiswa = `SELECT full_name FROM mahasiswa WHERE address = ?`;
    db.query(sql_mahasiswa, [address], (error, result) => {
        if (error) {
            console.log('Error executing SQL query:', error);
            response(500, null, "Internal Server Error", res);
        } else {
            if (result.length > 0) {
                response(200, result[0].full_name, "Find mahasiswa name by address", res);
            } else {
                response(404, "ERROR! Full Name not exist from those address!", "Address not found", res);
            }
        }
    })
})

// POST method for adding new data
app.post('/mahasiswa', (req, res) => {
    const { nim, full_name, address } = req.body;
    const sql_insert = `INSERT INTO mahasiswa (nim, full_name, class, address) VALUES (?, ?, ?, ?)`;
    db.query(sql_insert, [nim, full_name, address], (error, result) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            response(500, null, "Internal Server Error", res);
        } else {
            response(200, { nim, full_name, address }, "New data added to mahasiswa", res);
        }
    });
});

// PUT method for updating data
app.put('/mahasiswa/:nim', (req, res) => {
    const { nim } = req.params;
    const { full_name, address } = req.body;
    const sql_update = `UPDATE mahasiswa SET full_name = ?, class = ?, address = ? WHERE nim = ?`;
    db.query(sql_update, [full_name, address, nim], (error, result) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            response(500, null, "Internal Server Error", res);
        } else {
            response(200, { nim, full_name, address }, "Data updated in mahasiswa", res);
        }
    });
});

// DELETE method for deleting data
app.delete('/mahasiswa/:nim', (req, res) => {
    const { nim } = req.params;
    const sql_delete = `DELETE FROM mahasiswa WHERE nim = ?`;
    db.query(sql_delete, [nim], (error, result) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            response(500, null, "Internal Server Error", res);
        } else {
            response(200, { nim }, "Data deleted from mahasiswa", res);
        }
    });
});

app.listen(PORT, () => {
    console.log(`server running on port : ${PORT}`);
});


// app.get('/', (req, res) => {
//     const sql_mahasiswa = "SELECT * FROM mahasiswa"

//     db.query(sql_mahasiswa, (error, result) => {
//         //hasil data dari mysql
//         response(200, result, "get all data from mahasiswa", res)
//     })
// })

// app.get('/findnamebynim',(req, res) => {
//     const sql_mahasiswa = `SELECT full_name FROM mahasiswa WHERE nim = ${req.query.nim}`
//     console.log('find Nim: ', req.query.nim)

//     db.query(sql_mahasiswa, (error, result) => {
//         response(200, result, "find mahasiswa name", res)
//     })
// })

// app.get('/findnimbyname', (req, res) => {
//     const fullName = req.query.full_name;
//     console.log('find Full Name:', fullName);

//     const sql_mahasiswa = `SELECT nim FROM mahasiswa WHERE full_name = ?`;
//     db.query(sql_mahasiswa, [fullName], (error, result) => {
//         if (error) {
//             console.error('Error executing SQL query:', error);
//             response(500, null, "Internal Server Error", res);
//         } else {
//             response(200, result, "find mahasiswa nim", res);
//         }
//     });
// });

// // app.get('/findnimbyname',(req, res) => {
// //     const sql_mahasiswa = `SELECT nim FROM mahasiswa WHERE full_name = ${req.query.full_name}`
// //     console.log('find Full Name: ', req.query.full_name)

// //     db.query(sql_mahasiswa, (error, result) => {
// //         response(200, result, "find mahasiswa nim", res)
// //     })
// // })

// // app.post('/namechange', (req, res) => {
// //     const user = req.body;
// //     console.log(user)

// //     users.push({ ...user, id: uuidv4() });

// //     res.send($(user.full_name) has been added to the Database);
// // })

// app.post('/login', (req, res) => {
//     console.log({requestFromOutside:req.body})
//     res.send('login berhasil');
// })

// app.put('/username' , (req, res) => {
//     console.log({updateData: req.body}) 
//     res.send('Update Worked!!!')
// })


// app.listen(PORT, () => {
//     console.log(`server running on port : ${PORT}`);
// })