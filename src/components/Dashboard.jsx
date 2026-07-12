import React from 'react';
import './Dashboard.css';

export default function Dashboard({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <section className="dashboard" aria-label="Dashboard Stats">
      <div className="stat-card total-card">
        <div className="stat-icon-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </div>
        <div className="stat-info">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{total}</span>
        </div>
      </div>

      <div className="stat-card completed-card">
        <div className="stat-icon-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div className="stat-info">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{completed}</span>
        </div>
      </div>

      <div className="stat-card pending-card">
        <div className="stat-icon-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div className="stat-info">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{pending}</span>
        </div>
      </div>
    </section>
  );
}
