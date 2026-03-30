"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Initialize from localStorage or fall back to initialValue.
  // During SSR, always use initialValue.
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Sync to localStorage whenever storedValue changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Storage full or blocked -- fail silently
    }
  }, [key, storedValue]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleStorageChange(event: StorageEvent) {
      if (event.key !== key) return;

      try {
        const newValue =
          event.newValue !== null
            ? (JSON.parse(event.newValue) as T)
            : initialValue;
        setStoredValue(newValue);
      } catch {
        // Ignore malformed JSON from other tabs
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  // Setter that accepts a value or updater function
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue =
          value instanceof Function ? value(prev) : value;
        return nextValue;
      });
    },
    []
  );

  // Remove the key entirely from localStorage
  const removeValue = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // fail silently
      }
    }
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
