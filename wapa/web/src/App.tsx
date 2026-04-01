import { useEffect } from 'react';
import WhatsAppDemo from './components/whatsapp/WhatsAppDemo';

function useThemeSync() {
  useEffect(() => {
    const stored = localStorage.getItem('wapa-theme') || 'light';
    document.documentElement.setAttribute('data-theme', stored);
  }, []);
}

export function App() {
  useThemeSync();
  return <WhatsAppDemo />;
}
