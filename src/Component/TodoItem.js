import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TodoItem.css';

const TodoItem = ({ task, deleteTask, updateTaskStatus }) => {
  const navigate = useNavigate();

  const editTask = () => {
    navigate(`/edit?id=${task.id}`); 
  };

  return (
    <tr>
      <td>{task.name}</td>
      <td>{task.priority}</td>
      <td>{task.dueDate}</td>
      <td>{task.completed ? 'Complete' : 'Incomplete'}</td>
      <td>
        <label className="switch">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => updateTaskStatus(task.id)}
          />
          <span className="slider round"></span>
        </label>
        <button className='edit' onClick={editTask}>Edit</button>
        <button className='remove' onClick={() => deleteTask(task.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default TodoItem;
