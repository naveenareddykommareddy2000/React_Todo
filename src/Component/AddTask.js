
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddTask.css';

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if there's a task to edit
    if (location.state) {
      const { name, priority, dueDate } = location.state;
      setTaskName(name);
      setPriority(priority);
      setDueDate(dueDate);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: location.state ? location.state.id : Date.now(), // Use existing ID for edit
      name: taskName,
      priority,
      completed: false,
      dueDate,
    };

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    if (location.state) {
      // Update the existing task
      const updatedTasks = storedTasks.map(task => 
        task.id === location.state.id ? newTask : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } else {
      // Add a new task
      localStorage.setItem('tasks', JSON.stringify([...storedTasks, newTask]));
    }

    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
   <div>
    <h1>TODO FORM</h1>
    <div className="container"> 
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input 
            type="text" 
            value={taskName} 
            onChange={(e) => setTaskName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Due Date:</label>
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">{location.state ? 'Update Task' : 'Add Task'}</button>
        <button type="button" className="back-btn" onClick={handleBack}>Back</button>
      </form>
    </div>
    </div>
  );
};

export default AddTask;
