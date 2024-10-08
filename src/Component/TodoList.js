import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem';
import { FaCaretDown } from 'react-icons/fa'; 
import './TodoList.css';


const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const updateTaskStatus = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'Complete') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
    return true; // Show all tasks
  });

  const handleAddTask = () => {
    navigate('/add'); // Navigate to AddTask page
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setShowFilterOptions(false); // Close filter options after selection
  };

  return (
    <div>
      <h1>TODO LIST APP</h1>
      <button className='add-task-btn' onClick={handleAddTask}>Add Task</button> 
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th style={{ cursor: 'pointer' }} onClick={() => setShowFilterOptions(!showFilterOptions)}>
              Status <FaCaretDown /> 
            </th>
            <th>Actions</th>
          </tr>
         
          {showFilterOptions && (
            <tr>
              <td colSpan="5" style={{ padding: '5px', position: 'absolute', background: 'white', zIndex: 10 }}>
                <div className="filter-dropdown">
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    <li onClick={() => handleFilterChange('All')}>All</li>
                    <li onClick={() => handleFilterChange('Complete')}>Complete</li>
                    <li onClick={() => handleFilterChange('Incomplete')}>Incomplete</li>
                  </ul>
                </div>
              </td>
            </tr>
          )}
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTaskStatus={updateTaskStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
