import { Calendar, Clock, MapPin, Star, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

const EventDetails = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set event date - October 22, 2025 at 4:30 PM Bangladesh time
    const eventDate = new Date(2025, 9, 22, 16, 30, 0).getTime(); // Month is 0-indexed, so 9 = October

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update immediately
    updateCountdown();
    
    // Then update every second
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="clean-section event-section">
      <div className="max-w-6xl mx-auto">
        {/* Countdown Timer */}
        <div className="text-center mb-8">
          <h3 className="section-title font-anek mb-4">ইভেন্ট শুরু হতে বাকি</h3>
          <div className="flex justify-center space-x-4">
            <div className="date-badge">
              <div className="text-2xl font-bold">{timeLeft.days}</div>
              <div className="text-base">দিন</div>
            </div>
            <div className="date-badge">
              <div className="text-2xl font-bold">{timeLeft.hours}</div>
              <div className="text-base">ঘন্টা</div>
            </div>
            <div className="date-badge">
              <div className="text-2xl font-bold">{timeLeft.minutes}</div>
              <div className="text-base">মিনিট</div>
            </div>
            <div className="date-badge">
              <div className="text-2xl font-bold">{timeLeft.seconds}</div>
              <div className="text-base">সেকেন্ড</div>
            </div>
          </div>
        </div>

        {/* Event Details Grid */}
        <div className="card-grid">
          <div className="event-card">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 sky-blue-accent mr-3" />
              <h3 className="font-anek text-xl font-bold text-gray-900">ভেন্যু</h3>
            </div>
            <h4 className="font-anek text-lg font-bold text-gray-800 mb-2">হোটেল আশরাফি, রাজারবাগ</h4>
            <p className="gray-text font-anek text-base mb-4">ঢাকার কেন্দ্রস্থলে অবস্থিত, সহজ যোগাযোগ ব্যবস্থা</p>
            <a
              href="https://maps.app.goo.gl/HfZu8MfrQkMoDrHy7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-anek sky-blue-accent hover:text-blue-800 font-medium text-base transition-colors duration-300"
            >
              <MapPin className="w-4 h-4 mr-1" />
              গুগল ম্যাপে দেখুন
            </a>
          </div>

          <div className="event-card">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 sky-blue-accent mr-3" />
              <h3 className="font-anek text-xl font-bold text-gray-900">অন্তর্ভুক্ত সুবিধা</h3>
            </div>
            <ul className="font-anek text-base text-gray-700 space-y-3">
              <li className="flex items-center">
                <span className="w-5 h-5 sky-blue-accent flex items-center justify-center text-lg mr-3 font-bold">✓</span>
                বিকালের নাস্তা
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 sky-blue-accent flex items-center justify-center text-lg mr-3 font-bold">✓</span>
                রাতের খাবার
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 sky-blue-accent flex items-center justify-center text-lg mr-3 font-bold">✓</span>
                ওয়ার্কশপ ম্যাটেরিয়াল
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 sky-blue-accent flex items-center justify-center text-lg mr-3 font-bold">✓</span>
                সার্টিফিকেট
              </li>
            </ul>
          </div>

          <div className="event-card">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 sky-blue-accent mr-3" />
              <h3 className="font-anek text-xl font-bold text-gray-900">সময়সূচী</h3>
            </div>
            <div className="space-y-3 font-anek text-base">
              <div className="flex justify-between">
                <span className="gray-text">ওয়ার্কশপ:</span>
                <span className="font-bold">৫:০০ - ৮:৩০ PM</span>
              </div>
              <div className="flex justify-between">
                <span className="gray-text">নেটওয়ার্কিং:</span>
                <span className="font-bold">৮:৩০ - ৯:০০ PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;