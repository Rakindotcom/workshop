// Simple authentication service
// In production, use Firebase Auth or other secure authentication

const ADMIN_USERS = [
  {
    username: 'admin',
    password: 'workshop2025', // In production, use hashed passwords
    role: 'admin'
  },
  {
    username: 'jahid',
    password: 'divine2025',
    role: 'admin'
  }
];

export const authenticateAdmin = async (username, password) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = ADMIN_USERS.find(
    u => u.username === username && u.password === password
  );
  
  if (user) {
    const token = btoa(JSON.stringify({ 
      username: user.username, 
      role: user.role, 
      timestamp: Date.now() 
    }));
    
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminAuthenticated', 'true');
    
    return {
      success: true,
      user: {
        username: user.username,
        role: user.role
      },
      token
    };
  }
  
  throw new Error('ভুল ইউজারনেম বা পাসওয়ার্ড');
};

export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminAuthenticated');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  const authenticated = localStorage.getItem('adminAuthenticated');
  
  if (!token || authenticated !== 'true') {
    return false;
  }
  
  try {
    const decoded = JSON.parse(atob(token));
    // Check if token is less than 24 hours old
    const isValid = (Date.now() - decoded.timestamp) < (24 * 60 * 60 * 1000);
    
    if (!isValid) {
      logout();
      return false;
    }
    
    return true;
  } catch (error) {
    logout();
    return false;
  }
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) return null;
  
  try {
    const decoded = JSON.parse(atob(token));
    return {
      username: decoded.username,
      role: decoded.role
    };
  } catch (error) {
    return null;
  }
};