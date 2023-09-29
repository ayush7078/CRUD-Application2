import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="user-actions">
      <h1>Welcome to the Task Management System</h1>
      <Link to="/add">Add Task</Link>
      <Link to="/edit">Edit Task</Link>
      <Link to="/delete">Delete Task</Link>
    </div>
  );
};

export default Home;
