import "./styles/Input.css";

function Input({ inputValue, setInputValue, handleAddTodo, clearCompleted }) {
  // Handles changes in the input field
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="input-wrapper">
      <form className="input-container">
        <input
          type="text"
          placeholder="Add todo to list..."
          value={inputValue}
          onChange={handleChange}
        ></input>
        <button type="submit" onClick={handleAddTodo}>
          Add to list
        </button>
        <button type="reset" onClick={clearCompleted}>
          Clear Completed Todos
        </button>
      </form>
    </div>
  );
}

export default Input;
