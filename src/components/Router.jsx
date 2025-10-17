import { useState, useEffect } from 'react';
import Workshop from './Workshop';
import AdminDashboard from './AdminDashboard';
import AdminAuth from './AdminAuth';

const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple routing logic
  if (currentPath === '/admin') {
    if (!isAdminAuthenticated) {
      return <AdminAuth onAuthenticated={setIsAdminAuthenticated} />;
    }
    return <AdminDashboard />;
  }

  return <Workshop />;
};

export default Router;