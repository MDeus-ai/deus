// src/components/Footer.js

import React from 'react';

export default function Footer() {
  const scrollingText = "LET'S BUILD SOMETHING AMAZING TOGETHER • ";

  const connectLinks = [
    { href: "https://github.com/MDeus-ai", label: "Github" },
    { href: "https://twitter.com/Muhumuzadeus5", label: "Twitter" },
    { href: "https://www.youtube.com/@deusML", label: "YouTube" },
    { href: "https://www.linkedin.com/in/muhumuza-deus-mugenyi-81a4a7268/", label: "LinkedIn" },
    { href: "https://kaggle.com/muhumuzadeusai", label: "Kaggle" },
  ];
  
  const projectLinks = [
      { href: "https://github.com/MDeus-ai/plantvision", label: "PlantVision" },
  ];

  return (
    // --- FIX: Add the id="footer" attribute here ---
    <footer id="footer" className="bg-black text-white font-sans overflow-hidden">
      <div className="bg-black text-white py-4 border-y-2 border-gray-800">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-xl font-bold mx-4 uppercase">{scrollingText.repeat(5)}</span>
          <span className="text-xl font-bold mx-4 uppercase" aria-hidden="true">{scrollingText.repeat(5)}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="text-center mb-20 lg:mb-24">
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tighter text-white">
            Have an idea?
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <a
            href="mailto:muhumuzadeus.ai@gmail.com"
            className="inline-block mt-8 bg-yellow-400 text-black px-10 py-4 border-2 border-black 
                       font-bold text-lg
                       shadow-[8px_8px_0px_#000] hover:shadow-none 
                       hover:translate-x-2 hover:translate-y-2 
                       transition-all duration-200 ease-in-out"
          >
            Let's Collaborate
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl mx-auto">
          <div className="text-center md:text-left">
             <h3 className="text-2xl font-extrabold tracking-tighter">
                MUHUMUZA DEUS M <span className="text-yellow-400">.</span>
            </h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">
                Data Scientist
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Main Projects</h3>
            <div className="space-y-4">
              {projectLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  <span className="text-lg font-semibold uppercase tracking-wider">{link.label}</span>
                  <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-2 ml-2">→</span>
                </a>
              ))}
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Connect</h3>
            <div className="space-y-4">
              {connectLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  <span className="text-lg font-semibold uppercase tracking-wider">{link.label}</span>
                  <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-2 ml-2">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 py-6">
        <p className="text-center text-xs text-gray-500 uppercase tracking-wider">
            © {new Date().getFullYear()} Muhumuza Deus • All Rights Reserved
        </p>
      </div>
    </footer>
  );
}