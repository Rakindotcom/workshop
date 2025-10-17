import { useState, useEffect } from 'react';
import { Users, Calendar, Phone, Mail, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { getAllRegistrations } from '../services/registrationService';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0
  });

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
      
      setStats({ total, confirmed, pending });
      
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'অপেক্ষমাণ' },
      confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'নিশ্চিত' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: Clock, text: 'বাতিল' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="font-anek text-gray-600">রেজিস্ট্রেশন তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-anek text-3xl font-bold text-gray-900 mb-2">
            Workshop Registration Dashboard
          </h1>
          <p className="font-anek text-gray-600">
            Prophetic Productivity Workshop - ২২ অক্টোবর ২০২৫
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
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
        </div>

        {/* Refresh Button */}
        <div className="mb-6">
          <button
            onClick={loadRegistrations}
            className="font-anek inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            রিফ্রেশ করুন
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
                        {getStatusBadge(registration.status)}
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