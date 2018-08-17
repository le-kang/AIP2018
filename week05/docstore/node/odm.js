const express = require('express');
const app = express();

// ------------------------------------------------
// Set up Object-Document mapping
// i.e., declare the schema of collections in the db
// ------------------------------------------------
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true });

const Person = mongoose.model('Person', {
    name: {type: String, index: true},  // Use an index on name for faster querying
    age: Number,
    location: [String],
});

// ------------------------------------------------
// Create sample data
// ------------------------------------------------
Person
    .remove({}) // Remove existing people
    .then(() => {
        new Person({name: 'Alice', age: 34, location: ['Sydney', 'New South Wales']}).save();
        new Person({name: 'Bob', age: 23, location: ['Bondi', 'New South Wales']}).save();
        new Person({name: 'Carol', age: 41, location: ['Brisbane', 'Queensland']}).save();
        new Person({name: 'Dave', age: 30, location: ['Cairns', 'Queensland']}).save();
    });

// ------------------------------------------------
// GET / people:
// Retrieve a list of all people in the database
//
// Note: this code does not catch database errors
// ------------------------------------------------
app.use('/people', (req, res) => {
    Person
        .find()
        .then(results => res.json(results));
});

// ------------------------------------------------
// GET /find?name=<Name>
// Retrieve full details of all records matching the supplied name
//
// Note: this code does not catch database errors
// ------------------------------------------------
app.use('/find', (req, res) => {
    Person
        .find({name: req.query.name})
        .then(results => res.json(results));
});

// ------------------------------------------------
// Start serving
// ------------------------------------------------
server = app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});