import React, { useState, useEffect } from 'react';
import './App.css';
import { Login } from "./components";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        style={{ zIndex: 50, position: "fixed" }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <Login />
    </div>
  );
}

export default App;
