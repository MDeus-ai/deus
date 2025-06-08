// src/pages/HomePage.js

import React from 'react';
import Footer from '../components/Footer/Footer'; // Assuming standard path
import HeroSection from '../components/HeroSection';
import MilestoneTimeline from '../components/MilestoneTimeline';
import AboutPreviewSection from '../components/AboutPreviewSection';
import UseCasesSection from '../components/UseCasesSection';
import BlogPreview from '../components/BlogPreview';

const HomePage = () => {
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