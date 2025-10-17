import { Calendar } from 'lucide-react';
import { WORKSHOP_INFO } from '../constants/workshop';

const Hero = () => {
  return (
    <section className="event-hero py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div>
            {/* Date Badge */}
            <div className="date-badge inline-block mb-4">
              <div className="text-2xl font-bold">22</div>
              <div className="text-base">OCT 2025</div>
            </div>

            {/* Event Badge */}
            <div className="event-badge mb-3">
              <span className="font-anek">এক্সক্লুসিভ অফলাইন ওয়ার্কশপ</span>
            </div>

            {/* Main Title */}
            <h1 className="section-title font-anek text-4xl md:text-5xl mb-3">
              PROPHETIC PRODUCTIVITY
              <br />
              <span className="sky-blue-accent text-3xl md:text-4xl">সময়, কাজ ও জীবনের ভারসাম্য</span>
            </h1>

            {/* Description */}
            <p className="gray-text font-anek text-lg mb-4 leading-relaxed">
              ইসলামের চিরন্তন নীতিমালা ও আধুনিক প্রোডাক্টিভিটির নিখুঁত সমন্বয়ে গড়ুন ভারসাম্যপূর্ণ জীবন।
              ৪ ঘন্টার এই ওয়ার্কশপে শিখুন কীভাবে সময়, কাজ ও জীবনের মধ্যে আনবেন নিখুঁত ভারসাম্য।
            </p>

            {/* Event Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="text-center">
                <Calendar className="w-6 h-6 mx-auto mb-1 sky-blue-accent" />
                <div className="font-anek text-base font-bold">{WORKSHOP_INFO.date}</div>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 mx-auto mb-1g rounded text-blue-800 text-base flex items-center justify-center font-bold">৫টা-৯টা</div>
                <div className="font-anek text-base font-bold">৪ ঘন্টা</div>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 mx-auto mb-1 rounded text-blue-800 text-lg flex items-center justify-center font-bold">৯০০</div>
                <div className="font-anek text-base font-bold">টাকা মাত্র</div>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 mx-auto mb-1 sky-blue-bg rounded text-white text-base flex items-center justify-center font-bold">✓</div>
                <div className="font-anek text-base font-bold">খাবার সহ</div>
              </div>
            </div>

            {/* CTA Button */}
            <a href="#registration" className="event-cta inline-block font-anek px-8 py-3">
              রেজিস্টার করুন
            </a>
          </div>

          {/* Right Content - Coach Image */}
          <div className="text-center">
            {/* Professional Portrait with Blue Gradient Background */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-lg overflow-hidden shadow-xl">
              <div className="relative w-full h-80 flex items-end justify-center">
                <img
                  src="/jahidhasanmilu.jpg"
                  alt="Jahid Hasan Milu"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 hidden items-center justify-center text-white text-4xl font-bold">
                  JHM
                </div>

                {/* Gradient Overlay for Professional Look */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
              </div>

              {/* Coach Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent p-4 text-white">
                <h3 className="font-anek text-lg font-bold mb-1">{WORKSHOP_INFO.coach}</h3>
                <p className="font-anek text-blue-100 text-xs mb-2">{WORKSHOP_INFO.organizer}</p>
                <div className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-anek font-bold inline-block">
                  প্রোডাক্টিভিটি কোচ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;