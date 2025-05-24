const express = require("express");
const ejs = require("ejs");
const path = require("path");
const {v4 : uuidv4} = require("uuid");
const mysql = require("mysql2");
const methodOverride = require("method-override");
const app = express();
const server = require("http").createServer(app);

require("dotenv").config();

app.set("view engine", "ejs");
app.set("/views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const port = process.env.PORT;
server.listen(port, ()=>{
    console.log(`server is running on http://localhost:${3000}`);
});

connection.connect((err)=>{
    if(err) {
        console.log("failed to connect database!" , err);
    } else {
        console.log("successfully connected to database✅")
    }
});

app.get('/', (req, res)=>{
    let selectQuery = `SELECT * FROM codes`
    try {
        connection.query(selectQuery, (err, result)=>{
            if(err) throw err;
            let response = result
                res.render('home', {response});
        })
    }
    catch(err) {
        console.log(err);
    }
});

app.get('/addCode', (req, res)=>{
    res.render('addCode');
});

app.post('/', (req, res)=>{
    let {title, codeBlock} = req.body;
    let id = uuidv4();
    let insertQuery = `INSERT INTO codes (id, title, code) VALUES (?, ?, ?)`
    try {
        connection.query(insertQuery, [id, title, codeBlock], (err, result)=>{
            if(err) throw err;
            if(result.length === 0) {
                res.send('invalid insertion request!!');
            } else {
                console.log(result);
                res.redirect('/')
            }
        })
    } catch(err) {
        console.log(err);
    }
});

app.delete('/delete/:id', (req, res)=>{
    let {id} = req.params;
    let dltQuery = `DELETE FROM codes WHERE id = '${id}'`;
    try {
        connection.query(dltQuery, (err, result)=>{
            if(err) throw err;
            console.log(result);
            res.redirect('/');
        })
    } catch(err) {
        console.log(err);
    }
});

app.get('/editCode/:id', (req, res)=>{
    let {id} = req.params;
    let slctQuery = `SELECT * FROM codes WHERE id = '${id}'`;
    try {
        connection.query(slctQuery, (err, result)=>{
            if(err) throw err;
            let codeInfo = result[0];
            console.log(codeInfo)
            res.render('editCode', {codeInfo});
        })
    } catch(err) {
        console.log(err);
    }
});

app.post('/updatedb/:id', (req, res)=>{
    let {id} = req.params;
    let {updtTitle, updtCodeBlock} = req.body;
    let updtQuery = `UPDATE codes SET title = ?, code = ? WHERE id = ?`
        try {
            connection.query(updtQuery, [updtTitle, updtCodeBlock, id],(err, result)=>{
                if(err) throw err;
                console.log('updated succesfully!', result);
                res.redirect('/');
            });
        } catch(err) {
            console.log(err);
        }
})