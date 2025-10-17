import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const AdminAuth = ({ onAuthenticated }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simple authentication - in production, use proper authentication
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'workshop2025'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem('adminAuthenticated', 'true');
      onAuthenticated(true);
    } else {
      setError('ভুল ইউজারনেম বা পাসওয়ার্ড');
    }

    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-blue-600 px-8 py-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-anek text-2xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="font-anek text-sky-100">
              Workshop Registration Management
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="font-anek text-red-800 text-center">{error}</p>
                </div>
              )}

              <div>
                <label className="font-anek block text-gray-700 font-semibold mb-2">
                  ইউজারনেম
                </label>
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                  placeholder="আপনার ইউজারনেম লিখুন"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="font-anek block text-gray-700 font-semibold mb-2">
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 disabled:from-sky-400 disabled:to-blue-400 text-white font-anek text-lg font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    লগইন হচ্ছে...
                  </div>
                ) : (
                  'লগইন করুন'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="font-anek text-gray-600 text-sm text-center mb-2">
                ডেমো ক্রেডেনশিয়াল:
              </p>
              <div className="font-anek text-xs text-gray-500 text-center space-y-1">
                <p>ইউজারনেম: <span className="font-mono bg-gray-200 px-1 rounded">admin</span></p>
                <p>পাসওয়ার্ড: <span className="font-mono bg-gray-200 px-1 rounded">workshop2025</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;