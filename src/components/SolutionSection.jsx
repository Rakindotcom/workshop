const SolutionSection = () => {
  return (
    <section className="clean-section event-section">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="section-title font-anek mb-8">
          সমাধান এখানেই
        </h2>

        <div className="event-card max-w-4xl mx-auto mb-8">
          <h3 className="font-anek text-2xl md:text-3xl font-bold mb-4 sky-blue-accent">
            Prophetic Productivity Masterclass
          </h3>
          <p className="font-anek text-lg gray-text mb-4">
            আত্মিক অনুপ্রেরণা ও বাস্তব কর্মদক্ষতার নিখুঁত সমন্বয়
          </p>
          <p className="font-anek text-base leading-relaxed text-gray-700">
            এই ওয়ার্কশপে শিখুন সময় ব্যবস্থাপনা, কাজের অগ্রাধিকার, মনোযোগ, এবং জীবনের প্রতিটি ক্ষেত্রকে কিভাবে অর্থপূর্ণ ও বরকতময় করা যায়।
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="event-card text-center">
            <div className="w-16 h-16 sky-blue-bg text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">১</span>
            </div>
            <h4 className="font-anek font-bold text-gray-900 mb-2">তাৎক্ষণিক ফলাফল</h4>
            <p className="font-anek gray-text text-base">প্রথম দিন থেকেই কার্যকর পরিবর্তন</p>
          </div>
          <div className="event-card text-center">
            <div className="w-16 h-16 sky-blue-bg text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">২</span>
            </div>
            <h4 className="font-anek font-bold text-gray-900 mb-2">ব্যবহারিক কৌশল</h4>
            <p className="font-anek gray-text text-base">বাস্তব জীবনে প্রয়োগযোগ্য পদ্ধতি</p>
          </div>
          <div className="event-card text-center">
            <div className="w-16 h-16 sky-blue-bg text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">৩</span>
            </div>
            <h4 className="font-anek font-bold text-gray-900 mb-2">দীর্ঘমেয়াদী সাফল্য</h4>
            <p className="font-anek gray-text text-base">জীবনব্যাপী কার্যকর সিস্টেম</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;