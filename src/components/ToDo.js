import React from 'react';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      <p
        className={`${task.completed ? "completed" : "incompleted"}`}
        onClick={() => toggleComplete(task._id)}
      >
        {task.task}
      </p>
      <div>
        <span className="edit-icon" onClick={() => editTodo(task._id)}>
          &#9998; {/* Unicode for pencil/edit icon */}
        </span>
        <span className="delete-icon" onClick={() => deleteTodo(task._id)}>
          &#128465; {/* Unicode for trash/delete icon */}
        </span>
      </div>
    </div>
  );
};
