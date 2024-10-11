import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All'); 
  const [showFilter, setShowFilter] = useState(false); 
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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Complete') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
    return true; 
  });

  const handleAddTask = () => {
    navigate('/add');
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setShowFilter(false); 
  };

  return (
    <div>
      <h1 className="center-heading">TODO LIST APP</h1>
      <button className='add-task-btn' onClick={handleAddTask}>Add Task</button>
      
      <table className="todo-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>
              <div className="filter-wrapper">
                Status
                <button className="filter-button" onClick={() => setShowFilter(!showFilter)}>
                  &#9660; 
                </button>
                {showFilter && (
                  <div className="filter-dropdown">
                    <div onClick={() => handleFilterChange('All')}>All</div>
                    <div onClick={() => handleFilterChange('Complete')}>Complete</div>
                    <div onClick={() => handleFilterChange('Incomplete')}>Incomplete</div>
                  </div>
                )}
              </div>
            </th>
            <th>Actions</th>
          </tr>
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
