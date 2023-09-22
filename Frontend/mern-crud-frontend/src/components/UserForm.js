import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./UserForm.css"

const UserForm = () => {
  const [user, setUser] = useState({ name: '', fatherName: '', dateOfBirth: '', gender: '' });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/users/add', user)
      .then(() => navigate('/'))
      .catch(err => console.log('Error: ' + err));
  };

  
  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          placeholder="User Name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="fatherName"
          placeholder="Father Name"
          value={user.fatherName}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateOfBirth"
          value={user.dateOfBirth}
          onChange={handleChange}
        />
        <select name="gender" value={user.gender} onChange={handleChange}>
            <option value="Select">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserForm;
