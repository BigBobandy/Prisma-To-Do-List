import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import List from "./components/List";
import TitleCard from "./components/TitleCard";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  // GET Handler
  // This useEffect hook is used to fetch the todos from the Express sever
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((response) => response.json())
      // The data is then stored with the setTodos state
      .then((data) => setTodos(data));
  }, []); // Empty array here means the effect will only run once, when the component mounts

  // POST Handler
  const handleAddTodo = async (event) => {
    event.preventDefault();

    // Input validation
    if (inputValue.trim() === "") {
      alert("Please enter a todo to do");
      return;
    }

    const newTodo = { title: inputValue, completed: false };

    //Clear the input
    setInputValue("");

    // Add the new todo to the todos state
    setTodos([...todos, newTodo]);

    // Send the new todo to the server
    await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
  };

  // PUT Handler
  // Handles updating the completed status of the todos
  const toggleTodoCompleted = (id) => {
    // Find the specific todo that we want to update
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      console.error(`No todo found with id ${id}`);
      return;
    }

    // Perform PUT request to the server
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Reference `title` and `completed` properties on the specific todo object
        title: todo.title,
        // Completed is a boolean so it will be the oposite of what it is
        completed: !todo.completed,
      }),
    })
      // Parse the response from the server as JSON
      .then((response) => response.json())
      // Receive the updatedTodo from the server
      .then((updatedTodo) => {
        //Create a new array of todos
        const newTodos = todos.map((todo) => {
          // If the todo in the array is the one that was just updated
          // replace it with the updated version
          if (todo.id === updatedTodo.id) {
            return updatedTodo;

            // Otherwise leave it as is
          } else {
            return todo;
          }
        });

        // Update todo state with new array of todos
        setTodos(newTodos);
        // In case an error is thrown
      })
      .catch((error) => console.error(error));
  };

  // Delete Handler
  // This function is called when the Clear Completed Todos button is clicked.
  const clearCompleted = async () => {
    // Get an array of completed todos
    const completedTodos = todos.filter((todo) => todo.completed);

    // Wait for each DELETE request to complete before starting the next one
    for (const todo of completedTodos) {
      await deleteTodo(todo.id);
    }

    // After all DELETE requests have completed, update the local state
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="top-container">
        <TitleCard />
        <div className="main-container">
          <Input
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleAddTodo={handleAddTodo}
            clearCompleted={clearCompleted}
          />
          <List
            todos={todos}
            setTodos={setTodos}
            toggleTodoCompleted={toggleTodoCompleted}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
