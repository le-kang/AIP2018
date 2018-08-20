import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import TodoList from './TodoList';
import TodoEditor from './TodoEditor';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="card m-5">
          <h3 className="card-header">
            {this.props.location.pathname === '/todo-list' ? 'Todo List' : 'Edit Todo'}
          </h3>
          <Switch>
            <Route exact path='/todo-list' component={TodoList}/>
            <Route path='/todo-editor/:id' component={TodoEditor}/>
            <Route render={() => <Redirect to="/todo-list"/>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
