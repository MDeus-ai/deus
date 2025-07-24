import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { SiPytorch, SiPython, SiPandas, SiDocker } from 'react-icons/si';

const PlaceholderGraphic = () => (
    <div className="relative w-full h-64 md:h-full flex items-center justify-center">
        <div className="absolute w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-accent-text/10 transform rotate-45"></div>
        <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 border-4 border-accent-text bg-accent p-4">
            <div className="w-full h-full border-2 border-accent-text flex flex-col justify-between p-2">
                <div className="flex justify-between">
                    <div className="w-4 h-4 bg-accent-text"></div>
                    <div className="w-4 h-4 bg-accent-text"></div>
                </div>
                <div className="text-center font-mono text-accent-text">
                    <p>{'// AI & DATA'}</p>
                    <p>{'<SOLUTIONS />'}</p>
                </div>
                <div className="flex justify-between">
                    <div className="w-4 h-4 bg-accent-text"></div>
                    <div className="w-4 h-4 bg-accent-text"></div>
                </div>
            </div>
        </div>
    </div>
);

export default function HeroSection() {
  return (
    <section className="bg-accent text-accent-text font-body flex flex-col justify-center overflow-hidden">
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            {/* THE FIX: Reverted to font-extrabold for impact */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-tight font-heading">
              Building Intelligent Systems with Data.
            </h1>
            <p className="mt-6 text-lg max-w-xl mx-auto md:mx-0">
              I am an open-source developer and self-taught data scientist building machine learning solutions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="https://github.com/MDeus-ai" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 bg-accent-text text-accent px-6 py-3 border-2 border-accent-text font-bold transition-all duration-300 hover:bg-transparent hover:text-accent-text">
                <FaGithub size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>See on Github</span>
              </a>
              <Link to="/blog" className="group inline-flex items-center justify-center gap-2 bg-transparent text-accent-text px-6 py-3 border-2 border-accent-text font-bold transition-all duration-300 hover:bg-accent-text hover:text-accent">
                <span>Read the blog</span>
                <span className="transform transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110">→</span>
              </Link>
            </div>
            <a href="#about-section" className="mt-6 inline-block text-sm font-semibold underline hover:opacity-70 transition-opacity duration-200">
              or read a 2 minute introduction about me
            </a>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <PlaceholderGraphic />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-4xl mx-auto">
          <div className="border border-black p-8 text-center">
            <p className="mt-2 text-base font-semibold"> Major project </p>
            <p className="text-5xl lg:text-6xl font-extrabold tracking-tighter font-heading"> PlantVision </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">Top tech stack</p>
            <div className="flex justify-center md:justify-start gap-6 mt-4">
              <SiPython size={32} className="text-accent-text" />
              <SiPytorch size={32} className="text-accent-text" />
              <SiPandas size={32} className="text-accent-text" />
              <SiDocker size={32} className="text-accent-text" />
            </div>
          </div>
        </div>
        <hr className="mt-12 md:mt-20 border-black max-w-4xl mx-auto" />
      </div>
    </section>
  );
}