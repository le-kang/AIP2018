import React, { Component } from 'react';
import Todo from './Todo';
import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  }

  addTodo(todo) {
    if (todo) {
      this.setState({
        todos: [...this.state.todos, todo]
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="card m-5">
          <h3 className="card-header">Todo List</h3>
          <div className="card-body">
              <Todo addTodo={this.addTodo.bind(this)}/>
              <TodoList todos={this.state.todos}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
