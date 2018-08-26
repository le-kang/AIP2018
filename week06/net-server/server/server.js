const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

let counter = 0;
let server = null;

app.use(cors());
app.use(express.static('client'));

// Middleware to slow down each request
function doSlow(req, res, next) {
    setTimeout(next, 2000);
}

// Middleware to flush headers and then wait some more
function doSlower(req, res, next) {
    res.set('Content-Type', 'application/json');
    res.flushHeaders();
    res.write(' '); // write a byte to finish the headers
    setTimeout(next, 4000);
}

// Middleware to randomly cause a 500 Internal Server Error (with 50-50 chance)
function doError(req, res, next) {
    const rand = Math.random();
    if (rand < 0.5) {
        res.sendStatus(500);
    } else
        next();
}

// Middleware to randomly crash NodeJS (with 50-50 chance)
function doCrash(req, res, next) {
    const rand = Math.random();
    if (rand < 0.5) {
        console.log('Randomly crashing to create a network error for the client')
        process.exit(1);
    }
    else
        next();
}

// GET /fast
// Increments and returns the current page quickly
app.get('/fast', (req, res) => {
    res.json({count: ++counter});
});

// GET /slow
// Increments and returns the current page slowly
app.get('/slow', doSlow, (req, res) => {
    res.json({count: ++counter});
});

// GET /slower
// Increments and returns the current page very slow (with headers sent first)
app.get('/slower', doSlow, doSlower, (req, res) => {
    res.write(JSON.stringify({count: ++counter}))
    res.end();
});

// GET /error
// Increments and returns the current page, but sometimes fails
app.get('/error', doError, (req, res) => {
    res.json({count: ++counter});
});

// GET /crash
// Increments and returns the current page, but sometimes crashes NodeJS
app.get('/crash', doCrash, (req, res) => {
    res.json({count: ++counter});
});

// GET /terrible
// Increments and returns the current page, but fails in many ways
app.get('/terrible', doSlow, doError, doCrash, (req, res) => {
    res.json({count: ++counter});
});

// GET /show
// Prints the submitted body, and returns success.
app.use(bodyParser.json());
app.post('/show', (req, res) => {
    console.log('Data: ' + JSON.stringify(req.body));
    res.json({success: true});
});

server = app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});
