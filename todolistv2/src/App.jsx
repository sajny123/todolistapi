import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch('/api/v1/todos')
      .then(response => response.json())
      .then(data => setTodos(data))
  }, []);

  const [token, setToken] = useState(null);
  const handleLogin = async () => {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'user', password: 'password' }),
    });
    const data = await response.json();
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('token', data.token);
    }
  };

  useEffect(() => {
    if (token) {
      fetch('/api/v1/todos', {
        headers: { "Authorization": `Bearer ${token}` }
      })
      .then(response => response.json())
      .then(data => setTodos(data));
    }
  }, [token]);

  const [newTodo, setNewTodo] = useState({title: '', description: ''});

  function handleChange(e) {
    setNewTodo({...newTodo, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    setNewTodo({...newTodo, id: Date.now()});
    e.preventDefault();

    fetch('/api/v1/todos', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newTodo)
    })
    .then(response => response.json())
    .then(data => console.log("Todo added", data))
    .catch(error => console.error('Error:', error));   
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="title"
          placeholder="Title"
          value={newTodo.title}
          onChange={handleChange}
          required
        />
        <input 
          type="text"
          name="description"
          placeholder="Description"
          value={newTodo.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      {!token ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
  
}

export default App
