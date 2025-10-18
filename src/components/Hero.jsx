import { WORKSHOP_INFO } from '../constants/workshop';

const Hero = () => {
  return (
    <section className="event-hero py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Date and Event Badge */}
            <div className="fade-in-up delay-100 inline-flex items-center bg-[#38B6FF] text-black px-6 py-3 rounded-full shadow-lg smooth-bounce">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="font-anek text-2xl">২২ অক্টোবর ২০২৫</span>
                </div>
                <div className="h-4 w-px bg-white/30"></div>
                <span className="font-anek text-2xl font-medium">এক্সক্লুসিভ অফলাইন ওয়ার্কশপ</span>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-2 fade-in-up delay-200">
              <h1 className="font-anek text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                প্রফেটিক প্রোডাক্টিভিটি™ ওয়ার্কশপ
              </h1>
            </div>

            {/* Description */}
            <div className="fade-in-up delay-300 bg-gradient-to-r from-gray-100 to-sky-50 p-6 rounded-xl border-l-4 border-sky-400 shadow-sm hover-lift">
              <p className="font-anek text-3xl text-gray-700 leading-relaxed">
                আপনার জীবনকে মহানবীর ﷺ মতো <span className="text-sky-600 font-semibold">পারপাসফুল</span>,
                <span className="text-sky-600 font-semibold"> প্রোডাক্টিভ</span> ও
                <span className="text-sky-600 font-semibold"> ইমপ্যাক্টফুল</span> বানাতে আজই ওয়ার্কশপে যোগ দিন
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex justify-center lg:justify-start">
              <a href="#registration" className="group inline-flex items-center bg-[#38B6FF] text-black font-anek text-2xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl smooth-bounce button-entry" style={{ animationDelay: '0.8s' }}>
                <span>রেজিস্ট্রেশন করুন</span>
                <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Content - Coach Image */}
          <div className="text-center fade-in-right delay-300">
            {/* Professional Portrait with Blue Gradient Background */}
            <div className="relative bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 rounded-lg overflow-hidden shadow-xl">
              <div className="relative w-full flex items-end justify-center">
                <img
                  src="/jahidhasanmilu.jpg"
                  alt="Jahid Hasan Milu"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 hidden items-center justify-center text-white text-4xl font-bold">
                  JHM
                </div>

                {/* Gradient Overlay for Professional Look */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#38b6ff69] via-transparent to-transparent"></div>
              </div>

              {/* Coach Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sky-900/90 to-transparent p-4 text-white">
                <h3 className="font-anek text-4xl font-bold mb-1">জাহিদ হাসান মিলু</h3>
                <p className="font-anek text-sky-100 text-2xl">প্রফেটিক প্রোডাক্টিভিটি কোচ, ডিভাইন কনসাল্টেন্সি</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;