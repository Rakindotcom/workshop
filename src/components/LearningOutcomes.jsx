import { CheckCircle } from 'lucide-react';

const LearningOutcomes = () => {
  const learnings = [
    'ইসলামী মূল্যবোধের আলোকে সময় ব্যবস্থাপনার ব্যবহারিক কৌশল',
    'প্রতিদিনের রুটিনকে আরও কার্যকর ও ভারসাম্যপূর্ণ করার উপায়',
    'পরিবার, কাজ ও ইবাদতের মধ্যে সমন্বয় আনার বাস্তব দিকনির্দেশনা',
    'আধুনিক প্রোডাক্টিভিটি টুলসের স্মার্ট ও সচেতন ব্যবহার',
    'একটি টেকসই ব্যক্তিগত অ্যাকশন প্ল্যান গড়ে তোলার রূপরেখা'
  ];

  return (
    <section className="event-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="section-title font-anek mb-4">
            এই ওয়ার্কশপে যা শিখবেন
          </h2>
          <p className="font-anek gray-text text-lg">৪ ঘন্টায় জীবন পরিবর্তনের ৫টি মূল কৌশল</p>
        </div>

        <div className="card-grid">
          {learnings.map((learning, index) => (
            <div key={index} className="event-card">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 sky-blue-bg text-white rounded flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <CheckCircle className="sky-blue-accent w-6 h-6 mb-3" />
                  <p className="font-anek text-gray-800 leading-relaxed font-medium">{learning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="event-card inline-block light-sky-blue-bg border-2 border-sky-300">
            <p className="font-anek sky-blue-accent font-bold">
              বোনাস: ব্যক্তিগত অ্যাকশন প্ল্যান টেমপ্লেট
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;