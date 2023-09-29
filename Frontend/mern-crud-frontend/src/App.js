import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskEdit from './components/TaskEdit';
import DeleteTask from './components/DeleteTask';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="container">
      <div>
      <h1>User Authentication</h1>
      <Signup />
      <Login />
    </div>
    <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskEdit />} />
          <Route path="/delete/:id" element={<DeleteTask />} />
        </Routes>
      </div>      
    </Router>
  );
}

export default App;
