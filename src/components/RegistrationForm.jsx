import { useState } from 'react';
import { Phone, MessageCircle, Star, Clock, Users, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { validateBangladeshiPhone, validateEmail, validateRequired } from '../utils/validation';
import { WORKSHOP_INFO } from '../constants/workshop';
import { submitRegistration } from '../services/registrationService';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    paymentConfirmed: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.fullName)) {
      newErrors.fullName = 'পূর্ণ নাম আবশ্যক';
    }

    if (!validateRequired(formData.whatsapp)) {
      newErrors.whatsapp = 'WhatsApp নম্বর আবশ্যক';
    } else if (!validateBangladeshiPhone(formData.whatsapp)) {
      newErrors.whatsapp = 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন';
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'সঠিক ইমেইল ঠিকানা দিন';
    }

    if (!formData.paymentConfirmed) {
      newErrors.paymentConfirmed = 'পেমেন্ট কনফার্মেশন আবশ্যক';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      // Submit registration to Firestore
      const result = await submitRegistration({
        fullName: formData.fullName.trim(),
        whatsapp: formData.whatsapp.trim(),
        email: formData.email.trim() || null,
        paymentConfirmed: formData.paymentConfirmed,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      });
      
      setSubmitStatus('success');
      setSubmitMessage(result.message);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: '',
          whatsapp: '',
          email: '',
          paymentConfirmed: false
        });
        setSubmitStatus(null);
        setSubmitMessage('');
      }, 5000);

    } catch (error) {
      console.error('Registration failed:', error);
      setSubmitStatus('error');
      setSubmitMessage(error.message || 'রেজিস্ট্রেশনে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-anek text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            রেজিস্ট্রেশন তথ্য
          </h2>
          <p className="font-anek text-gray-600">আপনার আসন নিশ্চিত করুন</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="bg-white border border-blue-300 rounded-xl p-6 shadow-sm">
              <h3 className="font-anek text-xl font-bold text-gray-900 mb-4 text-center">দ্রুত তথ্য</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-blue-700" />
                  <span className="font-anek text-gray-700">ফি: ৯০০ টাকা</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-700" />
                  <span className="font-anek text-gray-700">সময়: বিকাল ৫টা – রাত ৯টা</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-700" />
                  <span className="font-anek text-gray-700">খাবারের ব্যবস্থা রয়েছে</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-blue-300 rounded-xl p-6 shadow-sm">
              <h3 className="font-anek text-lg font-bold text-blue-800 mb-2 text-center">জরুরি নোটিশ</h3>
              <p className="font-anek text-blue-700 text-center">
                আসন সংখ্যা সীমিত! দ্রুত রেজিস্ট্রেশন করুন এবং আপনার স্থান নিশ্চিত করুন।
              </p>
            </div>

            <div className="bg-white border border-blue-300 rounded-xl p-6 text-center shadow-sm">
              <h3 className="font-anek font-semibold text-gray-900 mb-4">যোগাযোগ</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href={`tel:+88${WORKSHOP_INFO.contact.phone}`}
                  className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-300 transform hover:scale-110"
                  title="ফোন করুন"
                >
                  <Phone className="w-6 h-6" />
                </a>
                <a
                  href={WORKSHOP_INFO.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors duration-300 transform hover:scale-110"
                  title="WhatsApp এ মেসেজ করুন"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
              <p className="font-anek text-blue-700 text-sm mt-3">{WORKSHOP_INFO.contact.phone}</p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
            <h3 className="font-anek text-2xl font-bold text-gray-900 mb-6 text-center">
              রেজিস্ট্রেশন ফর্ম
            </h3>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                <div>
                  <p className="font-anek text-green-800 font-medium">
                    {submitMessage || 'রেজিস্ট্রেশন সফল হয়েছে!'}
                  </p>
                  <p className="font-anek text-green-700 text-sm mt-1">
                    আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। আপনার রেজিস্ট্রেশন নম্বর সংরক্ষণ করুন।
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
                <div>
                  <p className="font-anek text-red-800 font-medium">
                    {submitMessage || 'রেজিস্ট্রেশনে সমস্যা হয়েছে।'}
                  </p>
                  <p className="font-anek text-red-700 text-sm mt-1">
                    সমস্যা অব্যাহত থাকলে {WORKSHOP_INFO.contact.phone} নম্বরে যোগাযোগ করুন।
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-anek block text-gray-700 font-semibold mb-2">
                  পূর্ণ নাম *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`font-anek w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <p className="font-anek text-red-600 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="font-anek block text-gray-700 font-semibold mb-2">
                  WhatsApp নম্বর *
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className={`font-anek w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.whatsapp ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="০১৭xxxxxxxx"
                  disabled={isSubmitting}
                />
                {errors.whatsapp && (
                  <p className="font-anek text-red-600 text-sm mt-1">{errors.whatsapp}</p>
                )}
              </div>

              <div>
                <label className="font-anek block text-gray-700 font-semibold mb-2">
                  ইমেইল (ঐচ্ছিক)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`font-anek w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="font-anek text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className={`p-4 bg-gray-50 rounded-lg border ${
                errors.paymentConfirmed ? 'border-red-200 bg-red-50' : 'border-gray-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="paymentConfirmed"
                    checked={formData.paymentConfirmed}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    disabled={isSubmitting}
                  />
                  <div>
                    <label className="font-anek text-gray-700 font-semibold">
                      পেমেন্ট কনফার্মেশন
                    </label>
                    <p className="font-anek text-gray-600 text-sm mt-1">
                      bKash এ পেমেন্ট সম্পন্ন করেছি এবং নিয়মাবলী মেনে নিচ্ছি
                    </p>
                    <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                      <p className="font-anek text-blue-800 font-bold">{WORKSHOP_INFO.payment.bkash}</p>
                      <p className="font-anek text-blue-700 text-sm">{WORKSHOP_INFO.payment.type}</p>
                    </div>
                  </div>
                </div>
                {errors.paymentConfirmed && (
                  <p className="font-anek text-red-600 text-sm mt-2">{errors.paymentConfirmed}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="font-anek w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-800 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>রেজিস্ট্রেশন হচ্ছে...</span>
                  </>
                ) : (
                  <span>আমি অংশগ্রহণ করতে চাই</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;