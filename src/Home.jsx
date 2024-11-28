import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import Create from './Create';

const Home = () => {
  const [todos, setTodos] = useState([]); // State for storing the list of todos

  // Fetch todos from the backend when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:3001/get')
      .then((result) => setTodos(result.data))
      .catch((err) => console.error('Error fetching todos:', err));
  }, []);

  // Handle edit functionality
  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`)
      .then((result) => {
        // Optimistically update the UI without reloading the page
        setTodos(todos.map(todo => 
          todo._id === id ? { ...todo, done: !todo.done } : todo
        ));
      })
      .catch((err) => console.error('Error updating todo:', err));
  };

  
const handleDelete = (id) =>{
  axios
  .delete(`http://localhost:3001/delete/${id}`)
  .then((result) => {
    // Optimistically update the UI without reloading the page
    setTodos(todos.map(todo => 
      todo._id === id ? { ...todo, done: !todo.done } : todo
    ));
  })
  .catch((err) => console.error('Error delating todo:', err));
}
  return (
    <div>
      <h2 className="home">Todo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2 className="h2">NO RECORDS ARE FOUND</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div key={todo._id || index} className="checkbox">
            {/* Conditionally render the icon based on the task completion */}
            <span onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <i className="fa-solid fa-circle-check"></i> // Check icon for completed task
              ) : (
                <i className="fa-solid fa-circle"></i> // Empty circle for incomplete task
              )}
              {todo.task}
            </span>
            
            {/* Trash icon for deletion */}
            <div onClick={(e) => { 
              e.stopPropagation(); // Prevent triggering the edit functionality when deleting
              handleDelete(todo._id); 
            }}>
              <i className="fa-solid fa-trash" onClick={() => handleDelete(todo._id)}></i>
            </div>
          </div>
        ))
      )}
    </div>
  );
};



export default Home;
