import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ActivitiesBanner = () => {
  const tickerText = "MY ACTIVITIES • ";
  return (
    <div>
      <div className="bg-black dark:bg-accent text-yellow-400 dark:text-accent-text py-3 w-full overflow-hidden">
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
        title: 'Computer Vision',
        description: 'Developing and training deep learning models for tasks like image classification and object detection, such as the Plant-Disease-Detection project.',
        href: '/projects/plantvision-cv001dd',
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
        title: 'YouTube Content Creation',
        description: 'Breaking down complex ML/DL topics, math concepts, and coding tutorials to make them accessible to a wider audience.',
        href: 'https://www.youtube.com/@mltermina',
        isExternal: true,
      },
    ],
  },
];

const UseCaseCard = ({ title, description, href, isExternal }) => {
  const cardContent = (
    <div className="bg-surface border-2 border-border p-8 h-full flex flex-col justify-between transition-all duration-200 ease-in-out shadow-[8px_8px_0px_theme(colors.shadow-accent-bg)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 active:translate-x-0 active:translate-y-0">
      <div>
        <h3 className="text-xl font-bold mb-3 text-text-primary dark:text-accent">{title}</h3>
        <p className="text-text-secondary">{description}</p>
      </div>
      <div className="flex justify-end mt-6 text-text-primary dark:text-accent">
        <FaArrowRight className="transform transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );

  if (isExternal) {
    return ( <a href={href} target="_blank" rel="noopener noreferrer" className="group block h-full">{cardContent}</a> );
  } else {
    return ( <Link to={href} className="group block h-full">{cardContent}</Link> );
  }
};

export default function UseCasesSection() {
  const [activeTab, setActiveTab] = useState(useCasesData[0].id);
  const activeContent = useCasesData.find((tab) => tab.id === activeTab);

  return (
    <section className="bg-accent text-accent-text font-sans">
      <ActivitiesBanner />
      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Things I Have Done Regarding Data science and ML/DL
          </h2>
          <p className="mt-4 text-lg text-accent-text">
            Explore my activities in the datascience space.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <div className="relative flex border-b-2 border-accent-text/20">
            {useCasesData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-1/2 text-center py-4 focus:outline-none"
              >
                <span className={`font-bold transition-colors ${activeTab === tab.id ? 'text-accent-text' : 'text-accent-text/70 hover:text-accent-text'}`}>
                  {tab.tabName}
                </span>
                <p className="text-sm text-accent-text/80">{tab.tabDescription}</p>
              </button>
            ))}
            <div
              className="absolute bottom-[-2px] h-1 bg-accent-text w-1/2 transition-all duration-300 ease-in-out"
              style={{ transform: `translateX(${activeTab === useCasesData[0].id ? '0%' : '100%'})` }}
            />
          </div>
        </div>
        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeContent?.cards.map((card, index) => (
            <UseCaseCard
              key={index}
              {...card}
            />
          ))}
        </div>
      </div>
    </section>
  );
}