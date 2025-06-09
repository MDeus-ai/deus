import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

// ===================================================================================
//
//  DATA STORIES CONTENT
//  This is the central source of truth for all your data stories.
//  To add, remove, or edit a story, just modify this array.
//
// ===================================================================================
export const dataStories = [
  {
    id: 'titanic-data-analysis',
    title: 'Titanic: A Deep Dive into the Data',
    description: 'Using the famous Kaggle dataset to uncover the patterns of survival and tragedy aboard the Titanic in 1912.',
    coverImage: '/assets/datastories_assets/images/titanic.jpg',
    date: 'March 2024',
    tags: ['Pandas', 'Seaborn', 'Classification', 'EDA'],
    notebookUrl: '/assets/datastories_assets/notebooks/titanic_story_nb.ipynb',
    featured: true,
    summary: "This analysis goes beyond surface-level statistics, exploring correlations between passenger class, gender, age, and survival rates through detailed visualizations and statistical modeling.",
    sections: [
        {
            // type: 'writeup',
            // title: 'Introduction: The Unsinkable Story',
            // content: 'The sinking of the Titanic is one of the most infamous shipwrecks in history. This data story uses passenger data to explore the human element behind the numbers. We will analyze what sorts of people were likely to survive and apply basic machine learning to predict survival.',
        },
        {
            // type: 'visualization',
            // title: 'Survival Rates by Passenger Class',
            // description: 'A stark visualization showing the survival disparity between first, second, and third-class passengers.',
            // imageUrl: '/assets/images/datastories/placeholder-viz-1.png'
        },
        {
            // type: 'writeup',
            // title: 'Code Highlights & Key Findings',
            // content: 'The core of the analysis was performed using Pandas for data manipulation and Seaborn for plotting. A key finding was the significant role of gender in survival, where female passengers had a much higher survival rate across all classes. The code snippet below shows how we cleaned the age data by filling in missing values.',
        },
        // {
        //     type: 'code',
        //     code: `
        //           # Fill missing age values with the median
        //           titanic_df['Age'].fillna(titanic_df['Age'].median(), inplace=True)

        //           # Convert 'Sex' column to numerical values
        //           titanic_df['Sex'] = titanic_df['Sex'].map({'male': 0, 'female': 1}).astype(int)

        //           print("Data cleaning complete. No missing values remain in key columns.")
        //           `
        // }
    ]
  },
  // To add a new story, copy the object above and paste it here, changing the details.
];
// ===================================================================================
//  END OF CONTENT AREA
// ===================================================================================


const StoryCard = ({ story }) => {
  return (
    <Link
      to={`/datastory/${story.id}`}
      className="group block bg-gray-50 border-2 border-black h-full
                 transition-all duration-300 ease-in-out
                 hover:shadow-[8px_8px_0px_#000] hover:-translate-x-1 hover:-translate-y-1"
    >
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 h-56 border-b-2 border-black">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = '/assets/images/placeholder-data-story.jpg'; }}
          />
        </div>
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <p className="text-xs text-gray-500 mb-2">{story.date}</p>
            <h3 className="text-xl font-bold mb-3 line-clamp-2">{story.title}</h3>
            <p className="text-gray-600 line-clamp-3 mb-4">{story.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {story.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
                {tag}
              </span>
            ))}
            {story.tags.length > 3 && (
              <span className="px-2 py-1 text-xs font-bold bg-gray-200 text-gray-700 border border-gray-300">
                +{story.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};


const DataStoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStories = useMemo(() => {
    if (!searchTerm) return dataStories;
    const lowercasedFilter = searchTerm.toLowerCase();
    return dataStories.filter(story =>
      story.title.toLowerCase().includes(lowercasedFilter) ||
      story.description.toLowerCase().includes(lowercasedFilter) ||
      story.tags.some(tag => tag.toLowerCase().includes(lowercasedFilter))
    );
  }, [searchTerm]);

  const featuredStory = useMemo(() => dataStories.find(s => s.featured === true) || dataStories[0], []);

  return (
    <div className="bg-white text-black font-sans">
      <section className="bg-yellow-400 border-b-4 border-black">
        <div className="container mx-auto px-4 pt-24 pb-16 lg:pt-28 lg:pb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-center">Data Stories</h1>
          <p className="text-lg text-black/80 max-w-2xl mx-auto text-center">
            A collection of my data science projects, from analysis and visualization to statistical modeling and machine learning.
          </p>
        </div>
      </section>

      <main className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          {featuredStory && (
            <div className="mb-20">
              <h2 className="text-4xl font-extrabold tracking-tighter mb-8 text-left">Featured Story</h2>
              <Link
                to={`/datastory/${featuredStory.id}`}
                className="group block bg-gray-50 border-2 border-black
                            transition-all duration-300 ease-in-out
                            hover:shadow-[8px_8px_0px_#000] hover:-translate-x-1 hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="flex-shrink-0 md:w-5/12 lg:w-1/2 border-b-2 md:border-b-0 md:border-r-2 border-black">
                    <img src={featuredStory.coverImage} alt={featuredStory.title} className="w-full h-full object-cover min-h-[250px]" />
                  </div>
                  <div className="p-8 flex flex-col justify-center flex-grow md:w-7/12 lg:w-1/2">
                    <p className="text-sm text-gray-500 mb-2">{featuredStory.date}</p>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">{featuredStory.title}</h3>
                    <p className="text-gray-600 line-clamp-3 mb-6">{featuredStory.description}</p>
                    <p className="text-black font-bold group-hover:underline">Read Full Story →</p>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div className="bg-gray-100 p-8 mb-16">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="SEARCH FOR A STORY"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-b-2 border-black py-3 pl-2 pr-10 text-black placeholder:text-gray-500 placeholder:font-bold placeholder:tracking-widest focus:outline-none focus:border-yellow-400"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-black" size={24} />
            </div>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tighter mb-8 text-left">All Stories</h2>
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredStories.map(story => <StoryCard key={story.id} story={story} />)}
            </div>
          ) : (
             <div className="text-center py-16 col-span-full">
                <h3 className="text-xl text-gray-700">No stories match your search.</h3>
                <p className="text-gray-500">Try a different keyword or check back later!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DataStoriesPage;