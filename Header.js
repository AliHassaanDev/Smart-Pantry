import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <h1 className="logo">Smart Pantry</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/signUp">Sign Up</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
