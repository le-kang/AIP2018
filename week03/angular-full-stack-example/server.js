const express = require('express');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const app = express();

let todos = [];

app.use(express.static('dist/angular-full-stack-example'));

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing application/json
app.use(bodyParser.json());

app.post('/api/todos', (request, response) => {
  if ('todo' in request.body && request.body.todo !== '') {
    todos = [ ...todos, {
      id: uuidv1(), // Generate a unique id according to timestamp
      content: request.body.todo
    }] // Use spread operator to create a new list with submitted item
  }
  response.json(todos)
});

app.get('/api/todos', (request, response) => {
  response.json(todos);
});

app.delete('/api/todos/:id', (request, response) => {
  todos = todos.filter(todo => todo.id !== request.params.id);
  response.json(todos)
});

console.log('Running on http://localhost:8000/');
app.listen(8000);
