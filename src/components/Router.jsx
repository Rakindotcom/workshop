import { useState, useEffect } from 'react';
import Workshop from './Workshop';
import AdminDashboard from './AdminDashboard';

const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple routing logic
  if (currentPath === '/admin') {
    return <AdminDashboard />;
  }

  return <Workshop />;
};

export default Router;