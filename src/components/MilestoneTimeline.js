import React, { useState, useEffect, useRef } from 'react';
import { FaTrophy, FaVideo, FaCode } from 'react-icons/fa';

const TimelineBanner = () => {
  const tickerText = "CAREER AND LEARNING MILESTONES • ";
  return (
    <div>
      <div className="bg-accent-text text-accent py-3 w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-base font-semibold mx-4">{tickerText.repeat(20)}</span>
          <span className="text-base font-semibold mx-4" aria-hidden="true">{tickerText.repeat(20)}</span>
        </div>
      </div>
    </div>
  );
};

const milestones = [
  {
    date: "Jan 2024",
    title: "First Kaggle Competition",
    description: "Successfully participated in my first kaggle competition, and made a successful submission.",
    icon: FaTrophy,
    category: "Achievement"
  },
  {
    date: "October 2024",
    title: "Published My Website",
    description: "I made my website go live, after months of coding and designing it.",
    icon: FaCode,
    category: "Project"
  },
  {
    date: "October 2024",
    title: "Ranked Top 11% In A Kaggle Competition",
    description: "I participated in a kaggle competition where I ranked top 11% on the leaderboard in the whole world.",
    icon: FaTrophy,
    category: "Achievement"
  },
  {
    date: "December 2024",
    title: "Published My First YouTube Video",
    description: "Created a machine learning youtube channel and published my first YouTube which was about gradients.",
    icon: FaVideo,
    category: "Project"
  },
  {
    date: "18th June 2025",
    title: "Became A Notebooks Expert On Kaggle",
    description: "I earned my notebooks expert tier with a site-wide rank of 2,107 of 56,775",
    icon: FaTrophy,
    category: "Achievement"
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
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        setAnimationProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => { isSubscribed = false; window.removeEventListener('scroll', handleScroll); };
  }, []);

  useEffect(() => {
    observersRef.current = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisibleItems(prev => new Set([...prev, index]));
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' });
      observer.observe(ref);
      return observer;
    });
    return () => { observersRef.current.forEach(observer => observer?.disconnect()); };
  }, []);

  return (
    <section
      id="milestones-section"
      ref={timelineRef}
      className="relative w-full bg-accent text-accent-text font-sans overflow-hidden"
    >
      <TimelineBanner />

      <div className="relative py-24 md:py-32">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:transform md:-translate-x-1/2">
            <div
              className="h-full bg-accent-text"
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
                className={`relative flex items-center mb-12`}
                style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.6s ease-out', transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`absolute left-4 md:left-1/2 w-8 h-8 bg-accent-text border-2 border-accent
                            flex items-center justify-center z-10 
                            transform -translate-x-1/2 transition-transform duration-500 ease-out`}
                  style={{ transform: `translateX(-50%) scale(${isVisible ? 1 : 0})` }}
                >
                  <Icon className="w-4 h-4 text-accent" />
                </div>

                <div
                  className={`w-full pl-10 md:pl-0 md:w-5/12 ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: `translateX(${isVisible ? '0' : (isLeft ? '-30px' : '30px')})`,
                    transition: 'all 0.6s ease-out',
                    transitionDelay: `${100 + index * 150}ms`
                  }}
                >
                  <div className="block bg-surface text-text-primary border-2 border-border p-6 transition-all duration-200 ease-in-out shadow-[8px_8px_0px_theme(colors.shadow-accent-bg)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 active:translate-x-0 active:translate-y-0">
                    <p className="text-sm font-bold text-text-secondary mb-1">{milestone.date}</p>
                    <h3 className="text-xl font-extrabold text-text-primary mb-2">{milestone.title}</h3>
                    <p className="text-text-secondary/90 mb-4">{milestone.description}</p>
                    <span className="inline-block px-3 py-1 text-xs font-bold
                                   bg-accent-text text-accent
                                   dark:bg-transparent dark:text-accent dark:border dark:border-accent">
                      {milestone.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MilestoneTimeline;