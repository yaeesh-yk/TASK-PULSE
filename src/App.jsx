import React, { useState, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ConfirmModal from './components/ConfirmModal';
import './App.css';

export default function App() {
  // Persistence state for tasks
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // UI / Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Form Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Delete Confirm Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);

  // Filter tasks based on active tab and search query
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Filter by tab status
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'completed' && task.completed) ||
        (activeFilter === 'pending' && !task.completed);

      // 2. Filter by search query (case-insensitive title match)
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [tasks, activeFilter, searchQuery]);

  // Open form modal for adding a new task
  const handleAddTaskClick = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  // Open form modal for editing an existing task
  const handleEditTaskClick = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  // Open confirmation modal for deleting a task
  const handleDeleteTaskClick = (task) => {
    setDeletingTask(task);
    setIsConfirmOpen(true);
  };

  // Toggle completion state of a task
  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle addition or modification of a task from TaskForm
  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      // Edit Mode
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...taskData } : task
        )
      );
    } else {
      // Add Mode
      const newTask = {
        id: Date.now().toString(), // unique id
        ...taskData,
        completed: false,
      };
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  // Handle final deletion of a task
  const handleDeleteConfirm = () => {
    if (deletingTask) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deletingTask.id));
      setIsConfirmOpen(false);
      setDeletingTask(null);
    }
  };

  // Cancel deletion
  const handleDeleteCancel = () => {
    setIsConfirmOpen(false);
    setDeletingTask(null);
  };

  return (
    <div className="app-container">
      <Navbar onAddTaskClick={handleAddTaskClick} />
      
      <main>
        {/* Live Dashboard stats pass global tasks */}
        <Dashboard tasks={tasks} />

        <div className="search-filter-controls">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        {/* Task List displays filtered and sorted tasks */}
        <TaskList
          tasks={filteredTasks}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
          onToggleComplete={handleToggleComplete}
          onEditClick={handleEditTaskClick}
          onDeleteClick={handleDeleteTaskClick}
          onClearSearch={() => setSearchQuery('')}
        />
      </main>

      {/* Add / Edit Modal Form */}
      <TaskForm
        isOpen={isFormOpen}
        task={editingTask}
        onSubmit={handleFormSubmit}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        task={deletingTask}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
