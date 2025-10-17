import { useState } from 'react';
import { Phone, MessageCircle, Star, Clock, Users, CheckCircle, AlertCircle, Loader, MessageSquare } from 'lucide-react';
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
    <section id="registration" className="cool-form py-12 px-4 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Floating Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full floating-element"></div>
        <div className="absolute top-24 right-12 w-12 h-12 bg-white/10 rounded-full floating-element" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-16 left-16 w-10 h-10 bg-white/10 rounded-full floating-element" style={{animationDelay: '4s'}}></div>

        <div className="text-center mb-8">
          <h2 className="font-anek text-3xl md:text-4xl font-bold text-white mb-3">
            রেজিস্ট্রেশন করুন
          </h2>
          <p className="font-anek text-white/80 text-base mb-4">আসন সীমিত! আজই নিশ্চিত করুন আপনার স্থান</p>
          
          <div className="glass-card inline-flex items-center px-4 py-2 rounded-lg pulse-glow">
            <span className="font-anek font-bold text-white text-base">আর্লি বার্ড অফার: মাত্র ৯০০ টাকা</span>
            <span className="ml-2 bg-white/20 px-2 py-1 rounded text-white text-base">সাধারণ মূল্য: ১৫০০ টাকা</span>
          </div>
        </div>

        {/* Cool Registration Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Event Info Sidebar */}
          <div className="space-y-4">
            <div className="glass-card rounded-lg p-4">
              <h3 className="font-anek text-base font-bold text-white mb-3">ইভেন্ট তথ্য</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-blue-300" />
                  <span className="font-anek text-white text-base">৯০০ টাকা মাত্র</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-300" />
                  <span className="font-anek text-white text-base">৪ ঘন্টা</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-300" />
                  <span className="font-anek text-white text-base">খাবার + সার্টিফিকেট</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-lg p-4">
              <h3 className="font-anek font-semibold mb-3 text-white text-lg">সাহায্য প্রয়োজন?</h3>
              <div className="flex justify-center mb-3">
                <a
                  href={WORKSHOP_INFO.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 glass-card hover:bg-green-500/20 text-green-300 rounded-lg transition-colors duration-300 border border-green-400/30"
                  title="WhatsApp এ মেসেজ করুন"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                </a>
              </div>
              <div className="text-center">
                <p className="font-anek text-white text-lg font-bold mb-1">সীমিত সময়ের অফার!</p>
                <p className="font-anek text-white text-lg">মাত্র ৩০টি আসন বাকি</p>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2 glass-card rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-white/20 to-white/10 px-6 py-4 border-b border-white/20">
            <h3 className="font-anek text-xl font-bold text-white mb-1">
              রেজিস্ট্রেশন ফর্ম
            </h3>
            <p className="font-anek text-white/80 text-base">
              নিচের তথ্যগুলো পূরণ করে আপনার আসন নিশ্চিত করুন
            </p>
          </div>

          <div className="p-6">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 glass-card rounded-lg flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400 mt-0.5" />
                <div>
                  <p className="font-anek text-white font-medium">
                    {submitMessage || 'রেজিস্ট্রেশন সফল হয়েছে!'}
                  </p>
                  <p className="font-anek text-white/80 text-base mt-1">
                    আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। আপনার রেজিস্ট্রেশন নম্বর সংরক্ষণ করুন।
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 glass-card rounded-lg flex items-start space-x-3 border-red-400/50">
                <AlertCircle className="w-6 h-6 text-red-400 mt-0.5" />
                <div>
                  <p className="font-anek text-white font-medium">
                    {submitMessage || 'রেজিস্ট্রেশনে সমস্যা হয়েছে।'}
                  </p>
                  <p className="font-anek text-white/80 text-base mt-1">
                    সমস্যা অব্যাহত থাকলে {WORKSHOP_INFO.contact.phone} নম্বরে যোগাযোগ করুন।
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-anek block text-white font-semibold mb-2">
                  পূর্ণ নাম *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`cool-input font-anek w-full p-2.5 rounded-lg ${
                    errors.fullName ? 'border-red-400' : ''
                  }`}
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <p className="font-anek text-red-300 text-base mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="font-anek block text-white font-semibold mb-2">
                  WhatsApp নম্বর *
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className={`cool-input font-anek w-full p-2.5 rounded-lg ${
                    errors.whatsapp ? 'border-red-400' : ''
                  }`}
                  placeholder="০১৭xxxxxxxx"
                  disabled={isSubmitting}
                />
                {errors.whatsapp && (
                  <p className="font-anek text-red-300 text-base mt-1">{errors.whatsapp}</p>
                )}
              </div>

              <div>
                <label className="font-anek block text-white font-semibold mb-2">
                  ইমেইল (ঐচ্ছিক)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`cool-input font-anek w-full p-2.5 rounded-lg ${
                    errors.email ? 'border-red-400' : ''
                  }`}
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="font-anek text-red-300 text-base mt-1">{errors.email}</p>
                )}
              </div>

              <div className={`p-4 glass-card rounded-lg ${
                errors.paymentConfirmed ? 'border-red-400/50' : ''
              }`}>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="paymentConfirmed"
                    checked={formData.paymentConfirmed}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 border-white/30 rounded focus:ring-blue-500 mt-1 bg-white/20"
                    disabled={isSubmitting}
                  />
                  <div>
                    <label className="font-anek text-white font-semibold">
                      পেমেন্ট কনফার্মেশন
                    </label>
                    <p className="font-anek text-white/80 text-base mt-1">
                      bKash এ পেমেন্ট সম্পন্ন করেছি এবং নিয়মাবলী মেনে নিচ্ছি
                    </p>
                    <div className="mt-3 p-3 glass-card rounded-lg">
                      <p className="font-anek text-white font-bold">{WORKSHOP_INFO.payment.bkash}</p>
                      <p className="font-anek text-white/80 text-base">{WORKSHOP_INFO.payment.type}</p>
                    </div>
                  </div>
                </div>
                {errors.paymentConfirmed && (
                  <p className="font-anek text-red-300 text-base mt-2">{errors.paymentConfirmed}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cool-button w-full py-3 px-6 rounded-lg font-anek text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
      </div>
    </section>
  );
};

export default RegistrationForm;