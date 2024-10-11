import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './AddTask.css';

const AddTask = () => {
  const [formData, setFormData] = useState({
    name: '',
    priority: 'Low',
    dueDate: '',
  });
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get('id');

  useEffect(() => {
    if (taskId) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const taskToEdit = storedTasks.find(task => task.id === parseInt(taskId));
      if (taskToEdit) {
        setFormData({
          name: taskToEdit.name,
          priority: taskToEdit.priority,
          dueDate: taskToEdit.dueDate,
        });
      }
    }
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = {
      id: taskId ? parseInt(taskId) : Date.now(),
      name: formData.name,
      priority: formData.priority,
      completed: false,
      dueDate: formData.dueDate,
    };

    if (taskId) {
      const updatedTasks = storedTasks.map(task =>
        task.id === parseInt(taskId) ? newTask : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } else {
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
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              required 
            />
          </div>
          <div>
            <label>Priority:</label>
            <select 
              value={formData.priority} 
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label>Due Date:</label>
            <input 
              type="date" 
              value={formData.dueDate} 
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} 
              required 
            />
          </div>
          <button className="edit-btn" type="submit">{taskId ? 'Update Task' : 'Add Task'}</button>
          <button type="button" className="back-btn" onClick={handleBack}>Back</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
