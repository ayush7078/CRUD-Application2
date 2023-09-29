import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./TaskEdit.css"

const DeleteTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTasks] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tasks/${id}`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/tasks/delete/${id}`)
      .then(() => {
        console.log('Task deleted successfully.');
        navigate('/'); // Redirect to home after deletion
      })
      .catch((error) => {
        console.log('Error deleting task: ', error);
      });
  };

  return (
    <div>
      <h2>Delete Task</h2>
      {task ? (
        <div>
          <p>Are you sure you want to delete user {task.task}?</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>Loading task data...</p>
      )}
      <Link to="/">Cancel</Link>
    </div>
  );
};

export default DeleteTask;

