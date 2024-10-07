import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ task, toggleComplete, removeTask,updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updateName, setUpdatedName] = useState(task.name);
  const [updatePriority, setUpdatedPriority] = useState(task.priority);
  const [updatedueDate, setUpdatedDueDate] = useState(task.dueDate);

    const handleUpdate=()=>{
        updateTask(task.id,{name:updateName,priority:updatePriority,dueDate:updatedueDate})
        setIsEditing(false);
    }
    return (
        <div className={`todo-item ${task.completed ? "completed" : ""}`}>
          {isEditing ? (
            <div>
              <input 
                type="text" 
                value={updateName} 
                onChange={(e) => setUpdatedName(e.target.value)} 
              />
              <input 
                type="text" 
                value={updatePriority} 
                onChange={(e) => setUpdatedPriority(e.target.value)} 
              />
              <input 
                type="date" 
                value={updatedueDate} 
                onChange={(e) => setUpdatedDueDate(e.target.value)} 
              />
              <button className="update" onClick={handleUpdate}>Update</button>
              <button className="incomplete" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <>
              <span>{task.name}</span>
              <span>{task.priority} | Due: {task.dueDate}</span>
              <button className="complete" onClick={() => toggleComplete(task.id)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button className="remove" onClick={() => removeTask(task.id)}>Remove</button>
              <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
            </>
          )}
        </div>
      );
}

export default TodoItem;
