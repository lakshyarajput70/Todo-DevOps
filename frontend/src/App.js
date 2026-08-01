import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // const API = "/api";
  const API = process.env.REACT_APP_API_URL;  //Changing for the render/vercel deployment
  const fetchTodos = async () => {
    const res = await axios.get(`${API}/todos`);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text) return;
    await axios.post(`${API}/todos`, { text, priority: "high" });
    setText("");
    fetchTodos();
  };

  const toggleTodo = async (id, completed) => {
    await axios.put(`${API}/todos/${id}`, { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="container">
      <h1>DevOps Todo App</h1>

      <div>
        <input
          value={text}
          placeholder="Enter task"
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.map((todo) => (
        <div className="todo-item" key={todo._id}>
          <span
            className={`todo-text ${todo.completed ? "completed" : ""}`}
            onClick={() => toggleTodo(todo._id, todo.completed)}
          >
            {todo.text}
          </span>
          <button
            className="delete-btn"
            onClick={() => deleteTodo(todo._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
