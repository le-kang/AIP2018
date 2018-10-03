import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Todo from './Todo';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    const locationState = this.props.location.state;
    if (locationState && locationState.todos) {
      // If the todo list is sent by other component, we don't need to fetch from the server
      this.setState({ todos: locationState.todos })
    } else {
      axios.get('/api/todos')
        .then(response => {
          const todos = response.data;
          this.setState({ todos });
        })
    }
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
        <div className="card-body">
          <Todo addTodo={this.addTodo.bind(this)}/>
          <ul className="list-group mt-2">
            {this.state.todos.map(todo =>
              <li className="list-group-item">
                <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                  {todo.content}
                </span>
                <button
                  type="button"
                  className="btn btn-link btn-sm float-right"
                  onClick={() => this.deleteTodo(todo.id)}
                  style={{ lineHeight: 1 }}
                >
                  Delete
                </button>
                <Link
                  className="btn btn-link btn-sm float-right"
                  style={{ lineHeight: 1 }}
                  to={{
                    pathname: `/todo-editor/${todo.id}`,
                    state: { todo }
                  }}
                >
                  Edit
                </Link>
              </li>
            )}
          </ul>
        </div>
    );
  }
}

export default TodoList;
