import { PROBLEMS } from '../constants/workshop';

const ProblemsSection = () => {
  return (
    <section className="event-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="section-title font-anek mb-4">
            আপনি কি এই সমস্যায় ভুগছেন?
          </h2>
          <div className="light-sky-blue-bg border-l-4 border-sky-700 rounded p-6 max-w-4xl mx-auto">
            <p className="font-anek text-lg sky-blue-accent font-medium">
              "প্রতিদিন ব্যস্ত, কিন্তু দিনের শেষে মনে হয়— আজও কিছুই এগোয়নি।"
            </p>
          </div>
        </div>

        <div className="card-grid">
          {PROBLEMS.map((problem, index) => (
            <div key={index} className="event-card">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 sky-blue-bg text-white rounded flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-anek font-bold text-gray-900 mb-3 text-lg">{problem.title}</h3>
                  <p className="font-anek gray-text leading-relaxed">{problem.description}</p>
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