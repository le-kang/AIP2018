const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

// ------------------------------------------------
// Connect to MongoDB
// ------------------------------------------------
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    const db = client.db('demo');

    // ------------------------------------------------
    // Create sample data
    // ------------------------------------------------
    db.collection('people')
        .insertOne({})          // Create one to ensure that .drop() won't fail
        .then(() => db.collection('people').drop()) // Remove existing people
        .then(() => {
            db.collection('people').createIndex('name');
            db.collection('people').insertOne({name: 'Alice', age: 34, location: ['Sydney', 'New South Wales']});
            db.collection('people').insertOne({name: 'Bob', age: 23, location: ['Bondi', 'New South Wales']});
            db.collection('people').insertOne({name: 'Carol', age: 41, location: ['Brisbane', 'Queensland']});
            db.collection('people').insertOne({name: 'Dave', age: 30, location: ['Cairns', 'Queensland']});
        });

    // ------------------------------------------------
    // GET / people:
    // Retrieve a list of all people in the database
    //
    // Note: this code does not catch database errors
    // ------------------------------------------------
    app.use('/people', (req, res) => {
        db.collection('people')
            .find()
            .toArray()
            .then(docs => res.json(docs));
    });

    // ------------------------------------------------
    // GET /find?name=<Name>
    // Retrieve full details of all records matching the supplied name
    //
    // Note: this code does not catch database errors
    // ------------------------------------------------
    app.use('/find', (req, res) => {
        db.collection('people')
            .find({name: req.query.name})
            .toArray()
            .then(docs => res.json(docs));
    });

    // ------------------------------------------------
    // Start serving
    // ------------------------------------------------
    app.listen(3000, () => {
        console.log('Running on http://localhost:3000/');
    });
});


