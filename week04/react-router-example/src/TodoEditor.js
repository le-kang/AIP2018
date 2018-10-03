import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class TodoEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: null,
      fetched: false
    }
  }

  componentDidMount() {
    const locationState = this.props.location.state;
    if (locationState && locationState.todo) {
      // If the todo item is sent by other component, we don't need to fetch from the server
      this.setState({
        todo: locationState.todo,
        fetched: true
      })
    } else {
      axios.get(`/api/todos/${this.props.match.params.id}`)
        .then(response => {
          const todo = response.data;
          this.setState({ todo });
        })
        .catch(error => console.log(error))
        .then(() => this.setState({ fetched: true }))
    }
  }

  handleTodoUpdate(prop, newValue) {
    this.setState({
      todo: { ...this.state.todo, [prop]: newValue }
    });
  }

  handleTodoSubmit() {
    axios.put(`/api/todos/${this.state.todo.id}`, { todo: this.state.todo })
      .then(response => {
        // Navigate to '/' with updated todo list
        this.props.history.push('/', { todos: response.data })
      })
  }

  render() {
    return (
      <div className="card-body">
        {/* Fetching item */}
        {!this.state.fetched && <p>Fetching todo item...</p>}
        {/* If item cannot be found, redirect to '/' */}
        {this.state.fetched && !this.state.todo && <Redirect to='/todo-list'/>}
        {/* If todo is found, render the editor part */}
        {this.state.fetched && this.state.todo &&
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="todo"
              value={this.state.todo.content}
              placeholder="What needs to be done?"
              onChange={e => this.handleTodoUpdate('content', e.target.value)}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isTodoCompleted"
              defaultChecked={this.state.todo.done}
              onChange={e => this.handleTodoUpdate('done', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isTodoCompleted">Completed</label>
          </div>
          <div className="form-group clearfix">
            <button
              type="button"
              className="btn btn-primary float-right mr-2"
              onClick={() => this.handleTodoSubmit()}
            >
              Submit
            </button>
            <Link
              className="btn btn-danger float-right mr-2"
              to="/todo-list"
            >
              Cancel
            </Link>
          </div>
        </form>
        }
      </div>
    )
  }
}

export default TodoEditor