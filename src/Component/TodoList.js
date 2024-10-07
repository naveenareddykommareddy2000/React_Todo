import React,{useState} from 'react';
import TodoItem from "./TodoItem";
import './TodoList.css';

 function TodoList({tasks,toggleComplete,removeTask,updateTask}){
    const [filter,setFilter] = useState('All');

    const filteredTasks=tasks.filter(task=>{
      if(filter==='Completed') return task.completed;
      if(filter === 'Incomplete') return !task.completed;
      return true;
    })
  
    return (
        <div>
         
            <button className="filter-all" onClick={()=>setFilter('All')}>All</button>
            <button className="filter-complete" onClick={()=>setFilter('Completed')}>Completed</button>
            <button className="filter-incomplete" onClick={()=>setFilter('Incomplete')}>Incomplete</button>
            {filteredTasks.map(task=>(
                <TodoItem
                key={task.id}
                task={task}
                toggleComplete={toggleComplete}
                removeTask={removeTask}
                updateTask={updateTask}/>
            ))}
        </div>
    )
}

export default TodoList;