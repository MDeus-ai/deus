import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from '../ThemeToggle';

const navItems = [
    { label: "Projects", href: "#", dropdown: [ { title: "PlantVision", description: "A deeplearning system for predicting plant diseases", href: "/projects/plantvision-cv001dd", tag: "In development" }, ] },
    { label: "Blog Posts", href: "/blog", dropdown: [ { title: "Continuous Integration (CI) and Unit Testing: Lessons from Building PlantVision", description: "How automation and testing helped me catch bugs early and move fast", href: "/blog/ci-unit-tests", tag: "New"}, { title: "The Anatomy of a Professional Machine Learning Project: A Guide to Structure and Sanity", description: "A comprehensive guide to understanding how real-world machine learning projects are structured", href: "/blog/ml-project-structure", tag: "New" }, { title: "Just-In-Time Learning Framework", description: "My new framework for learning concepts and working on projects", href: "/blog/just_in_time_learning"}, { title: "Batch Normalization Crush Course", description: "Understanding how batch normalization helps NNs", href: "/blog/BatchNormalization" }, ] },
    { label: "About Me", to: "/#about-section" },
    { label: "Milestones", to: "/#milestones-section" },
];

const DropdownMenu = ({ items, onLinkClick }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2, ease: "easeOut" }} className="absolute top-full mt-4 left-0 z-20">
    <div className="bg-surface text-text-primary p-2 rounded-md shadow-2xl min-w-[380px] border border-border/20">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Link to={item.href} className="block p-3 hover:bg-white/10 dark:hover:bg-white/5 rounded-md transition-colors" onClick={onLinkClick}>
            <div className="flex items-center justify-between gap-4">
              <p className="font-bold text-text-primary">{item.title}</p>
              {item.tag && (<span className="whitespace-nowrap bg-accent text-accent-text text-xs font-bold px-2 py-1 rounded">{item.tag}</span>)}
            </div>
            <p className="text-sm text-text-secondary mt-1">{item.description}</p>
          </Link>
          {index < items.length - 1 && <hr className="border-border/10 mx-3" />}
        </React.Fragment>
      ))}
    </div>
  </motion.div>
);

export default function Navbar() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef(null);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const lastScrollY = useRef(0);
    const { pathname } = useLocation();
    const isBlogPostPage = pathname.startsWith('/blog/') && pathname.length > 6;

    useEffect(() => { const handleScroll = () => { if (!isBlogPostPage) { setIsNavVisible(true); return; } const currentScrollY = window.scrollY; if (currentScrollY < 100) setIsNavVisible(true); else if (currentScrollY > lastScrollY.current) setIsNavVisible(false); else setIsNavVisible(true); lastScrollY.current = currentScrollY; }; window.addEventListener('scroll', handleScroll, { passive: true }); return () => window.removeEventListener('scroll', handleScroll); }, [isBlogPostPage]);
    useEffect(() => { if (!isBlogPostPage) setIsNavVisible(true); }, [pathname, isBlogPostPage]);
    const handleDropdownLinkClick = () => setOpenDropdown(null);
    useEffect(() => { const handleClickOutside = (event) => { if (navRef.current && !navRef.current.contains(event.target)) setOpenDropdown(null); }; document.addEventListener("mousedown", handleClickOutside); return () => document.removeEventListener("mousedown", handleClickOutside); }, []);
    const handleNavClick = (label) => setOpenDropdown(openDropdown === label ? null : label);
    const handleContactClick = (e) => {
      e.preventDefault();
      window.location.href = 'mailto:muhumuzadeus.ai@gmail.com';
      setIsMenuOpen(false);
    };


  return (
    <header className={`fixed top-0 left-0 w-full bg-accent dark:bg-background text-accent-text dark:text-text-primary border-b-4 border-border dark:border-accent z-50 font-body transition-all duration-300 ease-in-out ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div ref={navRef} className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-4xl font-extrabold tracking-tighter font-heading">DEUS .</Link>
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <>
                    <button onClick={() => handleNavClick(item.label)} className="flex items-center gap-1.5 text-base font-bold transition-colors hover:opacity-70">
                      <span>{item.label}</span>
                      <ChevronDown size={20} className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && <DropdownMenu items={item.dropdown} onLinkClick={handleDropdownLinkClick} />}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link to={item.to} className="text-base font-bold transition-colors hover:opacity-70">
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <button
            onClick={handleContactClick}
            className="inline-block bg-accent text-accent-text dark:bg-surface dark:text-accent px-6 py-2.5 border-2 border-border font-bold transition-all duration-200 hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 active:translate-x-0 active:translate-y-0 shadow-[6px_6px_0px_theme(colors.shadow)]"
          >
            Contact me
          </button>
          <ThemeToggle />
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
       {isMenuOpen && (
         <div className="md:hidden bg-accent dark:bg-background border-t border-border dark:border-accent">
           <nav className="flex flex-col items-center p-6 space-y-4">
             {navItems.map((item) => (
               item.dropdown ? (
                 <div key={item.label} className="text-center w-full pb-4 border-b border-border/20 dark:border-accent/20">
                   <h3 className="text-lg font-bold mb-2">{item.label}</h3>
                   <div className="space-y-2">
                     {item.dropdown.map(subItem => (
                       <Link key={subItem.title} to={subItem.href} className="block text-sm text-accent-text/80 dark:text-text-primary/80 hover:text-accent-text dark:hover:text-text-primary" onClick={() => setIsMenuOpen(false)}>{subItem.title}</Link>
                     ))}
                   </div>
                 </div>
               ) : (
                 <Link key={item.label} to={item.to} className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>{item.label}</Link>
               )
             ))}
             <div className="mt-4 pt-4 border-t border-border/20 dark:border-accent/20 w-full flex flex-col items-center gap-4">
               <button
                  onClick={handleContactClick}
                  className="inline-block bg-accent text-accent-text dark:bg-surface dark:text-accent px-6 py-2.5 border-2 border-border font-bold transition-all duration-200 hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 active:translate-x-0 active:translate-y-0 shadow-[6px_6px_0px_theme(colors.shadow)]"
                >
                  Contact me
                </button>
               <ThemeToggle />
             </div>
           </nav>
         </div>
       )}
    </header>
  );
}