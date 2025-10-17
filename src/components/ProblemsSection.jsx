import { PROBLEMS } from '../constants/workshop';

const ProblemsSection = () => {

  return (
    <section className="relative py-20 px-4 bg-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-anek text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            আপনি কি এই বাস্তবতায় বাস করছেন?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full mb-8"></div>

          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-200">
              <p className="font-anek text-xl md:text-2xl text-gray-800 font-medium leading-relaxed">
                প্রতিদিন আপনি ব্যস্ত, কিন্তু দিনের শেষে মনে হয়— "আজও আসলে কিছুই এগোয়নি।"
              </p>
            </div>

            <p className="font-anek text-lg text-blue-700 font-semibold">
              চলুন দেখি, আপনি কি নিচের কোনো সমস্যার মধ্যে আছেন?
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROBLEMS.map((problem, index) => (
            <div key={index} className="group bg-white/90 backdrop-blur-sm border border-blue-300 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 group-hover:animate-pulse">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-anek font-bold text-gray-900 mb-4 text-xl leading-tight">{problem.title}</h3>
                  <p className="font-anek text-gray-600 leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;