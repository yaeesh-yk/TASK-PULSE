import React from 'react';
import './TaskCard.css';

export default function TaskCard({ task, onToggleComplete, onEditClick, onDeleteClick }) {
  const { id, title, description, priority, dueDate, completed } = task;

  const getPriorityClass = () => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No due date';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Check if task is overdue
  const isOverdue = () => {
    if (completed || !dueDate) return false;
    const todayStr = new Date().toISOString().split('T')[0];
    return dueDate < todayStr;
  };

  return (
    <article className={`task-card ${completed ? 'completed-card' : ''} ${isOverdue() ? 'overdue-card' : ''}`} aria-label={`Task: ${title}`}>
      <div className="task-card-header">
        <div className="task-checkbox-container">
          <input
            type="checkbox"
            className="task-checkbox"
            checked={completed}
            onChange={() => onToggleComplete(id)}
            id={`chk-${id}`}
            aria-label={`Toggle complete for task: ${title}`}
          />
          <span className="task-checkbox-custom"></span>
        </div>
        <h4 className="task-card-title" id={`title-${id}`}>
          {title}
        </h4>
      </div>

      {description && <p className="task-card-description">{description}</p>}

      <div className="task-card-meta">
        <span className={`priority-badge ${getPriorityClass()}`}>
          {priority}
        </span>
        <div className={`due-date-display ${isOverdue() ? 'overdue-text' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>{formatDate(dueDate)}</span>
          {isOverdue() && <span className="overdue-tag">Overdue</span>}
        </div>
      </div>

      <div className="task-card-actions">
        <button className="card-btn edit-btn" onClick={() => onEditClick(task)} aria-label={`Edit task: ${title}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          <span>Edit</span>
        </button>
        <button className="card-btn delete-btn" onClick={() => onDeleteClick(task)} aria-label={`Delete task: ${title}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
}
