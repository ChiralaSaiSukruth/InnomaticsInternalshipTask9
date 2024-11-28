import React, { useState } from 'react'; // Import useState from React
import axios from 'axios';

const Create = () => {
  const [task, setTask] = useState(''); // Initialize state with an empty string

  const handleAdd = () => {
    // Ensure task is not empty before making the request
    if (task.trim() === '') {
      console.log('Task cannot be empty');
      return;
    }

    axios
      .post('http://localhost:3001/add', { task: task })
      .then(result => {
location.reload()
      })
      .catch((err) => console.error('Error adding task:', err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        value={task} // Bind the input's value to the state
        onChange={(e) => setTask(e.target.value)} // Update state on input change
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
      <div>
    
    </div>
    </div>
    
  );
};

export default Create;
