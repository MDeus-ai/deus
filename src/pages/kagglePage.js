import React, { useState } from 'react';
import { FaGithub, FaKaggle, FaMedal, FaSearch, FaFilter } from 'react-icons/fa';
import { SiJupyter } from 'react-icons/si';
import NotebookModal from '../components/NotebookModal';

const KagglePortfolio = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotebook, setSelectedNotebook] = useState(null);

  const competitions = [
    {
      id: 1,
      title: "Loan Approval Prediction",
      description: "Predicting whether an applicant is approved for a loan using advanced machine learning techniques.",
      status: "completed",
      rank: 396,
      totalParticipants: 3858,
      score: 0.96816,
      percentile: 11,
      notebooks: [
        {
          title: "Loan Approval Prediction",
          link: "https://www.kaggle.com/code/muhumuzadeusai/loan-approval-prediction",
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
      description: "Predicting insurance premiums using various regression techniques and feature engineering.",
      status: "in-progress",
      rank: 0,
      totalParticipants: 0,
      score: 0,
      percentile: 0,
      notebooks: [
        {
          title: "Regression With Insurance Premiums📈",
          link: "https://www.kaggle.com/code/muhumuzadeusai/regression-with-insurance-premiums",
        }
      ],
      competitionLink: "https://www.kaggle.com/competitions/playground-series-s4e12/overview",
      tags: ["Regression", "Feature Selection", "XGBoost", "CatBoost", "LightGBM"],
    },
    {
      id: 3,
      title: "Multi-Class Prediction of Obesity Risk",
      description: "The goal of this competition is to use various factors to predict obesity risk in individuals, which is related to cardiovascular disease.",
      status: "completed",
      rank: 2717,
      totalParticipants: 3589,
      score: 0.89270,
      percentile: 75,
      notebooks: [
        {
          title: "Multi-Class Prediction of obesity NB",
          link: "https://www.kaggle.com/code/muhumuzadeusai/multi-class-prediction-of-obesity-nb",
        }
      ],
      competitionLink: "https://www.kaggle.com/competitions/playground-series-s4e2/overview",
      tags: ["LogisticRegression", "DecisionTrees", "XGBoost", "SVC", "GradientBoosting"],
    },
    {
      id: 4,
      title: "Regression of Used Car Prices",
      description: "The goal of this competition is to predict the price of used cars based on various attributes.",
      status: "completed",
      rank: 2736,
      totalParticipants: 3068,
      score: 67370.51847,
      percentile: 89,
      notebooks: [
        {
          title: "Regression For Used Cars",
          link: "https://www.kaggle.com/code/muhumuzadeusai/regression-for-used-cars",
        }
      ],
      competitionLink: "https://www.kaggle.com/competitions/playground-series-s4e9/overview",
      tags: ["Ensemble Learning", "Bagging Regressor", "XGB Regressor", "TruncatedSVD"],
    },
    {
      id: 5,
      title: "Binary Classification with a Bank Churn Dataset",
      description: "Predicting whether a customer continues with their account or closes it (e.g., churns).",
      status: "completed",
      rank: 3269,
      totalParticipants: 3633,
      score: 0.74318,
      percentile: 89,
      notebooks: [
        {
          title: "Binary Classification with a Bank Churn Dataset",
          link: "https://www.kaggle.com/code/muhumuzadeusai/binary-classification-with-a-bank-churn-dataset",
        }
      ],
      competitionLink: "https://www.kaggle.com/competitions/playground-series-s4e1/overview",
      tags: ["RandomForest Classifier", "SGD Classifier", "Ensemble Learning"],
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

  const handleNotebookClick = (notebook, e) => {
    e.preventDefault();
    setSelectedNotebook(notebook);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100" style={{ fontFamily: 'Roboto Slab, serif' }}>
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
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Roboto Slab, serif' }}>
              Kaggle Portfolio
            </h1>
            <div className="mt-6">
              <a 
                href="https://www.kaggle.com/muhumuzadeusai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors inline-flex justify-center"
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
              style={{ fontFamily: 'Roboto Slab, serif' }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-indigo-400">
                    {competition.title}
                  </h3>
                  <FaMedal className={`text-2xl ${getMedalColor(competition.medal)}`} />
                </div>
                
                <p className="text-indigo-200 mb-4">
                  {competition.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {competition.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-sm bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-indigo-900/30 rounded-lg p-3">
                    <div className="text-sm text-indigo-300">Rank</div>
                    <div className="text-lg font-bold">
                      {competition.rank} / {competition.totalParticipants}
                    </div>
                  </div>
                  <div className="bg-indigo-900/30 rounded-lg p-3">
                    <div className="text-sm text-indigo-300">Score</div>
                    <div className="text-lg font-bold">{competition.score}</div>
                  </div>
                  <div className="bg-indigo-900/30 rounded-lg p-3">
                    <div className="text-sm text-indigo-300">Percentile</div>
                    <div className="text-lg font-bold">Top {competition.percentile}%</div>
                  </div>
                  <div className="bg-indigo-900/30 rounded-lg p-3">
                    <div className="text-sm text-indigo-300">Status</div>
                    <div className="text-lg font-bold capitalize">{competition.status}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-indigo-300 mb-2">Notebooks</h4>
                  {competition.notebooks.map((notebook, index) => (
                    <button
                      key={index}
                      onClick={(e) => handleNotebookClick(notebook, e)}
                      className="w-full flex items-center justify-between p-3 bg-indigo-900/20 rounded-lg hover:bg-indigo-900/30 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <SiJupyter className="text-orange-400" />
                        <span>{notebook.title}</span>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <span>★</span>
                        <span>{notebook.stars}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-6 pt-4 border-t border-indigo-500/30">
                  <a 
                    href={competition.competitionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-indigo-300 hover:text-indigo-400 transition-colors"
                  >
                    <FaKaggle />
                    <span>Competition</span>
                  </a>
                  <a 
                    href={competition.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-indigo-300 hover:text-indigo-400 transition-colors"
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

      {/* Notebook Modal */}
      <NotebookModal
        notebook={selectedNotebook}
        isOpen={!!selectedNotebook}
        onClose={() => setSelectedNotebook(null)}
      />

      {/* Analytics Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-indigo-900/10 rounded-xl border border-indigo-500/30 p-6">
          <h2 className="text-2xl font-bold text-indigo-300 mb-6" style={{ fontFamily: 'Roboto Slab, serif' }}>
            Portfolio Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-900/30 rounded-lg p-4">
              <div className="text-sm text-indigo-300">Total Competitions</div>
              <div className="text-2xl font-bold">{competitions.length}</div>
            </div>
            <div className="bg-indigo-900/30 rounded-lg p-4">
              <div className="text-sm text-indigo-300">Completed</div>
              <div className="text-2xl font-bold">
                {competitions.filter(comp => comp.status === 'completed').length}
              </div>
            </div>
            <div className="bg-indigo-900/30 rounded-lg p-4">
              <div className="text-sm text-indigo-300">In Progress</div>
              <div className="text-2xl font-bold">
                {competitions.filter(comp => comp.status === 'in-progress').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-indigo-300" style={{ fontFamily: 'Roboto Slab, serif' }}>
            <p>Portfolio last updated: December 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Kaggle Portfolio Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center" style={{ fontFamily: 'Roboto Slab, serif' }}>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h1>
            <p className="text-indigo-300 mb-4">We're sorry, but there was an error loading the portfolio.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap the main component with ErrorBoundary
const KagglePortfolioWithErrorBoundary = () => (
  <ErrorBoundary>
    <KagglePortfolio />
  </ErrorBoundary>
);

export default KagglePortfolioWithErrorBoundary;