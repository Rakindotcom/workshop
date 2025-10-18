import { useState, useEffect } from 'react';
import { Users, Calendar, Phone, Mail, CheckCircle, Clock, RefreshCw, Download, Edit3, X, LogOut } from 'lucide-react';
import { getAllRegistrations, updateRegistrationStatus } from '../services/registrationService';
import { logout } from '../services/authService';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0
  });
  const [editingStatus, setEditingStatus] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getAllRegistrations();
      
      // Sort by registration date (newest first)
      const sortedData = data.sort((a, b) => {
        if (a.registrationDate && b.registrationDate) {
          return b.registrationDate.toDate() - a.registrationDate.toDate();
        }
        return 0;
      });
      
      setRegistrations(sortedData);
      
      // Calculate stats
      const total = data.length;
      const confirmed = data.filter(reg => reg.status === 'confirmed').length;
      const pending = data.filter(reg => reg.status === 'pending').length;
      const cancelled = data.filter(reg => reg.status === 'cancelled').length;
      
      setStats({ total, confirmed, pending, cancelled });
      
    } catch (err) {
      console.error('Error loading registrations:', err);
      
      // Handle specific Firebase errors
      if (err.code === 'permission-denied') {
        setError('আপনার এই ডেটা দেখার অনুমতি নেই। অনুগ্রহ করে এডমিন এর সাথে যোগাযোগ করুন।');
      } else if (err.code === 'unavailable') {
        setError('ডেটাবেস সংযোগে সমস্যা। কিছুক্ষণ পর আবার চেষ্টা করুন।');
      } else {
        setError(err.message || 'রেজিস্ট্রেশন তথ্য লোড করতে সমস্যা হয়েছে।');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      return timestamp.toDate().toLocaleString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const handleStatusUpdate = async (registrationId, newStatus) => {
    try {
      setUpdatingStatus(true);
      setError(null);
      
      await updateRegistrationStatus(registrationId, newStatus);
      
      // Update local state
      setRegistrations(prev => 
        prev.map(reg => 
          reg.id === registrationId 
            ? { ...reg, status: newStatus }
            : reg
        )
      );
      
      setEditingStatus(null);
      
      // Recalculate stats
      const updatedRegs = registrations.map(reg => 
        reg.id === registrationId ? { ...reg, status: newStatus } : reg
      );
      const total = updatedRegs.length;
      const confirmed = updatedRegs.filter(reg => reg.status === 'confirmed').length;
      const pending = updatedRegs.filter(reg => reg.status === 'pending').length;
      const cancelled = updatedRegs.filter(reg => reg.status === 'cancelled').length;
      setStats({ total, confirmed, pending, cancelled });
      
      // Show success message
      setSuccessMessage('স্ট্যাটাস সফলভাবে আপডেট হয়েছে!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (error) {
      console.error('Status update error:', error);
      setError(error.message || 'স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে।');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingStatus(null);
    setError(null);
  };

  // Filter registrations based on active tab
  const getFilteredRegistrations = () => {
    if (activeTab === 'all') return registrations;
    return registrations.filter(reg => reg.status === activeTab);
  };

  const exportToExcel = () => {
    const filteredData = getFilteredRegistrations();
    
    // Create Excel content with proper formatting
    const headers = ['নাম', 'হোয়াটসঅ্যাপ', 'পেমেন্ট সোর্স', 'স্ট্যাটাস', 'পেমেন্ট নিশ্চিত', 'রেজিস্ট্রেশনের সময়'];
    
    // Create HTML table for Excel
    let excelContent = `
      <table border="1">
        <thead>
          <tr>
            ${headers.map(header => `<th style="background-color: #f0f0f0; font-weight: bold; padding: 8px;">${header}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${filteredData.map(reg => `
            <tr>
              <td style="padding: 8px;">${reg.fullName}</td>
              <td style="padding: 8px;">${reg.whatsapp}</td>
              <td style="padding: 8px;">${reg.email || 'N/A'}</td>
              <td style="padding: 8px;">${reg.status === 'pending' ? 'অপেক্ষমাণ' : reg.status === 'confirmed' ? 'নিশ্চিত' : 'বাতিল'}</td>
              <td style="padding: 8px;">${reg.paymentConfirmed ? 'হ্যাঁ' : 'না'}</td>
              <td style="padding: 8px;">${formatDate(reg.registrationDate)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    const tabName = activeTab === 'all' ? 'সব' : activeTab === 'pending' ? 'অপেক্ষমাণ' : activeTab === 'confirmed' ? 'নিশ্চিত' : 'বাতিল';
    link.setAttribute('download', `workshop-registrations-${tabName}-${new Date().toISOString().split('T')[0]}.xls`);
    
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status, registrationId) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'অপেক্ষমাণ' },
      confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'নিশ্চিত' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: X, text: 'বাতিল' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    if (editingStatus === registrationId) {
      return (
        <div className="flex items-center space-x-2">
          <select
            value={status}
            onChange={(e) => {
              if (e.target.value !== status) {
                handleStatusUpdate(registrationId, e.target.value);
              }
            }}
            disabled={updatingStatus}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500 font-anek"
          >
            <option value="pending">অপেক্ষমাণ</option>
            <option value="confirmed">নিশ্চিত</option>
            <option value="cancelled">বাতিল</option>
          </select>
          <button
            onClick={handleCancelEdit}
            disabled={updatingStatus}
            className="text-gray-400 hover:text-red-600 disabled:opacity-50"
            title="বাতিল করুন"
          >
            <X className="w-4 h-4" />
          </button>
          {updatingStatus && (
            <div className="w-4 h-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-anek ${config.color}`}>
          <Icon className="w-3 h-3 mr-1" />
          {config.text}
        </span>
        <button
          onClick={() => setEditingStatus(registrationId)}
          className="text-gray-400 hover:text-sky-600 transition-colors duration-200"
          title="স্ট্যাটাস পরিবর্তন করুন"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-anek text-lg text-gray-700 font-medium">রেজিস্ট্রেশন তথ্য লোড হচ্ছে...</p>
          <p className="font-anek text-gray-500 mt-2">অনুগ্রহ করে অপেক্ষা করুন</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="font-anek text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                      Workshop Registration Dashboard
                    </h1>
                    <p className="font-anek text-gray-600 text-sm sm:text-base">
                      Prophetic Productivity Workshop - ২২ অক্টোবর ২০২৫
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="font-anek">লাইভ ড্যাশবোর্ড</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="font-anek">{new Date().toLocaleDateString('bn-BD')}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await logout();
                    window.location.reload();
                  } catch (error) {
                    console.error('Logout error:', error);
                    window.location.reload();
                  }
                }}
                className="font-anek inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300 self-start"
              >
                <LogOut className="w-4 h-4 mr-2" />
                লগআউট
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <p className="font-anek text-2xl sm:text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
            <p className="font-anek text-sm sm:text-base font-semibold text-gray-700">মোট রেজিস্ট্রেশন</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <p className="font-anek text-2xl sm:text-3xl font-bold text-gray-900">{stats.confirmed}</p>
              </div>
            </div>
            <p className="font-anek text-sm sm:text-base font-semibold text-gray-700">নিশ্চিত</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <p className="font-anek text-2xl sm:text-3xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
            <p className="font-anek text-sm sm:text-base font-semibold text-gray-700">অপেক্ষমাণ</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <X className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <p className="font-anek text-2xl sm:text-3xl font-bold text-gray-900">{stats.cancelled}</p>
              </div>
            </div>
            <p className="font-anek text-sm sm:text-base font-semibold text-gray-700">বাতিল</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-md p-1">
            <nav className="grid grid-cols-2 sm:grid-cols-4 gap-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`py-2 px-3 rounded-md font-medium text-xs sm:text-sm font-anek transition-all duration-300 ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">সব</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    activeTab === 'all' ? 'bg-white/20' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {stats.total}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-2 px-3 rounded-md font-medium text-xs sm:text-sm font-anek transition-all duration-300 ${
                  activeTab === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className="hidden sm:inline">অপেক্ষমাণ</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    activeTab === 'pending' ? 'bg-white/20' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {stats.pending}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('confirmed')}
                className={`py-2 px-3 rounded-md font-medium text-xs sm:text-sm font-anek transition-all duration-300 ${
                  activeTab === 'confirmed'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">নিশ্চিত</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    activeTab === 'confirmed' ? 'bg-white/20' : 'bg-green-100 text-green-600'
                  }`}>
                    {stats.confirmed}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`py-2 px-3 rounded-md font-medium text-xs sm:text-sm font-anek transition-all duration-300 ${
                  activeTab === 'cancelled'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">বাতিল</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    activeTab === 'cancelled' ? 'bg-white/20' : 'bg-red-100 text-red-600'
                  }`}>
                    {stats.cancelled}
                  </span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={loadRegistrations}
            disabled={loading}
            className="font-anek inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-300"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            রিফ্রেশ করুন
          </button>
          
          <button
            onClick={exportToExcel}
            disabled={getFilteredRegistrations().length === 0}
            className="font-anek inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-lg transition-colors duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Excel এক্সপোর্ট করুন
          </button>
          
          <div className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 bg-white rounded-lg border">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-anek text-gray-700 font-medium text-sm">
              {getFilteredRegistrations().length} টি রেকর্ড
            </span>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-anek text-green-800 flex items-center text-sm sm:text-base">
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              {successMessage}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-anek text-red-800 flex items-center text-sm sm:text-base">
              <X className="w-5 h-5 mr-2 flex-shrink-0" />
              {error}
            </p>
          </div>
        )}

        {/* Registrations Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <h2 className="font-anek text-lg sm:text-xl font-bold text-gray-900">
                  রেজিস্ট্রেশন তালিকা
                </h2>
                <p className="font-anek text-gray-600 text-sm">
                  {activeTab === 'all' ? 'সব' : activeTab === 'pending' ? 'অপেক্ষমাণ' : activeTab === 'confirmed' ? 'নিশ্চিত' : 'বাতিল'} রেজিস্ট্রেশন ({getFilteredRegistrations().length} টি)
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeTab === 'all' ? 'bg-blue-100 text-blue-700' :
                activeTab === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                activeTab === 'confirmed' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {getFilteredRegistrations().length} টি এন্ট্রি
              </div>
            </div>
          </div>

          {getFilteredRegistrations().length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-anek text-lg font-semibold text-gray-700 mb-2">
                কোনো ডেটা পাওয়া যায়নি
              </h3>
              <p className="font-anek text-gray-500 text-sm sm:text-base">
                {activeTab === 'all' ? 'এখনো কোনো রেজিস্ট্রেশন নেই।' : 
                 activeTab === 'pending' ? 'কোনো অপেক্ষমাণ রেজিস্ট্রেশন নেই।' :
                 activeTab === 'confirmed' ? 'কোনো নিশ্চিত রেজিস্ট্রেশন নেই।' :
                 'কোনো বাতিল রেজিস্ট্রেশন নেই।'}
              </p>
              <button
                onClick={loadRegistrations}
                className="mt-4 font-anek inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                রিফ্রেশ করুন
              </button>
            </div>
          ) : (
            <div>
              {/* Mobile Card View */}
              <div className="block sm:hidden">
                <div className="space-y-4 p-4">
                  {getFilteredRegistrations().map((registration) => (
                    <div key={registration.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {registration.fullName.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="font-anek font-semibold text-gray-900">
                            {registration.fullName}
                          </div>
                          <div className="font-anek text-sm text-gray-500 flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {registration.whatsapp}
                          </div>
                        </div>
                        {getStatusBadge(registration.status, registration.id)}
                      </div>
                      
                      {registration.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="bg-white px-2 py-1 rounded text-xs">
                            {registration.email}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="font-anek">{formatDate(registration.registrationDate)}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium font-anek ${
                          registration.paymentConfirmed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {registration.paymentConfirmed ? 'নিশ্চিত' : 'অনিশ্চিত'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left font-anek text-sm font-bold text-gray-700">
                      নাম ও তথ্য
                    </th>
                    <th className="px-6 py-3 text-left font-anek text-sm font-bold text-gray-700">
                      যোগাযোগ
                    </th>
                    <th className="px-6 py-3 text-left font-anek text-sm font-bold text-gray-700">
                      স্ট্যাটাস
                    </th>
                    <th className="px-6 py-3 text-left font-anek text-sm font-bold text-gray-700">
                      রেজিস্ট্রেশনের সময়
                    </th>
                    <th className="px-6 py-3 text-left font-anek text-sm font-bold text-gray-700">
                      পেমেন্ট
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {getFilteredRegistrations().map((registration) => (
                    <tr key={registration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {registration.fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-anek font-semibold text-gray-900">
                              {registration.fullName}
                            </div>
                            {registration.email && (
                              <div className="font-anek text-sm text-gray-500">
                                {registration.email}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-anek text-gray-900 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-green-600" />
                          {registration.whatsapp}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(registration.status, registration.id)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-anek text-gray-900 flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                          {formatDate(registration.registrationDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium font-anek ${
                          registration.paymentConfirmed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {registration.paymentConfirmed ? 'নিশ্চিত' : 'অনিশ্চিত'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;