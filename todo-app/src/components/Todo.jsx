import React, { useState } from "react";
import "./todo.css";

const priorities = {
  low: "#6AC7E6",
  medium: "#FFD166",
  high: "#EF476F",
};

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false, priority },
    ]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="app">
      <h1 className="text-4xl font-bold text-center">Qtec Careers</h1>
      <h1 className="text-3xl text-center py-5">Todo List</h1>
      <div className="task-form">
        <input
          className="border border-red-500 rounded px-2"
          type="text"
          placeholder="Add Task..."
          value={newTask}
          onChange={handleChange}
        />
        <select onChange={handlePriorityChange} value={priority}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button
          className="bg-rose-800 px-4 py-1 rounded text-white"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task ${task.completed ? "completed" : ""}`}
            style={{ borderLeftColor: priorities[task.priority] }}
          >
            <span>{task.text}</span>
            <div>
              <button
                className="bg-green-500 px-4 py-1 rounded text-white"
                onClick={() => toggleTaskCompletion(task.id)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                className="bg-amber-500 px-4 py-1 rounded"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="task-summary">
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed Tasks: {tasks.filter((task) => task.completed).length}</p>
      </div>
    </div>
  );
}

export default Todo;
