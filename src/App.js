import React from 'react';
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KagglePage from './pages/kagglePage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import './App.css';
import '@fontsource/roboto-slab';


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
          <Route path="/kaggle-competitions" element={<KagglePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;