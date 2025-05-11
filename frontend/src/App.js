import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`);
        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [API_URL]);

  // Add task
  const addTask = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      });
      
      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
      setTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Toggle completion
  const toggleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === id);
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });
      
      setTasks(tasks.map(task => 
        task._id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
      </header>
      
      <main>
        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add new task..."
          />
          <button type="submit">Add</button>
        </form>
        
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <ul className="task-list">
            {tasks.length === 0 ? (
              <p>No tasks yet. Add one above!</p>
            ) : (
              tasks.map(task => (
                <li key={task._id} className={task.completed ? 'completed' : ''}>
                  <span onClick={() => toggleComplete(task._id)}>
                    {task.title}
                  </span>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </li>
              ))
            )}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
