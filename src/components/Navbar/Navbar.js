// src/components/Navbar.js

import React, { useState, useEffect, useRef } from 'react';
// Import useLocation to detect the current page route
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
    {
      label: "Projects",
      href: "#",
      dropdown: [
        { title: "PlantVision", description: "A deeplearning system for predicting plant diseases", href: "#", tag: "In development" },
        // { title: "  ", description: "  ", href: "#" },
        // { title: "  ", description: "  ", href: "#", tag: "New" }
      ]
    },
    {
      label: "Blog Posts",
      href: "/blog", // Corrected link to the blog index page
      dropdown: [
        { title: "Batch Normalization Crush Course", description: "Understanding how batch normalization helps NNs", href: "#" },
        { title: "Understanding Neural Networks", description: "Quick tour into the math that powers simple MLPs", href: "#" },
      ]
    },
    {
      label: "About Me",
      href: "/#about-section"
    },
    {
      label: "Milestones",
      href: "/#milestones-section"
    },
];

const HardShadowButton = ({ href, children, className = '' }) => (
    <a href={href} className={`group relative inline-block text-black ${className}`}>
      <span className="relative z-10 block border-2 border-black bg-yellow-400 px-5 py-2 text-center font-bold transition-transform duration-150 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 -translate-x-1 -translate-y-1">
        {children}
      </span>
      <span className="absolute inset-0 border-2 border-black bg-black"></span>
    </a>
);

const DropdownMenu = ({ items }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full mt-4 left-0 z-20"
    >
      <div className="bg-black text-white p-2 rounded-md shadow-2xl min-w-[380px]">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <a href={item.href} className="block p-3 hover:bg-zinc-800 rounded-md transition-colors">
              <div className="flex items-center justify-between gap-4">
                <p className="font-bold text-white">{item.title}</p>
                {item.tag && (
                   <span className="whitespace-nowrap bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                      {item.tag}
                   </span>
                )}
              </div>
              <p className="text-sm text-zinc-400 mt-1">{item.description}</p>
            </a>
            {index < items.length - 1 && <hr className="border-zinc-700 mx-3" />}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  
  // --- START: Scroll-based visibility logic ---
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();

  // Check if the current page is a blog post page (e.g., /blog/my-post)
  // This is true if the path starts with /blog/ and has more characters after it.
  const isBlogPostPage = pathname.startsWith('/blog/') && pathname.length > 6;

  useEffect(() => {
    const handleScroll = () => {
      // Only apply the hide/show logic on blog post pages.
      if (!isBlogPostPage) {
        setIsNavVisible(true);
        return;
      }
      
      const currentScrollY = window.scrollY;

      // Always show navbar at the very top of the page.
      if (currentScrollY < 100) {
        setIsNavVisible(true);
      } 
      // Hide navbar when scrolling down.
      else if (currentScrollY > lastScrollY.current) {
        setIsNavVisible(false);
      } 
      // Show navbar when scrolling up.
      else {
        setIsNavVisible(true);
      }
      
      // Update the last scroll position.
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up the event listener when the component unmounts.
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isBlogPostPage]); // Re-run this effect if we navigate to/from a blog page.

  // Immediately make navbar visible if we navigate away from a blog post page.
  useEffect(() => {
    if (!isBlogPostPage) {
      setIsNavVisible(true);
    }
  }, [pathname, isBlogPostPage]);
  // --- END: Scroll-based visibility logic ---


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };
  
  return (
    // --- MODIFIED: Added transition and conditional transform classes ---
    <header 
      className={`fixed top-0 left-0 w-full bg-yellow-400 text-black border-b-4 border-black z-50 font-sans transition-transform duration-300 ease-in-out ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div ref={navRef} className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-4xl font-extrabold tracking-tighter">DEUS.</Link>
        
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => handleNavClick(item.label)}
                      className="flex items-center gap-1.5 text-base font-bold transition-colors hover:text-zinc-600"
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        size={20} 
                        className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && <DropdownMenu items={item.dropdown} />}
                    </AnimatePresence>
                  </>
                ) : (
                  <a href={item.href} className="flex items-center gap-1.5 text-base font-bold transition-colors hover:text-zinc-600">
                    <span>{item.label}</span>
                  </a>
                )}
              </div>
            ))}
          </nav>
          
          <HardShadowButton href="/#footer">Contact me</HardShadowButton>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

       {isMenuOpen && (
         <div className="md:hidden bg-yellow-400 border-t border-black">
           <nav className="flex flex-col items-center p-6 space-y-4">
             {navItems.map((item) => (
               item.dropdown ? (
                 <div key={item.label} className="text-center w-full pb-4 border-b border-black/10">
                   <h3 className="text-lg font-bold mb-2">{item.label}</h3>
                   <div className="space-y-2">
                     {item.dropdown.map(subItem => (
                       <Link key={subItem.title} to={subItem.href} className="block text-sm text-gray-800 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                         {subItem.title}
                       </Link>
                     ))}
                   </div>
                 </div>
               ) : (
                 <a key={item.label} href={item.href} className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>
                   {item.label}
                 </a>
               )
             ))}
             <div className="mt-4 pt-4 w-full flex justify-center">
               <HardShadowButton href="/#footer">Contact me</HardShadowButton>
             </div>
           </nav>
         </div>
       )}
    </header>
  );
}