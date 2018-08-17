const express = require('express');
const app = express();

// ------------------------------------------------
// Set up Object-Relational Mapping
// ------------------------------------------------
const Sequelize = require('sequelize');
const sequelize = new Sequelize('ormdemo', null, null, {dialect: 'sqlite', storage: 'ormdemo.db'});

const Person = sequelize.define('person', {
    name: Sequelize.STRING,
    age: Sequelize.NUMERIC,
    city: Sequelize.STRING
});

// ------------------------------------------------
// Initialize database and create sample data
// ------------------------------------------------
sequelize
    .sync({force: true}) // Create the database tables (force them to be created from scratch)
    .then(() => {
        Person.create({name: 'Alice', age: 34, city: 'Sydney'});
        Person.create({name: 'Bob', age: 23, city: 'Bondi'});
        Person.create({name: 'Carol', age: 41, city: 'Brisbane'});
        Person.create({name: 'Dave', age: 30, city: 'Cairns'});
    });

// ------------------------------------------------
// GET / people:
// Retrieve a list of all people in the database
//
// Note: this code does not catch database errors
// ------------------------------------------------
app.use('/people', (req, res) => {
    Person
        .findAll()
        .then(rows => res.json(rows));
});

// ------------------------------------------------
// GET /find?name=<Name>
// Retrieve full details of all records matching the supplied name
//
// Note: this code does not catch database errors
// ------------------------------------------------
app.use('/find', (req, res) => {
    Person
        .findAll({where: {name: req.query.name}})
        .then(rows => res.json(rows));
});

// ------------------------------------------------
// Start serving
// ------------------------------------------------
server = app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});