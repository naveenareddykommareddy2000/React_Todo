import React,{useState,useEffect} from 'react';
import AddTodoForm from './Component/AddTodoForm';
import TodoList from './Component/TodoList';
function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask=(id,updatedTask)=>{
    setTasks(tasks.map(task=>task.id === id? {...task,...updatedTask}:task))
  }
  return (
    <div className="App">
      <h1>Todo List</h1>
      <AddTodoForm addTask={addTask} />
      <TodoList tasks={tasks} toggleComplete={toggleComplete} removeTask={removeTask}  updateTask={updateTask}/>
    </div>
  );
}

export default App;
