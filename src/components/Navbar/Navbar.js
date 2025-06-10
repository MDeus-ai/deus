import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
    {
      label: "Projects",
      href: "#",
      dropdown: [
        { title: "PlantVision", description: "A deeplearning system for predicting plant diseases", href: "/projects/plantvision-cv001dd", tag: "In development" },
      ]
    },
    {
      label: "Blog Posts",
      href: "/blog",
      dropdown: [
        { title: "Just-In-Time Learning Framework", description: "My new framework for learning concepts and working on projects", href: "/blog/just_in_time_learning", tag: "New" },
        { title: "Batch Normalization Crush Course", description: "Understanding how batch normalization helps NNs", href: "/blog/BatchNormalization" },
        { title: "Understanding Neural Networks", description: "Quick tour into the math that powers simple MLPs", href: "/blog/advanced-ml-post" },
      ]
    },
    {
      label: "About Me",
      to: "/#about-section"
    },
    {
      label: "Milestones",
      to: "/#milestones-section"
    },
];


const HardShadowButton = ({ href, to, children, className = '', onClick, isContactButton = false }) => {
  const handleContactClick = (e) => {
    if (isContactButton) {
      e.preventDefault();
      
      // Open email client
      window.location.href = 'mailto:muhumuzadeus.ai@gmail.com';
      
 
      if (onClick) onClick();
    }
  };
  
  const commonClasses = `group relative inline-block text-black ${className}`;
  const content = (
    <>
      <span className="relative z-10 block border-2 border-black bg-yellow-400 px-5 py-2 text-center font-bold transition-transform duration-150 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 -translate-x-1 -translate-y-1">
        {children}
      </span>
      <span className="absolute inset-0 border-2 border-black bg-black"></span>
    </>
  );

  if (isContactButton) {
    return (
      <button 
        onClick={handleContactClick} 
        className={commonClasses}
      >
        {content}
      </button>
    );
  }

  if (to) {
    return <Link to={to} className={commonClasses} onClick={onClick}>{content}</Link>;
  }
  return <a href={href} className={commonClasses} onClick={onClick}>{content}</a>;
};

const DropdownMenu = ({ items, onLinkClick }) => {
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
            <Link to={item.href} className="block p-3 hover:bg-zinc-800 rounded-md transition-colors" onClick={onLinkClick}>
              <div className="flex items-center justify-between gap-4">
                <p className="font-bold text-white">{item.title}</p>
                {item.tag && (<span className="whitespace-nowrap bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">{item.tag}</span>)}
              </div>
              <p className="text-sm text-zinc-400 mt-1">{item.description}</p>
            </Link>
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
  
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();
  const isBlogPostPage = pathname.startsWith('/blog/') && pathname.length > 6;

  useEffect(() => {
    const handleScroll = () => {
      if (!isBlogPostPage) {
        setIsNavVisible(true);
        return;
      }
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) setIsNavVisible(true);
      else if (currentScrollY > lastScrollY.current) setIsNavVisible(false);
      else setIsNavVisible(true);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBlogPostPage]);

  useEffect(() => {
    if (!isBlogPostPage) setIsNavVisible(true);
  }, [pathname, isBlogPostPage]);
  
  const handleDropdownLinkClick = () => setOpenDropdown(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (label) => setOpenDropdown(openDropdown === label ? null : label);
  
  return (
    <header className={`fixed top-0 left-0 w-full bg-yellow-400 text-black border-b-4 border-black z-50 font-sans transition-transform duration-300 ease-in-out ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div ref={navRef} className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-4xl font-extrabold tracking-tighter">DEUS.</Link>
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <>
                    <button onClick={() => handleNavClick(item.label)} className="flex items-center gap-1.5 text-base font-bold transition-colors hover:text-zinc-600">
                      <span>{item.label}</span>
                      <ChevronDown size={20} className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && <DropdownMenu items={item.dropdown} onLinkClick={handleDropdownLinkClick} />}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link to={item.to} className="flex items-center gap-1.5 text-base font-bold transition-colors hover:text-zinc-600">
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
          {/* Updated Contact button with special handling */}
          <HardShadowButton isContactButton={true}>Contact me</HardShadowButton>
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
                     {item.dropdown.map(subItem => (<Link key={subItem.title} to={subItem.href} className="block text-sm text-gray-800 hover:text-black" onClick={() => setIsMenuOpen(false)}>{subItem.title}</Link>))}
                   </div>
                 </div>
               ) : (
                 <Link key={item.label} to={item.to} className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>{item.label}</Link>
               )
             ))}
             <div className="mt-4 pt-4 w-full flex justify-center">
               {/* Updated mobile Contact button */}
               <HardShadowButton isContactButton={true} onClick={() => setIsMenuOpen(false)}>Contact me</HardShadowButton>
             </div>
           </nav>
         </div>
       )}
    </header>
  );
}