import React,{useState} from 'react';
 function AddTodoForm({addTask}){
    const [taskName,setTaskName]=useState("");
    const [dueDate,setdueDate]=useState("");
    const [priority,setPriority]=useState("Low");

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!taskName) return;
        addTask({name:taskName,dueDate,priority});
        setTaskName("");
        setdueDate("");
        setPriority("Low");       
    };
    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            value={taskName}
            onChange={(e)=>setTaskName(e.target.value)}
            placeholder="New Task"/>

            <input 
            type="date"
            value={dueDate}
            onChange={(e)=>setdueDate(e.target.value)}/>

            <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button className="add-task">Add Task</button>
        </form>
    )
 }
 export default AddTodoForm;