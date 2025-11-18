import React, { useState, useEffect } from 'react';
import './App.css';
import { Login } from "./components";
import Navbar from "./components/ui/Navbar";

/** Top padding for fixed navbar */
const NAVBAR_HEIGHT = 62; // matches --navbar-height from Navbar.module.css

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

  // Demo: Logo as React node (optional slot)
  const logo = (
    <img src="/logo.svg" alt="" height="30" style={{display:"inline-block"}} />
  );

  // Use fixed Navbar so shift rest of layout down
  const FIXED = true;

  return (
    <div className="App">
      <Navbar
        brand="KaviaApp"
        logo={logo}
        fixed={FIXED}
        // links and other props can be customized by parent if needed
      />
      {/* Theme toggle stays fixed above everything */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        style={{ zIndex: 50, position: "fixed" }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      {/* Spacer for fixed Navbar */}
      {FIXED && <div style={{height: NAVBAR_HEIGHT, minHeight: NAVBAR_HEIGHT}} aria-hidden="true"></div>}
      <Login />
    </div>
  );
}

export default App;
