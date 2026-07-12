import { useState, useEffect } from 'react';

/**
 * Custom hook to sync state with localStorage.
 * @param {string} key - The localStorage key.
 * @param {any} initialValue - The initial state value if key doesn't exist.
 * @returns {[any, Function]} - The stateful value and a function to update it.
 */
export default function useLocalStorage(key, initialValue) {
  // Retrieve initial state from localStorage or use initialValue
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Sync state changes with localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
