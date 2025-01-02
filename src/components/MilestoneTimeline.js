import React, { useState, useEffect, useRef } from 'react';
import { FaTrophy, FaVideo, FaCode } from 'react-icons/fa';

const milestones = [
  {
    date: "Jan 2024",
    title: "First Kaggle Competition",
    description: "Successfully participated in my first kaggle competition, and made a successful submission",
    icon: FaTrophy,
    category: "Achievement"
  },
  {
    date: "October 2024",
    title: "Published My Website",
    description: "I made my website go live, after months of coding and designing it",
    icon: FaCode,
    category: "Project"
  },
  {
    date: "October 2024",
    title: "Ranked Top 11% In A Kaggle Competition",
    description: "I participated in a kaggle competition were l ranked top 11% on the leaderboard in the whole world",
    icon: FaTrophy,
    category: "Achievement"
  },
  {
    date: "December 2024",
    title: "Published My First YouTube Video",
    description: "Created a machine learning youtube channel and published my first YouTube which was about gradients",
    icon: FaVideo,
    category: "Project"
  }
];

const MilestoneTimeline = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [animationProgress, setAnimationProgress] = useState(0);
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);
  const observersRef = useRef([]);

  useEffect(() => {
    let isSubscribed = true;
    
    const handleScroll = () => {
      if (timelineRef.current && isSubscribed) {
        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 
          (windowHeight - rect.top) / (windowHeight + rect.height)
        ));
        setAnimationProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      isSubscribed = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    observersRef.current = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const timeoutId = setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * 300);
            
            observer.unobserve(entry.target);
            return () => clearTimeout(timeoutId);
          }
        },
        {
          threshold: 0.3,
          rootMargin: '-10% 0px -10% 0px'
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observersRef.current.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section 
      ref={timelineRef}
      className="relative w-full bg-[#1a1a2e] py-24 md:py-32 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a4a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a4a_1px,transparent_1px)] bg-[size:3rem_3rem]"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 70%, transparent 100%)',
          transform: `scale(${1 + animationProgress * 0.1})`,
          opacity: 0.3 + animationProgress * 0.7,
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
        }}
      />

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="relative inline text-4xl md:text-5xl font-bold">
            <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Milestone Timeline
            </span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:transform md:-translate-x-1/2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
              style={{
                transform: `scaleY(${animationProgress})`,
                transformOrigin: 'top',
                transition: 'transform 1s ease-out'
              }}
            />
          </div>

          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            const Icon = milestone.icon;
            const isVisible = visibleItems.has(index);

            return (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`relative flex items-start md:items-center mb-12`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `
                    translate${isLeft ? 'X(-' : 'X('}${isVisible ? '0' : '50'}px)
                    translateY(${isVisible ? '0' : '30px'})
                  `,
                  transition: 'all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)'
                }}
              >
                <div 
                  className={`absolute left-0 md:left-1/2 w-6 h-6 md:w-8 md:h-8 bg-gray-800 rounded-full border-2 
                    ${isVisible ? 'border-purple-500' : 'border-transparent'} z-10 md:-translate-x-1/2`}
                  style={{
                    transform: `scale(${isVisible ? 1 : 0}) translate(-50%, 0)`,
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: '0.3s'
                  }}
                >
                  <Icon 
                    className={`w-full h-full p-1 text-purple-400`}
                    style={{
                      transform: `rotate(${isVisible ? '360deg' : '0deg'})`,
                      transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: '0.5s'
                    }}
                  />
                </div>

                <div
                  className={`pl-12 md:pl-0 md:w-5/12 ${
                    isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div 
                    className="relative bg-gray-800/80 p-4 md:p-6 rounded-xl shadow-xl overflow-hidden group 
                      transition-all duration-300 hover:scale-105"
                  > 
                    <div className="relative z-10">
                      <span 
                        className="text-xs md:text-sm text-[rgba(255,140,0,0.9)] font-medium block group-hover:text-purple-300 transition-colors duration-300"
                        style={{
                          transform: isVisible ? 'none' : 'translateY(20px)',
                          opacity: isVisible ? 1 : 0,
                          transition: 'all 0.5s ease-out',
                          transitionDelay: '0.6s'
                        }}
                      >
                        {milestone.date}
                      </span>
                      <h3 
                        className="text-lg md:text-xl font-bold text-white mt-2 mb-3 group-hover:text-purple-200 transition-colors duration-300"
                        style={{
                          transform: isVisible ? 'none' : 'translateY(20px)',
                          opacity: isVisible ? 1 : 0,
                          transition: 'all 0.5s ease-out',
                          transitionDelay: '0.7s'
                        }}
                      >
                        {milestone.title}
                      </h3>
                      <p 
                        className="text-gray-300 text-xs md:text-sm group-hover:text-gray-200 transition-colors duration-300"
                        style={{
                          transform: isVisible ? 'none' : 'translateY(20px)',
                          opacity: isVisible ? 1 : 0,
                          transition: 'all 0.5s ease-out',
                          transitionDelay: '0.8s'
                        }}
                      >
                        {milestone.description}
                      </p>
                      <span 
                        className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300
                          group-hover:bg-purple-500/30 group-hover:text-purple-200 transition-all duration-300"
                        style={{
                          transform: isVisible ? 'none' : 'translateY(20px)',
                          opacity: isVisible ? 1 : 0,
                          transition: 'all 0.5s ease-out',
                          transitionDelay: '0.9s'
                        }}
                      >
                        {milestone.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gradientMove {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
        `
      }} />
    </section>
  );
};

export default MilestoneTimeline;