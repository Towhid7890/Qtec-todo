import React, { useState, useEffect } from "react";
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
  const [filterPriority, setFilterPriority] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterPriority(e.target.value);
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

  const filteredTasks =
    filterPriority === "all"
      ? tasks
      : tasks.filter((task) => task.priority === filterPriority);

  return (
    <div className="app">
      <h1 className="text-center text-3xl font-bold">Qtec Solution Limited</h1>
      <h1 className="text-center text-2xl">Todo List</h1>
      <div className="task-form py-10">
        <input
          className="border border-red-500 rounded px-4"
          type="text"
          placeholder="Add Task..."
          value={newTask}
          onChange={handleChange}
        />
        <select
          className="border border-red-500 rounded"
          onChange={handlePriorityChange}
          value={priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button
          className="text-white bg-rose-600 rounded py-1 px-4"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div className="filter-form">
        <select onChange={handleFilterChange} value={filterPriority}>
          <option value="all">All Priorities</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`task ${task.completed ? "completed" : ""}`}
            style={{ borderLeftColor: priorities[task.priority] }}
          >
            <span>{task.text}</span>
            <div>
              <button
                className="text-white bg-green-500 px-4 py-1 rounded"
                onClick={() => toggleTaskCompletion(task.id)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                className="text-white bg-amber-500 px-4 py-1 rounded"
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
