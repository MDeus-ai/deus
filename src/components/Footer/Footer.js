import React from 'react';
import { 
  FaHeart, 
  FaEnvelope, 
  FaPhone,
  FaLocationDot,
  FaLinkedinIn, 
  FaGithub, 
  FaXTwitter,
  FaWhatsapp,
  FaQuoteLeft,
  FaQuoteRight
} from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="bg-background text-text-primary pb-2 pt-12 px-8 font-roboto-slab relative border-t border-gray-700">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        
        <div className="flex flex-col gap-4">
          <h3 className="text-accent text-xl md:text-2xl font-semibold mb-2 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-accent">My Philosophy</h3>
          <div className="relative bg-accent-light p-6 rounded-lg shadow-md">
            <FaQuoteLeft className="text-accent text-xl md:text-2xl absolute -top-3 -left-3 opacity-70" />
            <p className="text-text-primary text-base md:text-lg italic font-light leading-relaxed my-4">
              &quot;If it works, don&apos;t touch it&quot;
            </p>
            <FaQuoteRight className="text-accent text-xl md:text-2xl absolute -bottom-3 -right-3 opacity-70" />
          </div>
          <p className="text-text-secondary text-sm md:text-base leading-6 md:leading-7 font-light">
            This principle guides my approach to machine learning, emphasizing stability and reliability in my projects.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-accent text-xl md:text-2xl font-semibold mb-2 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-accent">Get in Touch</h3>
          <div className="flex flex-col gap-3">
            <a href="mailto:muhumuzadeus.ai@gmail.com" className="flex items-center gap-4 text-text-secondary hover:text-accent transition-transform transform hover:translate-x-2">
              <FaEnvelope className="text-accent text-base md:text-lg" />
              <span className="text-sm md:text-base">muhumuzadeus.ai@gmail.com</span>
            </a>
            <a href="tel:+256784871018" className="flex items-center gap-4 text-text-secondary hover:text-accent transition-transform transform hover:translate-x-2">
              <FaPhone className="text-accent text-base md:text-lg" />
              <span className="text-sm md:text-base">+256 784 871 018</span>
            </a>
            <div className="flex items-center gap-4 text-text-secondary">
              <FaLocationDot className="text-accent text-base md:text-lg" />
              <span className="text-sm md:text-base">Kampala, Uganda</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-accent text-xl md:text-2xl font-semibold mb-2 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-accent">Connect With Me</h3>
          <p className="text-text-secondary text-sm md:text-base leading-6 md:leading-7 font-light">
            Join me on social media for the latest updates on my projects and insights into AI, machine learning.
          </p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/muhumuza-deus-mugenyi-81a4a7268/" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-xl md:text-2xl hover:text-accent transition-transform transform hover:-translate-y-1" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/MDeus-ai" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-xl md:text-2xl hover:text-accent transition-transform transform hover:-translate-y-1" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://twitter.com/Muhumuzadeus5" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-xl md:text-2xl hover:text-accent transition-transform transform hover:-translate-y-1" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="https://wa.me/256784871018" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-xl md:text-2xl hover:text-accent transition-transform transform hover:-translate-y-1" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-text-tertiary text-[10px] md:text-xs font-light mt-8">
        <p>Designed and built with <FaHeart className="text-heart mx-1 animate-pulse inline" /> by Muhumuza Deus</p>
        <p className="mt-1">&copy; {new Date().getFullYear()} Muhumuza Deus. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;