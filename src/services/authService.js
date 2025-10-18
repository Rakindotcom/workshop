import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export const authenticateAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        role: 'admin'
      }
    };
  } catch (error) {
    console.error('Authentication error:', error);
    
    // Handle specific Firebase Auth errors
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        throw new Error('ভুল ইমেইল বা পাসওয়ার্ড');
      case 'auth/too-many-requests':
        throw new Error('অনেকবার ভুল চেষ্টা। কিছুক্ষণ পর আবার চেষ্টা করুন');
      case 'auth/network-request-failed':
        throw new Error('ইন্টারনেট সংযোগ চেক করুন');
      default:
        throw new Error(error.message || 'লগইন করতে সমস্যা হয়েছে');
    }
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('লগআউট করতে সমস্যা হয়েছে');
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const isAuthenticated = () => {
  return !!auth.currentUser;
};

// Listen to authentication state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({ authenticated: true, user });
    } else {
      callback({ authenticated: false, user: null });
    }
  });
};