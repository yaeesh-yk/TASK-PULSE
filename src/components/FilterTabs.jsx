import React from 'react';
import './FilterTabs.css';

export default function FilterTabs({ activeFilter, onFilterChange }) {
  const tabs = [
    { id: 'all', label: 'All Tasks' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div className="filter-tabs-container">
      <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeFilter === tab.id}
            aria-controls="task-list"
            id={`tab-${tab.id}`}
            className={`filter-tab ${activeFilter === tab.id ? 'active' : ''}`}
            onClick={() => onFilterChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
