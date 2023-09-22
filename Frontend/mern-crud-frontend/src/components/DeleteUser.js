import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./UserEdit.css"

const DeleteUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/users/delete/${id}`)
      .then(() => {
        console.log('User deleted successfully.');
        navigate('/'); // Redirect to home after deletion
      })
      .catch((error) => {
        console.log('Error deleting user: ', error);
      });
  };

  return (
    <div>
      <h2>Delete User</h2>
      {user ? (
        <div>
          <p>Are you sure you want to delete user {user.name}?</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <Link to="/">Cancel</Link>
    </div>
  );
};

export default DeleteUser;

