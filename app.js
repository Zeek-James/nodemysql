const express = require('express')
const mysql = require('mysql')

// Create connection
const dataBase = mysql.createConnection({
    host: 'localhost',
    database: 'nodemysql'
});

// connect
dataBase.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
})

const app = express();

// Create dataBase
app.get('/createdataBase', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    dataBase.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...')
    })
})

// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int Auto_INCREMENT, title VARCHAR(255), body VARCHAR(225), PRIMARY KEY (id))';
    dataBase.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created...')
    })
})

// Insert post Zeek
app.get('/addpostZeek', (req, res) => {
    let post = { title: 'Post Zeek', body: 'This is post number Zeek' };
    let sql = 'INSERT INTO posts SET ?';
    let query = dataBase.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post Zeek added...')
    })
})

// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = dataBase.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('Posts fetched...')
    })
})

// Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = dataBase.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post fetched...')
    })
})

// Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Update Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = dataBase.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post updated...')
    })
})

// Delete post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = dataBase.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result); 
        res.send('Post deleted...')
    })
})

app.listen('3005', () => {
    console.log('Server started on port 3005');
})