import React from 'react';

export default({ todos, deleteTodo }) => (
  <ul className="list-group mt-2">
    {todos.map(todo =>
      <li className="list-group-item">
        {todo.content}
        <button
          type="button"
          className="btn btn-link btn-sm float-right"
          onClick={() => deleteTodo(todo.id)}
          style={{ lineHeight: 1 }}
        >
          Delete
        </button>
      </li>
    )}
  </ul>
)
