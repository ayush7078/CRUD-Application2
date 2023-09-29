import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./TaskForm.css"

const TaskForm = () => {
  const [task, setTask] = useState({ task: '', description: ''});
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/tasks/add', task)
      .then(() => navigate('/'))
      .catch(err => console.log('Error: ' + err));
  };

  
  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          placeholder="Task"
          value={task.task}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
