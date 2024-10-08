import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TodoList from './Component/TodoList';
import AddTask from './Component/AddTask';

function App() {
  return ( 
      <div>
        <Routes>
            <Route path="/" element={<TodoList />} />
          <Route path="/add" element={<AddTask />} />
        </Routes>
      </div>
   
  );
}

export default App;
