import React, { useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (taskName.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        taskName,
        description,
        status: "not completed"
      };
      setTodos([...todos, newTodo]);
      setTaskName("");
      setDescription("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") {
      return todo.status === "completed";
    } else if (filter === "not completed") {
      return todo.status === "not completed";
    } else {
      return true;
    }
  });

  return (
    <div className="todo-container">
      <div className="todo-inputs">
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div className="filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </select>
      </div>
      <p><b>My Todo's</b></p>
      <div className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
