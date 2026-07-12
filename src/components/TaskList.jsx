import React from 'react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import './TaskList.css';

export default function TaskList({ tasks = [], searchQuery = '', activeFilter = 'all', onToggleComplete, onEditClick, onDeleteClick, onClearSearch }) {
  
  // Sort tasks by due date (ascending, closest date first). Tasks without due date are placed at the end.
  const getSortedTasks = (tasksList) => {
    return [...tasksList].sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  };

  const sortedTasks = getSortedTasks(tasks);

  if (sortedTasks.length === 0) {
    const isSearching = searchQuery.trim().length > 0;
    
    let message = "No Tasks Found";
    let subMessage = "Get started by adding a task using the Add Task button above.";
    
    if (isSearching) {
      message = "No Matching Results";
      subMessage = `We couldn't find any tasks matching "${searchQuery}". Try typing something else.`;
    } else if (activeFilter === 'completed') {
      message = "No Completed Tasks";
      subMessage = "You haven't completed any tasks yet. Keep going!";
    } else if (activeFilter === 'pending') {
      message = "All Caught Up!";
      subMessage = "No pending tasks found. Time to relax or create a new task!";
    }

    return (
      <div id="task-list">
        <EmptyState
          message={message}
          subMessage={subMessage}
          showClearButton={isSearching}
          onClearSearch={onClearSearch}
        />
      </div>
    );
  }

  return (
    <div id="task-list" className="task-grid">
      {sortedTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
}
