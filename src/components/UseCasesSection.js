import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const ActivitiesBanner = () => {
  const tickerText = "MY ACTIVITIES • ";
  return (
    <div>
      <div className="bg-black text-yellow-400 py-3 w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-base font-semibold mx-4 uppercase">{tickerText.repeat(10)}</span>
          <span className="text-base font-semibold mx-4 uppercase" aria-hidden="true">{tickerText.repeat(10)}</span>
        </div>
      </div>
    </div>
  );
};

const useCasesData = [
  {
    id: 'data-analysis',
    tabName: 'Data Analysis & Storytelling',
    tabDescription: 'Explore my data analysis projects',
    cards: [
      {
        title: 'Kaggle Competitions',
        description: 'Deep dives into structured datasets, performing data cleaning, EDA, and feature engineering to achieve high leaderboard rankings.',
        href: 'https://www.kaggle.com/muhumuzadeusai/competitions',
        isExternal: true,
      },
      {
        title: 'Data Stories & Visualizations',
        description: 'Transforming raw data into compelling narratives through statistical modeling and insightful data visualization techniques.',
        href: '/datastory',
        isExternal: false,
      },
    ],
  },
  {
    id: 'ml-models',
    tabName: 'Machine Learning Models',
    tabDescription: 'Explore my applied ML/DL projects',
    cards: [
      {
        title: 'Computer Vision',
        description: 'Developing and training deep learning models for tasks like image classification and object detection, such as the Plant-Disease-Detection project.',
        href: '/projects/plantvision-cv001dd',
        isExternal: false,
      },
      {
        title: 'YouTube Content Creation',
        description: 'Breaking down complex ML/DL topics, math concepts, and coding tutorials to make them accessible to a wider audience.',
        href: 'https://www.youtube.com/@deusML',
        isExternal: false,
      },
    ],
  },
];

// Card Component with proper link handling
const UseCaseCard = ({ title, description, href, isExternal }) => {
  const commonClasses = "group block bg-white border-2 border-black p-8 h-full flex flex-col justify-between shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-200 ease-in-out";
  
  const content = (
    <>
      <div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="flex justify-end mt-6">
        <FaArrowRight className="transform transition-transform group-hover:translate-x-1" />
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
      >
        {content}
      </a>
    );
  } else {
    return (
      <a 
        href={href}
        className={commonClasses}
      >
        {content}
      </a>
    );
  }
};


export default function UseCasesSection() {
  const [activeTab, setActiveTab] = useState(useCasesData[0].id);

  const activeContent = useCasesData.find((tab) => tab.id === activeTab);

  return (
    <section className="bg-yellow-400 text-black font-sans">
      
      <ActivitiesBanner />

      <div className="container mx-auto px-4 py-20 lg:py-28">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Things I Have Done Regarding Data science and ML/DL
          </h2>
          {/* Text color for better contrast on yellow */}
          <p className="mt-4 text-lg text-black">
            Explore my activities in the datascience space.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mt-12 max-w-lg mx-auto">
          <div className="relative flex border-b-2 border-gray-200">
            {useCasesData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-1/2 text-center py-4 focus:outline-none"
              >
                <span className={`font-bold transition-colors ${activeTab === tab.id ? 'text-black' : 'text-gray-700 hover:text-black'}`}>
                  {tab.tabName}
                </span>
                <p className="text-sm text-gray-800">{tab.tabDescription}</p>
              </button>
            ))}
            <div
              className="absolute bottom-[-2px] h-1 bg-black w-1/2 transition-all duration-300 ease-in-out"
              style={{
                transform: `translateX(${activeTab === useCasesData[0].id ? '0%' : '100%'})`,
              }}
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeContent?.cards.map((card, index) => (
            <UseCaseCard
              key={index}
              title={card.title}
              description={card.description}
              href={card.href}
              isExternal={card.isExternal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}