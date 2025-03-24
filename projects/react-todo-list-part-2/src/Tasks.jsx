import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoList.tasks";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const taskNameRef = useRef();

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    // const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    // if (storedTasks) {
    //   setTasks(JSON.parse(storedTasks));
    // }
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const today = new Date();
      setCurrentTime(today.toLocaleTimeString());
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const date = () => {
    const today = new Date();
    const [day, month, date, year] = today.toDateString().split(" ");
    return `${day}, ${date} ${month} ${year}`;
  };

  const handleAddTask = () => {
    const taskName = taskNameRef.current.value.trim();
    if (taskName === "") return;

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: uuidv4(), name: taskName, complete: false },
    ]);

    taskNameRef.current.value = ""; // Reset input field
  };

  const handleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const moveTaskUp = (id) => {
    setTasks((prevTasks) => {
      const index = prevTasks.findIndex((task) => task.id === id);
      if (index > 0) {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index - 1]] = [
          updatedTasks[index - 1],
          updatedTasks[index],
        ];
        return updatedTasks;
      }
      return prevTasks;
    });
  };

  const moveTaskDown = (id) => {
    setTasks((prevTasks) => {
      const index = prevTasks.findIndex((task) => task.id === id);
      if (index < prevTasks.length - 1) {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index + 1]] = [
          updatedTasks[index + 1],
          updatedTasks[index],
        ];
        return updatedTasks;
      }
      return prevTasks;
    });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="time">{date()}</div>
        <div className="date">{currentTime}</div>
      </div>
      <div className="main">
        <div className="input-container">
          <input
            type="text"
            name="taskName"
            id="taskName"
            className="taskName"
            ref={taskNameRef}
            placeholder="Enter Task Name"
          />
          <button className="addTask" onClick={handleAddTask}>
            <span className="material-icons">add</span>
          </button>
        </div>

        {tasks.map((task) => (
          <div className="tasks-container">
            <div key={task.id} className="task">
              <p className={`text ${task.complete ? "completed" : ""}`}>
                {task.name}
              </p>
              <button type="button" className="task-complete">
                <input
                  type="checkbox"
                  checked={task.complete}
                  id="complete"
                  className="task-checkbox"
                  onChange={() => handleComplete(task.id)}
                />{" "}
                {/* <label htmlFor="complete">Task Complete</label> */}
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                <span class="material-icons">delete_forever</span>
              </button>
              <button type="button" onClick={() => moveTaskUp(task.id)}>
                <span class="material-icons">arrow_upward</span>
              </button>
              <button type="button" onClick={() => moveTaskDown(task.id)}>
                <span class="material-icons">arrow_downward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="task-remaining">
        {tasks.filter((task) => !task.complete).length}{" "}
        {tasks.filter((task) => !task.complete).length === 1
          ? "Task Remaining"
          : "Tasks Remaining"}
      </div>
    </div>
  );
};

export default Tasks;
