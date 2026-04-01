import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function useThemeSync() {
  useEffect(() => {
    const stored = localStorage.getItem('wapa-theme') || 'light';
    document.body.setAttribute('data-theme', stored);
  }, []);
}

export function App() {
  useThemeSync();

  return <RouterProvider router={router} />;
}
