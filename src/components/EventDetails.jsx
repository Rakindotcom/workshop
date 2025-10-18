import { Clock, MapPin, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

// Function to convert English numbers to Bengali numbers
const toBengaliNumber = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
};

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
        <div className="text-center mb-8 fade-in-up">
          <h3 className="section-title font-anek mb-4">ইভেন্ট শুরু হতে বাকি</h3>
          <div className="flex justify-center space-x-4">
            <div className="date-badge scale-in delay-100 hover-glow">
              <div className="text-3xl">{toBengaliNumber(timeLeft.days)}</div>
              <div className="text-2xl">দিন</div>
            </div>
            <div className="date-badge scale-in delay-200 hover-glow">
              <div className="text-3xl ">{toBengaliNumber(timeLeft.hours)}</div>
              <div className="text-2xl">ঘন্টা</div>
            </div>
            <div className="date-badge scale-in delay-300 hover-glow">
              <div className="text-3xl ">{toBengaliNumber(timeLeft.minutes)}</div>
              <div className="text-2xl">মিনিট</div>
            </div>
            <div className="date-badge scale-in delay-400 hover-glow">
              <div className="text-3xl ">{toBengaliNumber(timeLeft.seconds)}</div>
              <div className="text-2xl">সেকেন্ড</div>
            </div>
          </div>
        </div>

        {/* Event Details Grid */}
        <div className="card-grid">
          <div className="event-card text-center lg:text-left fade-in-up delay-100 hover-lift">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <MapPin className="w-8 h-8 sky-blue-accent mr-3" />
              <h3 className="font-anek text-3xl font-bold text-gray-900">ভেন্যু</h3>
            </div>
            <h4 className="font-anek text-2xl font-bold mb-2">হোটেল আশরাফি, রাজারবাগ, ঢাকা</h4>
            <p className="font-anek text-2xl mb-4">১২ আউটার সার্কুলার রোড, রাজারবাগ পুলিশ লাইনের ২নং গেটের বিপরীতে, ঢাকা–১২১৭</p>
            <a
              href="https://maps.app.goo.gl/HfZu8MfrQkMoDrHy7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-anek sky-blue-accent hover:text-sky-800 font-medium text-2xl transition-colors duration-300"
            >
              <MapPin className="w-6 h-6 mr-1" />
              গুগল ম্যাপে দেখুন
            </a>
          </div>

          <div className="event-card text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <Users className="w-6 h-6 sky-blue-accent mr-3" />
              <h3 className="font-anek text-3xl font-bold text-gray-900">যা যা পাবেন</h3>
            </div>
            <ul className="font-anek text-base text-gray-700 space-y-3 inline-block lg:block">
              <li className="flex items-center justify-center lg:justify-start text-2xl">
                <span className="w-5 h-5 sky-blue-accent flex items-center justify-center text-2xl mr-3 font-bold">✓</span>
                বিকালের নাস্তা
              </li>
              <li className="flex items-center justify-center lg:justify-start text-2xl">
                <span className="w-5 h-5 sky-blue-accent flex items-center justify-center text-2xl mr-3 font-bold">✓</span>
                রাতের খাবার
              </li>
              <li className="flex items-center justify-center lg:justify-start text-2xl">
                <span className="w-5 h-5 sky-blue-accent flex items-center justify-center text-2xl mr-3 font-bold">✓</span>
                ম্যাটেরিয়াল
              </li>
              <li className="flex items-center justify-center lg:justify-start text-2xl">
                <span className="w-5 h-5 sky-blue-accent flex items-center justify-center text-2xl mr-3 font-bold">✓</span>
                গিফট
              </li>
              <li className="flex items-center justify-center lg:justify-start text-2xl">
                <span className="w-5 h-5 sky-blue-accent flex items-center justify-center text-2xl mr-3 font-bold">✓</span>
                সার্টিফিকেট
              </li>
            </ul>
          </div>

          <div className="event-card text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <Clock className="w-6 h-6 sky-blue-accent mr-3" />
              <h3 className="font-anek text-3xl font-bold text-gray-900">সময়সূচী</h3>
            </div>
            <div className="space-y-3 font-anek text-base">
              <div className="flex justify-center lg:justify-between">
                <span className="text-2xl">ওয়ার্কশপ:</span>
                <span className="text-xl ml-2">৫:০০ - ৮:০০ PM</span>
              </div>
              <div className="flex justify-center lg:justify-between">
                <span className="text-2xl">নেটওয়ার্কিং:</span>
                <span className="text-xl ml-2">৮:০০ - ৯:০০ PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;