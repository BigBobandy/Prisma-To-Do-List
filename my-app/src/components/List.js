import React from "react";
import "./styles/List.css";

function List({ todos, setTodos, toggleTodoCompleted }) {
  const handleCheckboxChange = (id) => {
    // Update the local state immediately, before the server responds.
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      })
    );

    // Then send the update to the server.
    toggleTodoCompleted(id);
  };

  return (
    <div className="list-wrapper">
      <div className="list-container">
        <h1>To Do List</h1>
        <hr />
        {todos.map((todo) => (
          <div key={todo.id}>
            <label>
              <input
                type="checkbox"
                className="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              {todo.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
