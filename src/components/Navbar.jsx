import React from 'react';
import './Navbar.css';

export default function Navbar({ onAddTaskClick }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <h1 className="logo-text">TaskPulse</h1>
      </div>
      <button className="add-task-btn" onClick={onAddTaskClick} aria-label="Add a new task">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>Add Task</span>
      </button>
    </header>
  );
}
