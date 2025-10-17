import { Calendar, Sparkles } from 'lucide-react';
import { WORKSHOP_INFO } from '../constants/workshop';

const Hero = () => {
  return (
    <section className="relative py-20 px-4 bg-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full text-sm font-medium mb-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Sparkles className="w-5 h-5 mr-2 animate-spin" />
            <span className="font-anek font-semibold">এক্সক্লুসিভ অফলাইন সেশন</span>
          </div>

          <div className="relative">
            <h1 className="font-anek text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-pulse">
                Prophetic Productivity:
              </span>
              <br />
              <span className="text-blue-900 drop-shadow-lg">সময়, কাজ ও জীবনের ভারসাম্য</span>
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full mb-8"></div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl border border-blue-200 transform hover:scale-105 transition-all duration-300">
            <p className="font-anek text-2xl md:text-3xl font-bold text-blue-800 mb-3">
              {WORKSHOP_INFO.coach}
            </p>
            <p className="font-anek text-lg text-blue-600 font-medium">
              আয়োজন: {WORKSHOP_INFO.organizer}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-12 border border-blue-300 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
          <p className="font-anek text-xl md:text-2xl text-gray-800 leading-relaxed">
            ব্যস্ততার জীবনে শান্তি ও বরকত ফিরিয়ে আনুন। জানুন কীভাবে ইসলামের চিরন্তন নীতিমালা ও আধুনিক প্রোডাক্টিভিটি একত্রে আপনার জীবনকে গড়ে তুলতে পারে ভারসাম্যপূর্ণ ও ফলপ্রসূভাবে।
          </p>
        </div>

        <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
          <Calendar className="w-6 h-6 mr-3 animate-pulse" />
          <span className="font-anek">{WORKSHOP_INFO.date}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;