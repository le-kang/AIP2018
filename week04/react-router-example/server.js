const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const _ = require('lodash');
const app = express();

let todos = [];

app.use(express.static('build'));

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing application/json
app.use(bodyParser.json());

app.get('/api/todos', (request, response) => {
  response.json(todos);
});

app.get('/api/todos/:id', (request, response) => {
  // This is for simulating a server delay with 1s.
  setTimeout(() => response.json(_.find(todos, { id: request.params.id })), 1000)
});

app.post('/api/todos', (request, response) => {
  if ('todo' in request.body && request.body.todo !== '') {
    todos = [ ...todos, {
      id: uuidv1(), // Generate a unique id according to timestamp
      content: request.body.todo,
      done: false
    }] // Use spread operator to create a new list with submitted item
  }
  response.json(todos)
});

app.put('/api/todos/:id', (request, response) => {
  if (_.find(todos, { id: request.params.id })) {
    todos = [ ...todos.filter(todo => todo.id !== request.params.id), request.body.todo ]
  }
  response.json(todos)
});

app.delete('/api/todos/:id', (request, response) => {
  todos = todos.filter(todo => todo.id !== request.params.id);
  response.json(todos)
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

console.log('Running on http://localhost:8000/');
app.listen(8000);
