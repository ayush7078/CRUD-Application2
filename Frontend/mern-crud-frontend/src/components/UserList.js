import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  
  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        axios.get('http://localhost:5000/users')
          .then(response => {
            setUsers(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch((err) => console.log('Error: ' + err));
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <Link to="/add" className="add-user-button">
        Add User
      </Link>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id} className="user-item">
            <div>
              <span className="user-info">
                Name - {user.name}
              </span>
              <span className="user-info">
                Father Name - {user.fatherName}
              </span>
              <span className='user-info'>
                
                Date of Birth - {formatDate(user.dateOfBirth)}
              </span>
              <span>
                Gender - {user.gender}</span>
              <br />
              <Link to={`/edit/${user._id}`} className="user-link">
                Edit
              </Link>
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
