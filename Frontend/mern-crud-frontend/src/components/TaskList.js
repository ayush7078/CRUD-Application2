import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  
  const handleDeleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        axios.get('http://localhost:5000/tasks')
          .then(response => {
            setTasks(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch((err) => console.log('Error: ' + err));
  };

  return (
    <div className="user-list-container">
      <h2>Task List</h2>
      <Link to="/add" className="add-user-button">
        Add Task
      </Link>
      <ul className="user-list">
        {tasks.map((task) => (
          <li key={task._id} className="user-item">
            <div>
              <span className="user-info">
                Name - {task.task}
              </span>
              <span className="user-info">
                Description - {task.description}
              </span>
              <br/>
              <Link to={`/edit/${task._id}`} className="user-link">
                Edit
              </Link>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
