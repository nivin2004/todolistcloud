import React, { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "./ToDo";
import { TodoForm } from "./ToDoForm";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the todos!", error);
      });
  }, []);

  const addTodo = (todo) => {
    axios.post('http://localhost:5000/todos', {
      task: todo,
      completed: false,
      isEditing: false,
    })
    .then((response) => {
      setTodos([...todos, response.data]);
    })
    .catch((error) => {
      console.error("There was an error adding the todo!", error);
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then((response) => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the todo!", error);
      });
  };

  const toggleComplete = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    axios.put(`http://localhost:5000/todos/${id}`, {
      ...todo,
      completed: !todo.completed,
    })
    .then((response) => {
      setTodos(todos.map((todo) => todo._id === id ? response.data : todo));
    })
    .catch((error) => {
      console.error("There was an error toggling the todo!", error);
    });
  };

  const editTodo = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    axios.put(`http://localhost:5000/todos/${id}`, {
      ...todo,
      isEditing: !todo.isEditing,
    })
    .then((response) => {
      setTodos(todos.map((todo) => todo._id === id ? response.data : todo));
    })
    .catch((error) => {
      console.error("There was an error editing the todo!", error);
    });
  };

  const editTask = (task, id) => {
    const todo = todos.find((todo) => todo._id === id);
    axios.put(`http://localhost:5000/todos/${id}`, {
      ...todo,
      task,
      isEditing: !todo.isEditing,
    })
    .then((response) => {
      setTodos(todos.map((todo) => todo._id === id ? response.data : todo));
    })
    .catch((error) => {
      console.error("There was an error updating the todo!", error);
    });
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo._id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo._id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
