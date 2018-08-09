import React, { Component } from 'react';
import axios from 'axios';
import Todo from './Todo';
import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    axios.get('/api/todos')
      .then(response => {
        const todos = response.data;
        this.setState({ todos });
      })
  }

  addTodo(todo) {
    if (todo.trim() !== '') {
      axios.post('api/todos', { todo })
        .then(response => {
          const todos = response.data;
          this.setState({ todos });
        })
    }
  }

  deleteTodo(id) {
    axios.delete(`/api/todos/${id}`)
      .then(response => {
        const todos = response.data;
        this.setState({ todos });
      })
  }

  render() {
    return (
      <div className="container">
        <div className="card m-5">
          <h3 className="card-header">Todo List</h3>
          <div className="card-body">
            <Todo addTodo={this.addTodo.bind(this)}/>
            <TodoList todos={this.state.todos} deleteTodo={this.deleteTodo.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
