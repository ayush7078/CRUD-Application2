import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';
import './UserEdit.css';


const UserEdit = () => {
  const [user, setUser] = useState({ name: '', fatherName: '', dateOfBirth: '', gender: 'Male' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/users/update/${id}`, user)
      .then(() => navigate('/'))
      .catch(err => console.log('Error: ' + err));
  };


//   const handleDelete = () => {
//     axios
//       .delete(`http://localhost:5000/users/${id}`)
//       .then(() => {
//         history.push('/');
//       })
//       .catch((err) => console.log('Error: ' + err));
//   };


  return (
    <div>
      <h2>Update User</h2>
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
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UserEdit;
