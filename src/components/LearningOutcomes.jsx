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
    <section className="py-16 px-4 bg-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-anek text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          এই সেশনে যা শিখবেন
        </h2>

        <div className="space-y-4">
          {learnings.map((learning, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-white border border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <CheckCircle className="text-blue-700 w-6 h-6 mt-1 flex-shrink-0" />
              <p className="font-anek text-lg text-gray-800">{learning}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;