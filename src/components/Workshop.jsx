import { useEffect } from 'react';
import Hero from './Hero';
import EventDetails from './EventDetails';
import ProblemsSection from './ProblemsSection';
import SolutionSection from './SolutionSection';
import LearningOutcomes from './LearningOutcomes';
import RegistrationForm from './RegistrationForm';

const Workshop = () => {
  // Set page title and meta tags when component mounts
  useEffect(() => {
    // Update page title
    document.title = 'Prophetic Productivity Workshop - ২২ অক্টোবর ২০২৫ | Coach Jahid Hasan Milu';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join Coach Jahid Hasan Milu\'s exclusive Prophetic Productivity Workshop on October 22, 2025. Learn Islamic time management and life balance. Registration: 900 TK. Limited seats available!');
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'Prophetic Productivity, Jahid Hasan Milu, Islamic productivity, time management, workshop 2025, Divine Consultancy, productivity masterclass');
    }
    
    // Reset title and meta when component unmounts
    return () => {
      document.title = 'Divine Consultancy - Prophetic Productivity Masterclass';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Transform your life with Divine Consultancy\'s 8-Week Prophetic Productivity Masterclass. Learn Islamic productivity principles for work, worship, and family life.');
      }
      if (metaKeywords) {
        metaKeywords.setAttribute('content', 'Islamic productivity, prophetic productivity, Islamic courses, productivity masterclass, Islamic lifestyle');
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-anek">
      <Hero />
      <EventDetails />
      <ProblemsSection />
      <SolutionSection />
      <LearningOutcomes />
      <RegistrationForm />
    </div>
  );
};

export default Workshop;