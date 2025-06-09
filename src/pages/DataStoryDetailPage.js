import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dataStories } from './DataStoriesPage'; // Import data from the list page
import NotebookViewer from '../components/NotebookViewer';
import { FaCalendarAlt, FaCode, FaDownload, FaBookmark, FaArrowLeft } from 'react-icons/fa';

// --- Reusable Section Components ---
const WriteupSection = ({ title, content }) => (
  <div className="prose prose-lg max-w-none prose-p:text-gray-800 prose-headings:text-black">
    <h3 className="font-extrabold tracking-tight">{title}</h3>
    <p>{content}</p>
  </div>
);

const VisualizationSection = ({ title, description, imageUrl }) => (
  <figure className="my-8">
    <div className="border-2 border-black">
      <img src={imageUrl} alt={title} className="w-full h-auto" />
    </div>
    <figcaption className="text-center text-sm text-gray-600 mt-3">
      <p className="font-bold">{title}</p>
      <p>{description}</p>
    </figcaption>
  </figure>
);

const CodeSection = ({ code }) => (
  <div className="my-8">
      <div className="border-2 border-black overflow-hidden">
        <div className="bg-black text-white p-3 border-b-2 border-black"><p className="font-mono text-sm">Code Highlight</p></div>
        <pre className="bg-gray-800 text-white p-4 overflow-x-auto"><code className="language-python">{code}</code></pre>
    </div>
  </div>
);


const DataStoryDetailPage = () => {
  const { storyId } = useParams();
  const [activeTab, setActiveTab] = useState('story');
  const story = dataStories.find(s => s.id === storyId);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (story) {
      document.title = `${story.title} | Data Story`;
    }
    return () => { document.title = 'Muhumuza Deus'; };
  }, [story]);

  if (!story) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-3xl font-bold mb-4">Story Not Found</h1>
        <Link to="/datastory" className="inline-block bg-yellow-400 text-black px-6 py-3 border-2 border-black font-bold shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all duration-200">
          <FaArrowLeft className="inline mr-2" /> Back to All Stories
        </Link>
      </div>
    );
  }

  const sectionRenderMap = {
    'writeup': (section, key) => <WriteupSection key={key} {...section} />,
    'visualization': (section, key) => <VisualizationSection key={key} {...section} />,
    'code': (section, key) => <CodeSection key={key} {...section} />,
  };
  
  return (
    <div className="bg-white text-black font-sans">
      <style jsx global>{`
        /* NOTE: These styles are now applied by the NotebookViewer itself */
        /* You can keep them here for overrides or move them to a global CSS file if preferred */
      `}</style>

      <header className="bg-yellow-400 border-b-4 border-black">
        <div className="container mx-auto px-4 pt-24 pb-16 lg:pt-28 lg:pb-20">
          <Link to="/datastory" className="flex items-center text-sm font-bold mb-6 group">
            <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to All Stories
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">{story.title}</h1>
          <p className="text-lg md:text-xl text-black/80 mb-6 max-w-3xl">{story.summary || story.description}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold">
            <div className="flex items-center gap-2"><FaCalendarAlt /><span>{story.date}</span></div>
            <div className="flex flex-wrap gap-2">
              {story.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-black text-white text-xs rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="border-b-2 border-black mb-12">
          <button
            onClick={() => setActiveTab('story')}
            className={`px-6 py-3 font-bold text-lg transition-colors ${activeTab === 'story' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          ><FaBookmark className="inline-block mr-2" /> Story</button>
          <button
            onClick={() => setActiveTab('notebook')}
            className={`px-6 py-3 font-bold text-lg transition-colors ${activeTab === 'notebook' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          ><FaCode className="inline-block mr-2" /> Notebook</button>
        </div>

        {activeTab === 'story' && (
          <div className="max-w-4xl mx-auto space-y-12">
            {story.sections.map((section, index) => {
                const renderFunc = sectionRenderMap[section.type];
                return renderFunc ? renderFunc(section, index) : null;
            })}
          </div>
        )}

        {activeTab === 'notebook' && (
          <div>
            {/* The control panel for the notebook */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 p-6 bg-gray-50 border-2 border-black">
                <div>
                    <h2 className="text-2xl font-extrabold">Full Notebook</h2>
                    <p className="text-gray-600 mt-1">Explore the complete code and analysis.</p>
                </div>
                <a 
                    href={story.notebookUrl} 
                    download
                    className="group relative inline-block text-black shrink-0">
                    <span className="relative z-10 block border-2 border-black bg-yellow-400 px-5 py-2 text-center font-bold transition-transform duration-150 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 -translate-x-1 -translate-y-1">
                        <FaDownload className="inline-block mr-2" /> Download .ipynb
                    </span>
                    <span className="absolute inset-0 border-2 border-black bg-black"></span>
                </a>
            </div>

            <div className="notebook-container">
                <NotebookViewer notebookUrl={story.notebookUrl} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DataStoryDetailPage;