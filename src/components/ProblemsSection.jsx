import { PROBLEMS } from '../constants/workshop';

// Function to convert English numbers to Bengali numbers
const toBengaliNumber = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
};

const ProblemsSection = () => {
  return (
    <section className="event-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="section-title font-anek mb-4">
            আপনিও কী এটা ফেস করছেন?
          </h2>
        </div>

        <div className="card-grid">
          {PROBLEMS.map((problem, index) => (
            <div key={index} className="event-card">
              <div className="text-center mb-4">
                <div className="w-15 h-10 bg-[#38B6FF] text-black rounded flex items-center text-2xl justify-center mx-auto">
                  {toBengaliNumber(index + 1)}
                </div>
              </div>
              <div>
                <h3 className="font-anek text-center text-gray-900 mb-3 text-2xl">{problem.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;