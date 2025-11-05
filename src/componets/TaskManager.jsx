import React, { useState, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext();

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`p-6 min-h-screen transition-all ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <button
          onClick={toggleTheme}
          className="mb-4 px-3 py-1 bg-blue-500 text-white rounded"
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task..."
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={addTask}
            className="bg-green-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setFilter("all")} className="px-2 py-1 border">
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className="px-2 py-1 border"
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className="px-2 py-1 border"
          >
            Completed
          </button>
        </div>

        <ul>
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-2 p-2 border rounded"
            >
              <span
                onClick={() => toggleComplete(index)}
                className={`cursor-pointer ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 font-bold"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ThemeContext.Provider>
  );
}
