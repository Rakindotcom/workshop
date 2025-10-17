const CoachSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-anek text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          কোচ জাহিদ হাসান মিলু সম্পর্কে
        </h2>

        <div className="bg-white border border-blue-300 rounded-2xl p-8 shadow-lg text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-300">
            <img
              src="/jahidhasanmilu.jpg"
              alt="Jahid Hasan Milu"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-full hidden items-center justify-center text-white text-2xl font-bold">
              JHM
            </div>
          </div>
          <p className="font-anek text-lg text-gray-700 leading-relaxed">
            জাহিদ হাসান মিলু বাংলাদেশের অন্যতম জনপ্রিয় প্রোডাক্টিভিটি ও ইসলামিক পার্সোনাল ডেভেলপমেন্ট কোচ। তাঁর কনটেন্ট, লেকচার ও ওয়ার্কশপের মাধ্যমে তিনি লাখো মুসলিমকে সাহায্য করেছেন সময়, কাজ ও আধ্যাত্মিক জীবনের মধ্যে বাস্তব ভারসাম্য আনতে।
          </p>
        </div>
      </div>
    </section>
  );
};

export default CoachSection;