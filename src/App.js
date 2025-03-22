import React from 'react';
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KagglePage from './pages/kagglePage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/PlantVisionPage';
import './App.css';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import '@fontsource/roboto-slab';

import YouTubePage from './pages/YouTubePage';
// router configuration
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} /> 
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/kaggle-competitions" element={<KagglePage />} />
          <Route path="/youtube" element={<YouTubePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;