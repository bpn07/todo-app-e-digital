import React, { useState, useEffect } from "react";
import "./assets/styles/global.css";

function App() {
  // set initial state to stored tasks if available
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  //set tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() === "") return;

    const newTask = {
      id: Date.now(), // unique id for each task
      text: taskInput,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskInput("");
  };

  // toggle the status of a task
  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // remove a task
  const handleRemoveTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) =>
    showCompleted ? task.completed : true
  );

  return (
    <main className="main-container">
      <div className="container">
        <p className="heading">Todo App</p>
        <form className="todo-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Add a new todo"
            className="todo-field"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button type="submit" className="btn btn-add">
            Add
          </button>
          <div className="filter-buttons"></div>
        </form>
        <button
          className="btn btn-toggle"
          onClick={() => setShowCompleted((prev) => !prev)}
        >
          {showCompleted ? "Show All" : "Show Completed"}
        </button>
        {tasks && tasks.length > 0 && (
          <ul className="todo-list">
            {filteredTasks.map((task) => (
              <li key={task.id} className="todo-item">
                <span className="todo-text">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskStatus(task.id)}
                  />
                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>
                </span>
                <button
                  className="btn btn-remove"
                  onClick={() => handleRemoveTask(task.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default App;
