import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: ''
    }
  }

  handleTodoValueUpdate(e) {
    this.setState({ todo: e.target.value })
  }

  handleTodoSubmit() {
    this.props.addTodo(this.state.todo);
    this.setState({ todo: '' });
  }

  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          name="todo"
          value={this.state.todo}
          placeholder="What needs to be done?"
          onChange={e => this.handleTodoValueUpdate(e)} // Update input value on key change
          onKeyPress={e => e.key === 'Enter' && this.handleTodoSubmit()} // If enter key pressed, add new todo.
        />
        <div className="input-group-append">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => this.handleTodoSubmit()}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default Todo;
