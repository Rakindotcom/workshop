const CoachSection = () => {
  return (
    <section className="clean-section event-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="section-title font-anek">
            আপনার কোচ
          </h2>
        </div>

        <div className="event-card max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="w-32 h-32 mx-auto md:mx-0 mb-4 rounded-full overflow-hidden bg-gray-200">
                <img
                  src="/jahidhasanmilu.jpg"
                  alt="Jahid Hasan Milu"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-400 rounded-full hidden items-center justify-center text-white text-2xl font-bold">
                  JHM
                </div>
              </div>
              <h3 className="font-anek text-2xl font-bold text-gray-900 mb-2">জাহিদ হাসান মিলু</h3>
              <p className="font-anek gray-text mb-4">প্রোডাক্টিভিটি ও ইসলামিক পার্সোনাল ডেভেলপমেন্ট কোচ</p>
              <div className="sky-blue-bg text-white px-4 py-2 rounded text-base font-anek font-bold inline-block">
                প্রোডাক্টিভিটি বিশেষজ্ঞ
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 professional-bg rounded">
                <div className="w-12 h-12 sky-blue-bg text-white rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold">E</span>
                </div>
                <div className="font-anek font-bold text-gray-900">অভিজ্ঞতা</div>
                <div className="font-anek gray-text text-base">বিশেষজ্ঞ পর্যায়</div>
              </div>
              <div className="text-center p-4 professional-bg rounded">
                <div className="w-12 h-12 sky-blue-bg text-white rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold">S</span>
                </div>
                <div className="font-anek font-bold text-gray-900">১০০K+</div>
                <div className="font-anek gray-text text-base">শিক্ষার্থী</div>
              </div>
              <div className="text-center p-4 professional-bg rounded">
                <div className="w-12 h-12 sky-blue-bg text-white rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold">W</span>
                </div>
                <div className="font-anek font-bold text-gray-900">৫০০+</div>
                <div className="font-anek gray-text text-base">সফল ওয়ার্কশপ</div>
              </div>
              <div className="text-center p-4 professional-bg rounded">
                <div className="w-12 h-12 sky-blue-bg text-white rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold">R</span>
                </div>
                <div className="font-anek font-bold text-gray-900">৪.৯</div>
                <div className="font-anek gray-text text-base">রেটিং</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachSection;