import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Twitter as X, 
  Linkedin,
  Mail,
  Youtube,
  Globe,
  Code,
  Sparkles
} from 'lucide-react';

const GlitchText = ({ text, className = '', glitchIntensity = 0.95, letterSpacing = 'normal', isTitle = false }) => {
  const [glitched, setGlitched] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~アイウエオカキクケコサシスセソタチツテトナニヌネノ';
  
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > glitchIntensity) {
        setIsGlitching(true);
        const glitchedText = text
          .split('')
          .map(char => Math.random() > 0.75 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
          .join('');
        setGlitched(glitchedText);
        
        setTimeout(() => {
          setGlitched(text);
          setIsGlitching(false);
        }, 100);
      }
    }, 50);
    
    return () => clearInterval(glitchInterval);
  }, [text, glitchIntensity]);

  return (
    <span 
      className={`relative inline-block ${className} ${!isTitle ? "font-['Roboto_Slab']" : ""}`}
      style={{
        textShadow: isGlitching ? '2px 2px #ff0080, -2px -2px #00ff80' : 'none',
        transition: 'text-shadow 0.1s ease-in-out',
        letterSpacing
      }}
    >
      {glitched}
    </span>
  );
};

const SocialLink = ({ icon: Icon, href, label, delay = 0 }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative p-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    <div className="absolute inset-0 bg-orange-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <Icon className="w-8 h-8 text-orange-500 group-hover:text-orange-400 transition-colors duration-300 relative z-10" />
  </motion.a>
);

const BarcodeSection = ({ phoneNumber }) => {
  const cleanPhoneNumber = phoneNumber.replace(/[^0-9+]/g, '');
  
  return (
    <motion.a
      href={`tel:${cleanPhoneNumber}`}
      className="flex flex-col items-center gap-4 group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg 
        viewBox="0 0 200 100" 
        className="w-48 h-24 text-orange-500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="200" height="100" fill="transparent"/>
        
        <g fill="currentColor">
          {/* Guard bars */}
          <rect x="10" y="10" width="2" height="60"/>
          <rect x="14" y="10" width="2" height="60"/>
          <rect x="18" y="10" width="2" height="60"/>
          
          {/* Data bars - middle section */}
          <rect x="24" y="10" width="3" height="60"/>
          <rect x="30" y="10" width="1" height="60"/>
          <rect x="34" y="10" width="2" height="60"/>
          <rect x="40" y="10" width="3" height="60"/>
          <rect x="46" y="10" width="1" height="60"/>
          <rect x="50" y="10" width="2" height="60"/>
          <rect x="56" y="10" width="3" height="60"/>
          <rect x="62" y="10" width="1" height="60"/>
          <rect x="66" y="10" width="2" height="60"/>
          <rect x="72" y="10" width="3" height="60"/>
          <rect x="78" y="10" width="1" height="60"/>
          <rect x="82" y="10" width="2" height="60"/>
          
          {/* Center guard */}
          <rect x="88" y="10" width="2" height="60"/>
          <rect x="92" y="10" width="2" height="60"/>
          <rect x="96" y="10" width="2" height="60"/>
          
          {/* More data bars */}
          <rect x="102" y="10" width="3" height="60"/>
          <rect x="108" y="10" width="1" height="60"/>
          <rect x="112" y="10" width="2" height="60"/>
          <rect x="118" y="10" width="3" height="60"/>
          <rect x="124" y="10" width="1" height="60"/>
          <rect x="128" y="10" width="2" height="60"/>
          <rect x="134" y="10" width="3" height="60"/>
          <rect x="140" y="10" width="1" height="60"/>
          <rect x="144" y="10" width="2" height="60"/>
          <rect x="150" y="10" width="3" height="60"/>
          <rect x="156" y="10" width="1" height="60"/>
          <rect x="160" y="10" width="2" height="60"/>
          
          {/* End guard bars */}
          <rect x="170" y="10" width="2" height="60"/>
          <rect x="174" y="10" width="2" height="60"/>
          <rect x="178" y="10" width="2" height="60"/>
        </g>
        
        <text
          x="100"
          y="85"
          textAnchor="middle"
          className="text-[12px] font-mono"
          fill="currentColor"
        >
          {phoneNumber}
        </text>
      </svg>
      <span className="text-gray-300 font-mono text-sm group-hover:text-orange-500 transition-colors duration-300">
        Click to call
      </span>
    </motion.a>
  );
};

export default function CyberpunkFooter() {
  const phoneNumber = "+256 776 646 758";

  return (
    <footer className="relative bg-[#1a1b3c] overflow-hidden font-['Roboto_Slab'] min-h-screen flex items-center">
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#FFA50033_1px,transparent_1px),linear-gradient(to_bottom,#FFA50033_1px,transparent_1px)] bg-[size:2rem_2rem]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-orange-500/10" />
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* CONNECT Text */}
        <div className="mb-12 sm:mb-24 text-center">
          <GlitchText 
            text="C ON NECT" 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-orange-500 tracking-wider font-mono"
            glitchIntensity={0.85}
            letterSpacing="0.15em"
            isTitle={true}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* About Section */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlitchText 
                text="Let's Build Something Amazing"
                className="text-xl sm:text-2xl font-bold text-orange-500 mb-4 sm:mb-6"
                glitchIntensity={0.97}
              />
              <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">
                Specializing in Deep Learning, Machine Learning, and Statistical Analysis. 
                Let's collaborate on data-driven solutions that push the boundaries of what's possible.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <SocialLink icon={Github} href="https://github.com/MDeus-ai" label="Github" delay={0.1} />
                <SocialLink icon={X} href="https://twitter.com/Muhumuzadeus5" label="X (Twitter)" delay={0.2} />
                <SocialLink icon={Linkedin} href="https://www.linkedin.com/in/muhumuza-deus-mugenyi-81a4a7268/" label="LinkedIn" delay={0.3} />
                <SocialLink icon={Youtube} href="https://www.youtube.com/@deusML" label="YouTube" delay={0.4} />
              </div>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="md:text-right">
            <motion.div
              className="flex flex-col gap-4 sm:gap-6 items-center md:items-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlitchText 
                text="Get in Touch"
                className="text-xl sm:text-2xl font-bold text-orange-500 mb-2 sm:mb-4"
                glitchIntensity={0.97}
              />
              <div className="flex items-center gap-2 sm:gap-3 text-gray-300 justify-end">
                <span className="text-sm sm:text-base">Kampala, Uganda</span>
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              </div>
              <a 
                href="mailto:info@example.com"
                className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-orange-500 transition-colors duration-300 justify-end"
              >
                <span className="text-sm sm:text-base">muhumuzadeus.ai@gmail.com</span>
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <div className="scale-90 sm:scale-100">
                <BarcodeSection phoneNumber={phoneNumber} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-24 pt-6 sm:pt-8 border-t border-orange-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <motion.div
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Code className="w-3 h-3 sm:w-4 sm:h-4" />
              <GlitchText 
                text="Built and Designed with"
                className="text-gray-400"
                glitchIntensity={0.99}
              />
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
              <GlitchText 
                text="By Deus"
                className="text-gray-400"
                glitchIntensity={0.99}
              />
            </motion.div>
            <div className="text-xs sm:text-sm text-gray-400">
              <GlitchText 
                text="© 2025 • Muhumuza Deus • All rights reserved"
                glitchIntensity={0.99}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}