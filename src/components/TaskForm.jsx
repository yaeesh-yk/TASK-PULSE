import React, { useState, useEffect } from 'react';
import './TaskForm.css';

export default function TaskForm({ isOpen, task, onSubmit, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  const isEditMode = !!task;
  const today = new Date().toISOString().split('T')[0];

  // Sync state with selected task or reset state
  useEffect(() => {
    if (isOpen) {
      if (task) {
        setTitle(task.title || '');
        setDescription(task.description || '');
        setPriority(task.priority || 'Medium');
        setDueDate(task.dueDate || '');
      } else {
        setTitle('');
        setDescription('');
        setPriority('Medium');
        setDueDate('');
      }
      setErrors({});
    }
  }, [task, isOpen]);

  // Handle Escape key close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (dueDate && dueDate < today) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content task-form-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="form-modal-title">
        <div className="form-modal-header">
          <h3 id="form-modal-title">{isEditMode ? 'Edit Task' : 'Add New Task'}</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">
              Title <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              id="task-title"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="e.g. Design homepage layout"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
              }}
              autoFocus
            />
            {errors.title && <span className="error-message" role="alert">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="task-desc" className="form-label">Description</label>
            <textarea
              id="task-desc"
              className="form-textarea"
              placeholder="Provide a brief task description..."
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="task-priority" className="form-label">Priority</label>
              <select
                id="task-priority"
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option style={{color:"black"}} value="Low">Low</option>
                <option style={{color:"black"}} value="Medium">Medium</option>
                <option style={{color:"black"}} value="High">High</option>
              </select>
            </div>

            <div className="form-group col-6">
              <label htmlFor="task-due-date" className="form-label">Due Date</label>
              <input
                type="date"
                id="task-due-date"
                className={`form-input ${errors.dueDate ? 'input-error' : ''}`}
                min={today}
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: '' }));
                }}
              />
              {errors.dueDate && <span className="error-message" role="alert">{errors.dueDate}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary-submit">
              {isEditMode ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
