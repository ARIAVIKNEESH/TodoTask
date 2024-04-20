import React, { useState } from "react";

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  const [status, setStatus] = useState(todo.status);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(todo.taskName);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    const updatedTodo = { ...todo, status: newStatus };
    updateTodo(todo.id, updatedTodo);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTodo = {
      ...todo,
      taskName: editedTaskName,
      description: editedDescription
    };
    updateTodo(todo.id, updatedTodo);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${status === "completed" ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTaskName}
            onChange={(e) => setEditedTaskName(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </>
      ) : (
        <>
          <h3>{todo.taskName}</h3>
          <p><strong>Description:</strong> {todo.description}</p>
        </>
      )}
      <div className="status">
        <strong>Status:</strong>
        {isEditing ? (
          <select value={status} onChange={handleStatusChange}>
            <option value="not completed">Not Completed</option>
            <option value="completed">Completed</option>
          </select>
        ) : (
          <span style={{ color: status === "completed" ? "green" : "red" }}>{todo.status}</span>
        )}
      </div>
      <div className="actions">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
