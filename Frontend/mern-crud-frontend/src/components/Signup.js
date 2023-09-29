import React, { useState } from 'react';
import axios from 'axios'; // Make sure to replace this with the correct API endpoint

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', { email, password }); // Replace with your actual API endpoint
      console.log('Signup successful. Token:', response.data.token);
      // Optionally, you can redirect to a new page or perform other actions upon successful signup
    } catch (error) {
      console.error('Error signing up:', error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
