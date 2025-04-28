import React, { useState, useEffect } from 'react';
import { FaKaggle, FaSearch, FaFilter } from 'react-icons/fa';
import { SiJupyter } from 'react-icons/si';
import NotebookModal from '../components/NotebookModal';
import { FaGithub } from 'react-icons/fa'; 

// --- Portfolio Data ---
// IMPORTANT: Manually update this array when you complete competitions,
// add new notebooks, or want to refresh ranks/scores.
const competitionsData = [
  {
    id: 1,
    title: "Loan Approval Prediction",
    description: "Predicting whether an applicant is approved for a loan using advanced machine learning techniques.",
    // Update status to 'completed' when finished
    status: "completed", // 'completed' or 'in-progress'
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
    lastModified: "2024-07-28", // Optional: Add a manual date for sorting/reference if needed
  },
  {
    id: 2,
    title: "Regression with an Insurance Dataset",
    description: "Predicting insurance premiums using various regression techniques and feature engineering.",
    status: "completed",
    rank: 576,
    totalParticipants: 2390,
    score: 1.04726,
    percentile: 24,
    notebooks: [
      {
        title: "Regression With Insurance Premiums📈",
        link: "https://www.kaggle.com/code/muhumuzadeusai/regression-with-insurance-premiums",
      }
    ],
    competitionLink: "https://www.kaggle.com/competitions/playground-series-s4e12/overview",
    tags: ["Regression", "Feature Selection", "XGBoost", "CatBoost", "LightGBM"],
    lastModified: "2024-07-20",
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
    lastModified: "2024-05-15",
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
    lastModified: "2024-06-10",
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
    lastModified: "2024-04-01",
  },
  {
    id: 6,
    title: "Predict Podcast Listening Time",
    description: "Predicting listening time of a podcast episode.",
    // Change status to 'completed' when you are done
    status: "in-progress",
    rank: 0, // Update when you have a rank
    totalParticipants: 0, // Update when known
    score: 0, // Update when you have a score
    percentile: 0, // Update when calculated
    notebooks: [
      {
        title: "Podcast Listening Time🎙️",
        link: "https://www.kaggle.com/code/muhumuzadeusai/podcast-listening-time",
      }
    ],
    competitionLink: "https://www.kaggle.com/competitions/playground-series-s5e4/overview",
    tags: ["Pandas", "Regression", "Ensemble Learning"],
    lastModified: "2024-08-01", // Update when you make changes
  },
  // --- Add new competitions here ---
  // {
  //   id: 7,
  //   title: "New Competition Title",
  //   description: "Description...",
  //   status: "in-progress", // or "completed"
  //   rank: 0,
  //   totalParticipants: 0,
  //   score: 0,
  //   percentile: 0,
  //   notebooks: [ { title: "Notebook Title", link: "..." } ],
  //   competitionLink: "...",
  //   tags: ["Tag1", "Tag2"],
  //   lastModified: "YYYY-MM-DD",
  // },
];



const KagglePortfolio = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [competitions] = useState(competitionsData);

  useEffect(() => {
    document.title = 'Kaggle | Muhumuza Deus';
    return () => {
      document.title = 'Muhumuza Deus';
    };
  }, []);

  // --- Dynamic Calculations ---
  const totalCompetitions = competitions.length;
  const completedCount = competitions.filter(comp => comp.status === 'completed').length;
  const inProgressCount = competitions.filter(comp => comp.status === 'in-progress').length;

  // Calculate the last updated date dynamically
  const lastUpdatedDate = new Date();
  const formattedLastUpdated = lastUpdatedDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      // timeZoneName: 'short' // Optional: add time and timezone
  });
  // --- End of Dynamic Calculations ---


  // Filtering logic remains the same
  const filteredCompetitions = competitions
    .filter(comp => filter === 'all' || comp.status.toLowerCase() === filter) // Ensure case-insensitive status check
    .filter(comp =>
      comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase()) || // Optional: search description
      comp.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const handleNotebookClick = (notebook, e) => {
    e.preventDefault();
    // Ensure NotebookModal component is imported and works correctly
    if (typeof NotebookModal !== 'undefined') {
        setSelectedNotebook(notebook);
    } else {
        console.warn("NotebookModal component not found. Cannot open modal.");
        // Fallback: Open link directly if modal fails
        window.open(notebook.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1b3c] text-gray-100" style={{ fontFamily: 'Roboto Slab, serif' }}>
      {/* Header Section */}
      <header className="bg-[#1a1b3c] py-20 flex items-center justify-center">
        {/* ... (header content remains the same) ... */}
         <div className="max-w-7xl mx-auto px-4">
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
        {/* ... (filter and search UI remains the same) ... */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <FaFilter className="text-indigo-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg px-8 py-2 focus:outline-none focus:border-indigo-500 text-gray-100" // Added text-gray-100
              style={{ fontFamily: 'Roboto Slab, serif' }}
            >
              <option value="all">All Competitions</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option> {/* Ensure value matches status */}
            </select>
          </div>

          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search competitions or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 bg-indigo-900/20 border border-indigo-500/30 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-indigo-500 text-gray-100" // Added text-gray-100
              style={{ fontFamily: 'Roboto Slab, serif' }}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
          </div>
        </div>

        {/* Competition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitions.length > 0 ? (
              filteredCompetitions.map((competition) => (
                <div
                  key={competition.id}
                  className="bg-[#1a1a2e] rounded-lg border border-indigo-500/30 hover:border-indigo-400 transition-all duration-300 overflow-hidden flex flex-col" // Added flex flex-col
                  style={{ fontFamily: 'Roboto Slab, serif' }}
                >
                  <div className="p-4 flex-grow"> {/* Added flex-grow */}
                    <h3 className="text-lg font-bold text-indigo-400 mb-2">
                      {competition.title}
                    </h3>

                    <p className="text-indigo-200 text-sm mb-3">
                      {competition.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {competition.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 text-xs bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {competition.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-xs bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20">
                          +{competition.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Display Rank/Score only if completed or has meaningful values */}
                    {(competition.status === 'completed' || competition.rank > 0) && (
                        <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-indigo-900/30 rounded-lg p-2">
                            <div className="text-xs text-indigo-300">Rank</div>
                            <div className="text-sm font-bold">
                            {competition.rank > 0 ? `${competition.rank} / ${competition.totalParticipants}` : 'N/A'}
                            </div>
                        </div>
                        <div className="bg-indigo-900/30 rounded-lg p-2">
                            <div className="text-xs text-indigo-300">Percentile</div>
                            <div className="text-sm font-bold">
                            {competition.percentile > 0 ? `Top ${competition.percentile}%` : 'N/A'}
                            </div>
                        </div>
                        {/* Optional: Display score */}
                        {<div className="bg-indigo-900/30 rounded-lg p-2 col-span-2">
                            <div className="text-xs text-indigo-300">Score</div>
                            <div className="text-sm font-bold">{competition.score || 'N/A'}</div>
                        </div>}
                        </div>
                    )}

                    {/* Status Indicator */}
                    <div className="mb-3">
                        <span className={`px-2 py-0.5 text-xs rounded-full border ${
                            competition.status === 'completed'
                            ? 'bg-green-500/10 text-green-300 border-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20'
                        }`}>
                            {competition.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                    </div>

                    {/* Notebooks */}
                    <div className="space-y-2 mb-3"> {/* Added mb-3 */}
                      {competition.notebooks.map((notebook, index) => (
                        <button
                          key={index}
                          onClick={(e) => handleNotebookClick(notebook, e)}
                          className="w-full flex items-center justify-between p-2 bg-indigo-900/20 rounded-lg hover:bg-indigo-900/30 transition-colors text-left" // Added text-left
                        >
                          <div className="flex items-center gap-2">
                            <SiJupyter className="text-orange-400 flex-shrink-0" /> {/* Added flex-shrink-0 */}
                            <span className="text-sm text-indigo-200 hover:text-indigo-100 truncate">{notebook.title}</span> {/* Added truncate */}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Links - Pushed to bottom */}
                  <div className="mt-auto p-4 pt-3 border-t border-indigo-500/30 flex flex-wrap gap-x-4 gap-y-1"> {/* Added flex-wrap */}
                    <a
                      href={competition.competitionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-100 transition-colors"
                    >
                      <FaKaggle />
                      <span>Competition</span>
                    </a>
                     {/* Optional: Add GitHub Link if available */}
                    {competition.githubRepo && (
                         <a
                         href={competition.githubRepo}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-100 transition-colors"
                         >
                         <FaGithub /> {/* Make sure FaGithub is imported from 'react-icons/fa' */}
                         <span>GitHub Repo</span>
                         </a>
                     )}
                  </div>
                </div>
              ))
          ) : (
            <p className="text-indigo-300 md:col-span-2 lg:col-span-3 text-center">
              No competitions found matching your criteria.
            </p>
          )}
        </div>
      </div>

      {/* Notebook Modal */}
      {typeof NotebookModal !== 'undefined' && ( // Conditionally render modal
        <NotebookModal
          notebook={selectedNotebook}
          isOpen={!!selectedNotebook}
          onClose={() => setSelectedNotebook(null)}
        />
      )}

      {/* Analytics Section - Updated with dynamic values */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-indigo-900/10 rounded-xl border border-indigo-500/30 p-4">
          <h2 className="text-xl font-bold text-indigo-300 mb-4" style={{ fontFamily: 'Roboto Slab, serif' }}>
            Portfolio Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-900/30 rounded-lg p-3">
              <div className="text-sm text-indigo-300">Total Competitions</div>
              {/* Use dynamic value */}
              <div className="text-xl font-bold">{totalCompetitions}</div>
            </div>
            <div className="bg-indigo-900/30 rounded-lg p-3">
              <div className="text-sm text-indigo-300">Completed</div>
              {/* Use dynamic value */}
              <div className="text-xl font-bold">{completedCount}</div>
            </div>
            <div className="bg-indigo-900/30 rounded-lg p-3">
              <div className="text-sm text-indigo-300">In Progress</div>
              {/* Use dynamic value */}
              <div className="text-xl font-bold">{inProgressCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Updated with dynamic date */}
      <footer className="bg-indigo-900/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-indigo-300" style={{ fontFamily: 'Roboto Slab, serif' }}>
            {/* Use dynamic value */}
            <p>Last Updated : {formattedLastUpdated}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Error Boundary Component (Keep as is)
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
    // You could log this error to an external service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center p-4" style={{ fontFamily: 'Roboto Slab, serif' }}>
          <div className="text-center bg-red-900/20 border border-red-500/30 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Oops! Something went wrong</h1>
            <p className="text-indigo-200 mb-4">We encountered an error loading the Kaggle portfolio. Please try refreshing the page.</p>

            <button
              onClick={() => this.setState({ hasError: false, error: null })} // Allow trying again without full reload
              // onClick={() => window.location.reload()} // Alternative: force reload
              className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors text-white"
            >
              Try Again
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