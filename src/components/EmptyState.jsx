import React from 'react';
import './EmptyState.css';

export default function EmptyState({ message, subMessage, onClearSearch, showClearButton }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="16"></line>
        </svg>
      </div>
      <h3 className="empty-state-title">{message || "No Tasks Found"}</h3>
      <p className="empty-state-description">{subMessage || "Get started by adding a task using the Add Task button above."}</p>
      {showClearButton && (
        <button className="clear-filters-btn" onClick={onClearSearch}>
          Clear Search Query
        </button>
      )}
    </div>
  );
}
