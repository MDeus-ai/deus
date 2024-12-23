import React, { useState } from 'react';
import { FaGithub, FaKaggle, FaMedal, FaSearch, FaFilter} from 'react-icons/fa';
import { SiJupyter } from 'react-icons/si';

const KagglePortfolio = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const competitions = [
    {
      id: 1,
      title: "Loan Approval Prediction",
      description: "Predicting whether an applicant is approved for a loan.",
      status: "completed",
      rank: 396,
      totalParticipants: 3858,
      score: 0.96816,
      percentile: 11,
      notebooks: [
        {
          title: "Loan Approval Prediction",
          link: "https://www.kaggle.com/code/muhumuzadeusai/loan-approval-prediction?scriptVersionId=204532491",
          stars: 0
        },
      ],
      competitionLink: "https://www.kaggle.com/competitions/playground-series-s4e10",
      githubRepo: "https://github.com/MDeus-ai/My_KAGGLE_Work/tree/main/S4Ep10(Loan%20Approval%20Prediction)",
      tags: ["Classification", "Feature Engineering", "Ensemble Learning", "LightGBM", "CatBoost", "CUDA", "Optuna", "XGBoost"],
      medal: "silver"
    },
    {
      id: 2,
      title: "Regression with an Insurance Dataset",
      description: "The objectives of this challenge is to predict insurance premiums based on various factors",
      status: "in-progress",
      rank: 0,
      totalParticipants: 0,
      score: 0,
      percentile: 0,
      notebooks: [
        {
          title: "Regression with Insurance",
          link: "",
          stars: 45
        }
      ],
      competitionLink: "https://www.kaggle.com/competitions/playground-series-s4e12/overview",
      githubRepo: "https://github.com/username/house-prices-competition",
      tags: ["Regression", "Feature Selection", "XGBoost", "CatBoost", "LightGBM"],
      medal: "non"
    },
  ];

  const filteredCompetitions = competitions
    .filter(comp => filter === 'all' || comp.status === filter)
    .filter(comp => 
      comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const getMedalColor = (medal) => {
    switch(medal) {
      case 'gold': return 'text-yellow-400';
      case 'silver': return 'text-gray-400';
      case 'bronze': return 'text-amber-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Hero Section */}
      <header className="relative h-[40vh] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/assets/images/structdata/kaggle.jpg" 
            alt="Projects header"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="absolute inset-0"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold z-10" style={{ fontFamily: 'Roboto Slab, serif' }}>
              Kaggle Portfolio
            </h1>
            <div className="mt-6 flex justify-center space-x-4">
              <a 
                href="https://github.com/MDeus-ai/My_KAGGLE_Work" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-900/50 rounded-lg hover:bg-indigo-800 transition-colors"
                style={{ fontFamily: 'Roboto Slab, serif' }}
              >
                <FaGithub className="text-xl" />
                GitHub Profile
              </a>
              <a 
                href="https://www.kaggle.com/muhumuzadeusai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                style={{ fontFamily: 'Roboto Slab, serif' }}
              >
                <FaKaggle className="text-xl" />
                Kaggle Profile
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <FaFilter className="text-indigo-400" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
              style={{ fontFamily: 'Roboto Slab, serif' }}
            >
              <option value="all">All Competitions</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
          
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search competitions or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 bg-indigo-900/20 border border-indigo-500/30 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-indigo-500"
              style={{ fontFamily: 'Roboto Slab, serif' }}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
          </div>
        </div>

        {/* Competition Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCompetitions.map((competition) => (
            <div 
              key={competition.id}
              className="bg-indigo-900/10 rounded-xl border border-indigo-500/30 hover:border-indigo-400 transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-indigo-400" style={{ fontFamily: 'Roboto Slab, serif' }}>
                    {competition.title}
                  </h3>
                  <FaMedal className={`text-2xl ${getMedalColor(competition.medal)}`} />
                </div>
                
                <p className="text-indigo-200 mb-4" style={{ fontFamily: 'Roboto Slab, serif' }}>
                  {competition.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {competition.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-sm bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20"
                      style={{ fontFamily: 'Roboto Slab, serif' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-indigo-900/30 rounded-lg p-3">
                    <div className="text-sm text-indigo-300" style={{ fontFamily: 'Roboto Slab, serif' }}>Rank</div>
                    <div className="text-lg font-bold" style={{ fontFamily: 'Roboto Slab, serif' }}>{competition.rank} / {competition.totalParticipants}</div>
                  </div>
                  <div className="bg-indigo-900/30 rounded-lg p-3">
                    <div className="text-sm text-indigo-300" style={{ fontFamily: 'Roboto Slab, serif' }}>Score</div>
                    <div className="text-lg font-bold" style={{ fontFamily: 'Roboto Slab, serif' }}>{competition.score}</div>
                  </div>
                  <div className="bg-indigo-900/30 rounded-lg p-3">
                    <div className="text-sm text-indigo-300" style={{ fontFamily: 'Roboto Slab, serif' }}>Percentile</div>
                    <div className="text-lg font-bold" style={{ fontFamily: 'Roboto Slab, serif' }}>Top {competition.percentile}%</div>
                  </div>
                  <div className="bg-indigo-900/30 rounded-lg p-3">
                    <div className="text-sm text-indigo-300" style={{ fontFamily: 'Roboto Slab, serif' }}>Status</div>
                    <div className="text-lg font-bold capitalize" style={{ fontFamily: 'Roboto Slab, serif' }}>{competition.status}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-indigo-300 mb-2" style={{ fontFamily: 'Roboto Slab, serif' }}>Notebooks</h4>
                  {competition.notebooks.map((notebook, index) => (
                    <a
                      key={index}
                      href={notebook.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-indigo-900/20 rounded-lg hover:bg-indigo-900/30 transition-colors"
                      style={{ fontFamily: 'Roboto Slab, serif' }}
                    >
                      <div className="flex items-center gap-2">
                        <SiJupyter className="text-orange-400" />
                        <span>{notebook.title}</span>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <span>★</span>
                        <span>{notebook.stars}</span>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="flex justify-between mt-6 pt-4 border-t border-indigo-500/30">
                  <a 
                    href={competition.competitionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-indigo-300 hover:text-indigo-400 transition-colors"
                    style={{ fontFamily: 'Roboto Slab, serif' }}
                  >
                    <FaKaggle />
                    <span>Competition</span>
                  </a>
                  <a 
                    href={competition.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-indigo-300 hover:text-indigo-400 transition-colors"
                    style={{ fontFamily: 'Roboto Slab, serif' }}
                  >
                    <FaGithub />
                    <span>Repository</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KagglePortfolio;