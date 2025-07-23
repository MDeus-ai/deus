import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import MilestoneTimeline from '../components/MilestoneTimeline';
import AboutPreviewSection from '../components/AboutPreviewSection';
import UseCasesSection from '../components/UseCasesSection';
import BlogPreview from '../components/BlogPreview';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = 'muhumuza deus';
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="font-sans">
      <HeroSection />
      <section id="about-section">
        <AboutPreviewSection />
      </section>
      <main>
        <UseCasesSection />
        <BlogPreview />
      </main>
      <section id="milestones-section">
        <MilestoneTimeline />
      </section>
    </div>
  );
};

export default HomePage;