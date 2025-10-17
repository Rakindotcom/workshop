import { Calendar, Clock, MapPin, Star, Users } from 'lucide-react';

const EventDetails = () => {
  return (
    <section className="relative py-20 px-4 bg-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-anek text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ইভেন্টের তথ্য
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group bg-white/90 backdrop-blur-sm border border-blue-300 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-anek font-bold text-gray-900 mb-3 text-lg">তারিখ</h3>
            <p className="font-anek text-blue-800 font-bold text-lg">২২ অক্টোবর, ২০২৫</p>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm border border-blue-300 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-anek font-bold text-gray-900 mb-3 text-lg">সময়</h3>
            <p className="font-anek text-blue-800 font-bold text-lg">বিকাল ৫টা – রাত ৯টা</p>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm border border-blue-300 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-anek font-bold text-gray-900 mb-3 text-lg">স্থান</h3>
            <p className="font-anek text-blue-800 font-bold">হোটেল আশরাফি, রাজারবাগ</p>
            <a
              href="https://maps.app.goo.gl/HfZu8MfrQkMoDrHy7"
              target="_blank"
              rel="noopener noreferrer"
              className="font-anek text-blue-600 hover:text-blue-800 underline text-sm font-medium inline-block mt-2 transition-colors duration-300"
            >
              গুগল ম্যাপ
            </a>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm border border-blue-300 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-anek font-bold text-gray-900 mb-3 text-lg">ফি</h3>
            <p className="font-anek text-blue-800 font-bold text-3xl">৯০০ টাকা</p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 rounded-2xl p-8 text-center shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-blue-700 mr-3" />
            <p className="font-anek text-blue-800 font-bold text-xl">
              বিকাল ও রাতের খাবারের ব্যবস্থা রয়েছে
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;