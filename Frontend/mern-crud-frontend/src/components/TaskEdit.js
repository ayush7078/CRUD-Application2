import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';
import './TaskEdit.css';


const TaskEdit = () => {
  const [task, setTask] = useState({ task: '', description: ''});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${id}`)
      .then(response => {
        setTask(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/tasks/update/${id}`, task)
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
      <h2>Update Task</h2>
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
     
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default TaskEdit;
