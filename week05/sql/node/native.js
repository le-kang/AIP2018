const express = require('express');
const app = express();

// ------------------------------------------------
// Establish connection to sqlite database
// ------------------------------------------------
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('nativedemo.db')

// ------------------------------------------------
// Initialize with sample data
// ------------------------------------------------
db.serialize(() => {
    db.run(
        `create table if not exists Person(
            name text primary key, 
            age numeric, 
            city text
        )`
    );
    db.run(`delete from Person`);
    db.run(`insert into Person values ('Alice', 34, 'Sydney')`);
    db.run(`insert into Person values ('Bob', 23, 'Bondi')`);
    db.run(`insert into Person values ('Carol', 41, 'Brisbane')`);
    db.run(`insert into Person values ('Dave', 30, 'Cairns')`);
});

// ------------------------------------------------
// GET / people:
// Retrieve a list of all people in the database
//
// Note: this code does not handle database errors
// ------------------------------------------------
app.use('/people', (req, res) => {
    db.all(
        'select name, age, city from person',
        (err, rows) => res.json(rows)
    );
});

// ------------------------------------------------
// GET /find?name=<Name>
// Retrieve full details of all records matching the supplied name
//
// Note: this code does not handle database errors
// ------------------------------------------------
app.use('/find', (req, res) => {
    db.all(
        'select city from person where name = $name',
        { $name: req.query.name },
        (err, rows) => res.json(rows)
    );
});

// ------------------------------------------------
// Start serving
// ------------------------------------------------
server = app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});