import { useState } from 'react';
import { Phone, MessageCircle, Star, Clock, Users, CheckCircle, AlertCircle, Loader, MessageSquare, Copy } from 'lucide-react';
import { validateBangladeshiPhone, validateRequired } from '../utils/validation';
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
  const [copiedText, setCopiedText] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Copy to clipboard function
  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(''), 2000); // Clear after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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

    if (!validateRequired(formData.email)) {
      newErrors.email = 'যে নাম্বার থেকে সেন্ড মানি করেছেন তা আবশ্যক';
    }

    if (!formData.paymentConfirmed) {
      newErrors.paymentConfirmed = 'সেন্ড মানি কনফার্মেশন আবশ্যক';
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
      setShowSuccessPopup(true);

      // Reset form after successful submission
      setFormData({
        fullName: '',
        whatsapp: '',
        email: '',
        paymentConfirmed: false
      });

    } catch (error) {
      console.error('Registration failed:', error);
      setSubmitStatus('error');
      setSubmitMessage(error.message || 'রেজিস্ট্রেশনে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              <h3 className="font-anek text-2xl font-bold text-gray-900 mb-4">
                সফলভাবে সম্পন্ন!
              </h3>

              <p className="font-anek text-lg text-gray-700 leading-relaxed mb-6">
                আপনার ফর্মটি আমরা রিসিভ করেছি। ভ্যারিফাই করার পর আপনাকে প্রাইভেট হোয়াটসঅ্যাপ গ্রুপে এড করা হবে ইনশাআল্লাহ।
              </p>

              <button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-anek text-lg px-8 py-3 rounded-full hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                জাযাকাল্লাহ
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="registration" className="cool-form py-12 px-4 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Floating Elements */}
          <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full floating-element"></div>
          <div className="absolute top-24 right-12 w-12 h-12 bg-white/10 rounded-full floating-element" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-16 left-16 w-10 h-10 bg-white/10 rounded-full floating-element" style={{ animationDelay: '4s' }}></div>

          <div className="text-center mb-8 fade-in-up">
            <h2 className="font-anek text-3xl md:text-4xl font-bold text-white mb-3">
              রেজিস্ট্রেশন করুন
            </h2>
            <p className="font-anek text-red-700 rounded-2xl py-3 bg-white text-xl mb-4 scale-in delay-100">আসন সীমিত! আজই নিশ্চিত করুন আপনার স্থান</p>

            <div className="glass-card inline-flex items-center px-4 py-2 rounded-lg hover-glow scale-in delay-200">
              <span className="font-anek text-white text-2xl">আর্লি বার্ড অফার: মাত্র ৯০০ টাকা</span>
              <span className="ml-2 bg-white/20 px-2 py-1 rounded text-white text-2xl">রেগুলার মূল্য: ১৫০০ টাকা</span>
            </div>
          </div>

          {/* Payment Information Section */}
          <div className="mb-8 fade-in-up delay-300">
            <div className="glass-card rounded-xl p-8 border-2 border-gradient-to-r from-yellow-400/50 to-orange-400/50 relative overflow-hidden hover-lift">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-400/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                <h3 className="font-anek text-4xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    যেখানে ফি পরিশোধ করবেন
                  </span>
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Mobile Banking */}
                  <div className="relative h-full">
                    <div className="glass-card rounded-xl p-6 border-2 border-green-400/40 hover:border-green-400/60 transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
                      <div className="flex items-center mb-4">

                        <h4 className="font-anek text-2xl font-bold text-white">
                          মোবাইল ব্যাংকিং
                        </h4>
                      </div>
                      <div className="flex-grow flex flex-col justify-center">
                        <div className="space-y-4">
                          <div>
                            <p className="text-green-200 text-xl">পেমেন্ট মেথড</p>
                            <p className="font-anek text-green-100 text-xl font-bold">সেন্ড মানি</p>
                          </div>
                          <div>
                            <p className="text-green-200 text-xl">নম্বর</p>
                            <div className="flex items-center space-x-3">
                              <p className="font-anek text-green-100 text-2xl font-bold">01779049560</p>
                              <button
                                onClick={() => copyToClipboard('01779049560', 'mobile')}
                                className="p-2 bg-green-500/30 hover:bg-green-500/50 rounded-lg transition-colors duration-200 group"
                                title="কপি করুন"
                              >
                                <Copy className="w-4 h-4 text-green-200 group-hover:text-green-100" />
                              </button>
                              {copiedText === 'mobile' && (
                                <span className="text-green-300 text-sm font-bold">কপি হয়েছে!</span>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-green-200 text-xl">সাপোর্টেড সার্ভিস</p>
                            <p className="font-anek text-green-100 text-lg font-bold">বিকাশ / নগদ / রকেট</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="relative h-full">
                    <div className="glass-card rounded-xl p-6 border-2 border-blue-400/40 hover:border-blue-400/60 transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
                      <div className="flex items-center mb-4">
                        <h4 className="font-anek text-2xl font-bold text-white">
                          ব্যাংক ট্রান্সফার
                        </h4>
                      </div>
                      <div className="border-blue-400/30 flex-grow">
                        <div className="space-y-4">
                          <div>
                            <p className="font-anek text-white text-lg">ব্যাংক</p>
                            <p className="font-anek text-blue-100 text-lg font-bold">Dutch-Bangla Bank</p>
                          </div>
                          <div>
                            <p className="font-anek text-white text-lg">একাউন্ট নম্বর</p>
                            <div className="flex items-center space-x-3">
                              <p className="font-anek text-blue-100 text-xl font-bold">3031100011876</p>
                              <button
                                onClick={() => copyToClipboard('3031100011876', 'account')}
                                className="p-2 bg-blue-500/30 hover:bg-blue-500/50 rounded-lg transition-colors duration-200 group"
                                title="কপি করুন"
                              >
                                <Copy className="w-4 h-4 text-blue-200 group-hover:text-blue-100" />
                              </button>
                              {copiedText === 'account' && (
                                <span className="text-blue-300 text-sm font-bold">কপি হয়েছে!</span>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="font-anek text-white text-lg">একাউন্ট নাম</p>
                            <div className="flex items-center space-x-3">
                              <p className="font-anek text-blue-100 text-lg font-bold">Divine Consultancy</p>
                              <button
                                onClick={() => copyToClipboard('Divine Consultancy', 'name')}
                                className="p-2 bg-blue-500/30 hover:bg-blue-500/50 rounded-lg transition-colors duration-200 group"
                                title="কপি করুন"
                              >
                                <Copy className="w-4 h-4 text-blue-200 group-hover:text-blue-100" />
                              </button>
                              {copiedText === 'name' && (
                                <span className="text-blue-300 text-sm font-bold">কপি হয়েছে!</span>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-blue-200 text-lg">শাখা</p>
                              <p className="font-anek text-blue-100 text-lg">Banasree</p>
                            </div>
                            <div>
                              <p className="font-anek text-blue-200 text-lg">SWIFT</p>
                              <p className="font-anek text-blue-100 text-lg">DBBLBDDH</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div className="glass-card inline-block px-6 py-4 rounded-full border-2 border-yellow-400/50">
                    <p className="text-yellow-300 text-2xl mt-1">
                      সেন্ড মানি করার পর নিচের ফর্ম পূরণ করুন
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cool Registration Layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Event Info Sidebar */}
            <div className="space-y-4">
              <div className="glass-card rounded-lg p-4">
                <h3 className="text-3xl text-white mb-3 text-center">ইভেন্ট তথ্য</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-blue-300" />
                    <span className="text-white text-xl">৯০০ টাকা মাত্র</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-300" />
                    <span className="text-white text-xl">৪ ঘন্টা</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-300" />
                    <span className="font-anek text-white text-xl">খাবার + ওয়ার্কশপ + গিফট</span>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-lg p-4">
                <h3 className="mb-3 text-white text-3xl text-center">যোগাযোগের জন্য</h3>
                <div className="flex justify-center mb-3">
                  <a
                    href={WORKSHOP_INFO.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 glass-card hover:bg-green-500/20 text-green-300 rounded-lg transition-colors duration-300 border border-green-400/30"
                    title="WhatsApp এ মেসেজ করুন"
                  >
                    <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                    </svg>
                  </a>
                </div>
                <div className="text-center">
                  <p className="font-anek text-white text-xl">মাত্র ২০টি আসন বাকি</p>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2 glass-card rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-white/20 to-white/10 px-6 py-4 border-b border-white/20">
                <h3 className="text-3xl text-white mb-1 text-center">
                  রেজিস্ট্রেশন ফর্ম
                </h3>
                <p className="font-anek text-white/80 text-xl text-center">
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
                    <label className="font-anek block text-white font-semibold mb-2 text-xl">
                      পূর্ণ নাম *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`cool-input font-anek w-full p-2.5 rounded-lg ${errors.fullName ? 'border-red-400' : ''
                        }`}
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      disabled={isSubmitting}
                    />
                    {errors.fullName && (
                      <p className="font-anek text-red-300 text-base mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-anek block text-white font-semibold mb-2 text-xl">
                      হোয়াটসঅ্যাপ নম্বর *
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className={`cool-input font-anek w-full p-2.5 rounded-lg ${errors.whatsapp ? 'border-red-400' : ''
                        }`}
                      placeholder="আপনার হোয়াটসঅ্যাপ নাম্বার লিখুন"
                      disabled={isSubmitting}
                    />
                    {errors.whatsapp && (
                      <p className="font-anek text-red-300 text-base mt-1">{errors.whatsapp}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-anek block text-white font-semibold mb-2 text-xl">
                      যে নাম্বার থেকে সেন্ড মানি করেছেন *
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`cool-input font-anek w-full p-2.5 rounded-lg ${errors.email ? 'border-red-400' : ''
                        }`}
                      placeholder="বিকাশ/নগদ/রকেট/ব্যাংক একাউন্ট নম্বর"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="font-anek text-red-300 text-base mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className={`p-4 glass-card rounded-lg ${errors.paymentConfirmed ? 'border-red-400/50' : ''
                    }`}>
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="paymentConfirmed"
                        checked={formData.paymentConfirmed}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-sky-600 border-white/30 rounded focus:ring-sky-500 mt-1 bg-white/20"
                        disabled={isSubmitting}
                      />
                      <div>
                        <label className="font-anek text-white font-semibold text-xl">
                          সেন্ড মানি কনফার্মেশন
                        </label>
                        <p className="font-anek text-yellow-300 text-[22px] mt-1">
                          ফি পরিশোধ না করলে দয়া করে এখানে টিক দেবেন না।
                        </p>
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
                      <span className='text-3xl'>আসন নিশ্চিত করুন</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegistrationForm;