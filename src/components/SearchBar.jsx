import React from 'react';
import './SearchBar.css';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-container">
      <div className="search-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks by title"
      />
      {value && (
        <button className="clear-search-btn" onClick={() => onChange('')} aria-label="Clear search query">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
}
