import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="user-actions">
      <h1>Welcome to the User Management System</h1>
      <Link to="/add">Add User</Link>
      <Link to="/edit">Edit User</Link>
      <Link to="/delete">Delete User</Link>
    </div>
  );
};

export default Home;
