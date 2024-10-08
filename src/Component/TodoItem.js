import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TodoItem.css';

const TodoItem = ({ task, deleteTask, updateTaskStatus }) => {
  const navigate = useNavigate();

  const editTask = () => {
    navigate('/add', { state: task }); 
  };

  return (
    <tr>
      <td>{task.name}</td>
      <td>{task.priority}</td>
      <td>{task.dueDate}</td>
      <td>{task.completed ? 'Complete' : 'Incomplete'}</td>
      <td>
        <button className='update' onClick={() => updateTaskStatus(task.id)}>
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button className='edit' onClick={editTask}>Edit</button>
        <button className='remove' onClick={() => deleteTask(task.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default TodoItem;
