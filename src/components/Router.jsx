import { useState, useEffect } from 'react';
import Workshop from './Workshop';
import AdminDashboard from './AdminDashboard';
import AdminAuth from './AdminAuth';
import { onAuthStateChange } from '../services/authService';

const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen to Firebase Auth state changes
    const unsubscribe = onAuthStateChange(({ authenticated }) => {
      setIsAdminAuthenticated(authenticated);
      setAuthLoading(false);
    });

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      unsubscribe();
    };
  }, []);

  // Show loading while checking auth state
  if (authLoading && currentPath === '/admin') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-anek text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

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