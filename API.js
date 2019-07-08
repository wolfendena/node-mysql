const express = require('express');
const mysql      = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : '145520Aw',
  database : 'blog'
});

db.connect(function(err){
    if (err) throw err
    console.log("My SQL is conncected and looking good!")
});

const api = express();

//creating db
api.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE blog'
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created ...');
    });
});

// create a table
api.get("/createposttable", (req, res) => {
    let sql = 'CREATE TABLE posts (id int NOT NULL AUTO_INCREMENT, title varchar(255), body varchar(255), PRIMARY KEY(id))'
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('created table ...');
    });
});

//insert a post into posts table
api.get("/addpost", (req, res) => {
    let post = {title: "My First Post", body: "Hello today was a good day"}
    let sql = 'INSERT INTO posts SET ?';
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('First post added ...');
    });
});

//adding second post
api.get("/addpost2", (req, res) => {
    let post = {title: "My Second Post", body: "Hello Again"}
    let sql = 'INSERT INTO posts SET ?';
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Second post added ...');
    });
});

//select all posts
api.get("/getposts", (req, res) => {
    let sql = 'SELECT * FROM posts';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

//select single post
api.get("/getpost/:id", (req, res) => {
    let sql = 'SELECT * FROM posts WHERE ID =' + req.params.id;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

//delete a post
api.get("/deletepost/:id", (req, res) => {
    let sql = 'DELETE FROM posts Where ID=' + req.params.id;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});



api.listen(5000);

console.log("Server is live and on port 5000....")