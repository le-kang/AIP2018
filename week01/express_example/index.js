const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let total_requests = 0;
const todos = [];

// use ejs as view engine
app.set('view engine', 'ejs');
// for parsing urlencoded bodies for request Content-Type matches application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// use middleware to count the total number of requests that server handled
app.use((request, response, next) => {
  total_requests++;
  next();
});

app.get('/', (request, response) => {
  response.render('todos', { todos: todos, total_requests: total_requests})
});

app.post('/', (request, response) => {
  if ('todo' in request.body && request.body.todo !== '') {
    todos.push(request.body.todo)
  }
  response.render('todos', { todos: todos, total_requests: total_requests });
});

app.get('/api/todos', (request, response) => {
  response.json(todos);
});


console.log('Running on http://localhost:3000/');
app.listen(3000);