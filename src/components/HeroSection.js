import React from 'react';
import { Link } from 'react-router-dom';
// Icons for the entire section
import { FaGithub, FaCube, FaFeatherAlt } from 'react-icons/fa';
import { SiGitlab } from 'react-icons/si';

// This is a helper component for the graphic. It's only used here.
const PlaceholderGraphic = () => (
  <div className="relative w-full h-64 md:h-full flex items-center justify-center">
    <div className="absolute w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-black/10 transform rotate-45"></div>
    <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 border-4 border-black bg-yellow-300 p-4">
      <div className="w-full h-full border-2 border-black flex flex-col justify-between p-2">
        <div className="flex justify-between">
          <div className="w-4 h-4 bg-black"></div>
          <div className="w-4 h-4 bg-black"></div>
        </div>
        <div className="text-center font-mono text-black">
          <p>{'// AI & DATA'}</p>
          <p>{'<SOLUTIONS />'}</p>
        </div>
        <div className="flex justify-between">
          <div className="w-4 h-4 bg-black"></div>
          <div className="w-4 h-4 bg-black"></div>
        </div>
      </div>
    </div>
  </div>
);



// The final, unified HeroSection component
export default function HeroSection() {
  return (
    // A single section tag now wraps everything
    <section className="bg-yellow-400 text-black font-sans flex flex-col justify-center">
      
      {/* PART 1: Main Hero Content */}
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tighter leading-tight">
              Building Intelligent Systems with Data.
            </h1>
            <p className="mt-6 text-base sm:text-lg lg:text-xl max-w-xl mx-auto md:mx-0">
              I am an open-source developer and self-taught data scientist building machine learning solutions for complex problems.
            </p>
            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="https://github.com/MDeus-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 border-2 border-black font-bold hover:bg-gray-200 transition-colors"
              >
                <FaGithub size={20} />
                <span>See on Github</span>
              </Link>
              <Link
                to="/blog"
                className="group flex items-center justify-center gap-2 bg-transparent text-black px-6 py-3 border-2 border-black font-bold hover:bg-black hover:text-yellow-400 transition-colors"
              >
                <span>Read the blog</span>
                <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <a
              href="/about"
              className="mt-6 inline-block text-sm font-semibold underline hover:text-gray-700"
            >
              or read a 2 minute introduction about me
            </a>
          </div>
          {/* Right Column: Graphic */}
          <div className="hidden md:flex items-center justify-center">
            <PlaceholderGraphic />
          </div>
        </div>
      </div>

      {/* PART 2: Social Proof / Stats Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-4xl mx-auto">
          {/* GitHub Stars Box */}
          <div className="border border-black p-8 text-center">
            <p className="text-5xl lg:text-6xl font-extrabold tracking-tighter">
              4,000+
            </p>
            <p className="mt-2 text-base font-semibold">
              Stars on Github
            </p>
          </div>
          {/* Trusted By Section */}
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">Trusted by tier-1 teams</p>
            <div className="flex justify-center md:justify-start gap-6 mt-4">
              <SiGitlab size={32} className="text-black" />
              <FaCube size={32} className="text-black" />
              <FaFeatherAlt size={32} className="text-black" />
            </div>
          </div>
        </div>
        <hr className="mt-12 md:mt-20 border-black max-w-4xl mx-auto" />
      </div>


    </section>
  );
}