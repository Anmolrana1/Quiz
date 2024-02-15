import React, { useState } from 'react'
import Navbar from './navbar'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function TakeQuiz() {
  const [inputValue, setInputValue] = useState('');
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  localStorage.setItem('Code', inputValue);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://api.example.com/details/${inputValue}`);
      if (!response.ok) {
        throw new Error('Failed to fetch details');
      }
      const data = await response.json();
      setDetails(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    window.location.href = '/carousel';
  };
  return (
      <div>
      <Navbar/>
      <div className='take_quiz'>
      <div>
      <h1 style={{color: "darkorange"}}>Take Quiz</h1>
      <div>
      <TextField
        label="Enter ID"
        variant="outlined"
        value={inputValue}
        onChange={handleChange}
        style={{width: "500px"}}
      /><br></br><br></br>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Fetch Details
      </Button>
      {error && <p>Error: {error}</p>}
      {details && (
        <div>
          <h2>Details:</h2>
          <p>Name: {details.name}</p>
          <p>Email: {details.email}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
      </div>
    </div>
    </div>
  )
}

export default TakeQuiz
