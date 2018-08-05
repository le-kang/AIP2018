import React from 'react';

export default({ todos }) => (
  <ul className="list-group mt-2">
    {todos.map(todo =>
      <li className="list-group-item">{todo}</li>
    )}
  </ul>
)
