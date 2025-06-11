import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/PlantVisionPage';
import './App.css';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import DataStoriesPage from './pages/DataStoriesPage';
import DataStoryDetailPage from './pages/DataStoryDetailPage';
import '@fontsource/roboto-slab';

// router configuration
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/datastory" element={<DataStoriesPage />} />
          <Route path="/datastory/:storyId" element={<DataStoryDetailPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;