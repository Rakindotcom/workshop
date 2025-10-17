import { LEARNING_OUTCOMES } from '../constants/workshop';

// Function to convert English numbers to Bengali numbers
const toBengaliNumber = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
};

const LearningOutcomes = () => {
  return (
    <section className="event-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="section-title font-anek mb-4">
            এই ওয়ার্কশপে যা যা শিখবেন
          </h2>
        </div>

        <div className="card-grid">
          {LEARNING_OUTCOMES.map((learning, index) => (
            <div key={index} className="event-card">
              <div className="text-center mb-4">
                <div className="w-10 h-10 bg-[#38B6FF] text-black rounded flex items-center justify-center mx-auto text-3xl">
                  {toBengaliNumber(index + 1)}
                </div>
              </div>
              <div>
                <p className="text-2xl text-center text-gray-800 leading-relaxed font-medium">{learning}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default LearningOutcomes;