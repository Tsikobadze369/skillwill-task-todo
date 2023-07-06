import React, { useState } from "react";
import "./TodoList.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      setTasks([...tasks, inputValue]);
      setInputValue("");
    }
  };

  const handleMoveToInProgress = (index) => {
    const taskToMove = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setInProgressTasks([...inProgressTasks, taskToMove]);
  };

  const handleMoveToTasks = (index, column) => {
    let taskToMove;
    let updatedTasks;
    if (column === "inProgress") {
      taskToMove = inProgressTasks[index];
      updatedTasks = inProgressTasks.filter((_, i) => i !== index);
      setInProgressTasks(updatedTasks);
    } else if (column === "completed") {
      taskToMove = completedTasks[index];
      updatedTasks = completedTasks.filter((_, i) => i !== index);
      setCompletedTasks(updatedTasks);
    }
    setTasks([...tasks, taskToMove]);
  };

  const handleCompleteTask = (index) => {
    const taskToComplete = inProgressTasks[index];
    const updatedTasks = inProgressTasks.filter((_, i) => i !== index);
    setInProgressTasks(updatedTasks);
    setCompletedTasks([...completedTasks, taskToComplete]);
  };

  const handleDeleteTask = (index) => {
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(updatedCompletedTasks);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <div className="column">
        <h2>Tasks to be Performed</h2>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTask}>Add Task</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => handleMoveToInProgress(index)}>
                Move to In Progress
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="column">
        <h2>In Progress</h2>
        <ul>
          {inProgressTasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => handleCompleteTask(index)}>
                Complete
              </button>
              <button onClick={() => handleMoveToTasks(index, "inProgress")}>
                Move to Tasks
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="column">
        <h2>Completed Works</h2>
        <ul>
          {completedTasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
              <button onClick={() => handleMoveToTasks(index, "completed")}>
                Move to Tasks
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
