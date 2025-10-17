import { useState, useEffect } from 'react';
import { Users, Calendar, Phone, Mail, CheckCircle, Clock, RefreshCw, Download, Edit3, X, LogOut } from 'lucide-react';
import { getAllRegistrations, updateRegistrationStatus } from '../services/registrationService';

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
      setError('রেজিস্ট্রেশন তথ্য লোড করতে সমস্যা হয়েছে।');
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
      
    } catch (error) {
      setError('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে।');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['নাম', 'হোয়াটসঅ্যাপ', 'পেমেন্ট সোর্স', 'স্ট্যাটাস', 'পেমেন্ট নিশ্চিত', 'রেজিস্ট্রেশনের সময়'];
    const csvContent = [
      headers.join(','),
      ...registrations.map(reg => [
        `"${reg.fullName}"`,
        `"${reg.whatsapp}"`,
        `"${reg.email || 'N/A'}"`,
        `"${reg.status}"`,
        `"${reg.paymentConfirmed ? 'হ্যাঁ' : 'না'}"`,
        `"${formatDate(reg.registrationDate)}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `workshop-registrations-${new Date().toISOString().split('T')[0]}.csv`);
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
            onChange={(e) => handleStatusUpdate(registrationId, e.target.value)}
            disabled={updatingStatus}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="pending">অপেক্ষমাণ</option>
            <option value="confirmed">নিশ্চিত</option>
            <option value="cancelled">বাতিল</option>
          </select>
          <button
            onClick={() => setEditingStatus(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
          <Icon className="w-3 h-3 mr-1" />
          {config.text}
        </span>
        <button
          onClick={() => setEditingStatus(registrationId)}
          className="text-gray-400 hover:text-sky-600"
        >
          <Edit3 className="w-3 h-3" />
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-sky-600 mx-auto mb-4" />
          <p className="font-anek text-gray-600">রেজিস্ট্রেশন তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="font-anek text-3xl font-bold text-gray-900 mb-2">
              Workshop Registration Dashboard
            </h1>
            <p className="font-anek text-gray-600">
              Prophetic Productivity Workshop - ২২ অক্টোবর ২০২৫
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('adminAuthenticated');
              window.location.reload();
            }}
            className="font-anek inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            লগআউট
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-sky-600" />
              <div className="ml-4">
                <p className="font-anek text-base font-medium text-gray-600">মোট রেজিস্ট্রেশন</p>
                <p className="font-anek text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="font-anek text-base font-medium text-gray-600">নিশ্চিত</p>
                <p className="font-anek text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="font-anek text-base font-medium text-gray-600">অপেক্ষমাণ</p>
                <p className="font-anek text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <X className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="font-anek text-base font-medium text-gray-600">বাতিল</p>
                <p className="font-anek text-2xl font-bold text-gray-900">{stats.cancelled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={loadRegistrations}
            disabled={loading}
            className="font-anek inline-flex items-center px-4 py-2 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-medium rounded-lg transition-colors duration-300"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            রিফ্রেশ করুন
          </button>
          
          <button
            onClick={exportToCSV}
            disabled={registrations.length === 0}
            className="font-anek inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-lg transition-colors duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            CSV এক্সপোর্ট করুন
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-anek text-red-800">{error}</p>
          </div>
        )}

        {/* Registrations Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-anek text-lg font-semibold text-gray-900">
              রেজিস্ট্রেশন তালিকা ({registrations.length})
            </h2>
          </div>

          {registrations.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="font-anek text-gray-600">এখনো কোনো রেজিস্ট্রেশন নেই।</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      নাম
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      যোগাযোগ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      স্ট্যাটাস
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      রেজিস্ট্রেশনের সময়
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      পেমেন্ট
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registrations.map((registration) => (
                    <tr key={registration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-anek font-medium text-gray-900">
                          {registration.fullName}
                        </div>
                        {registration.email && (
                          <div className="font-anek text-base text-gray-500 flex items-center mt-1">
                            <Mail className="w-3 h-3 mr-1" />
                            {registration.email}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-anek text-base text-gray-900 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {registration.whatsapp}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(registration.status, registration.id)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-anek text-base text-gray-900 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(registration.registrationDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;