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
    <footer className="bg-background text-text-primary py-24 px-8 font-roboto-slab">
      <hr className="border-t-2 border-gray-600 mx-auto w-[100%] my-8"></hr>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        
        <div className="flex flex-col gap-6">
          <h3 className="text-accent text-2xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-accent">My Philosophy</h3>
          <div className="relative bg-accent-light p-6 rounded-lg shadow-md">
            <FaQuoteLeft className="text-accent text-2xl absolute -top-3 -left-3 opacity-70" />
            <p className="text-text-primary text-lg italic font-light leading-relaxed my-6">
              "If it works, don't touch it"
            </p>
            <FaQuoteRight className="text-accent text-2xl absolute -bottom-3 -right-3 opacity-70" />
          </div>
          <p className="text-text-secondary text-base leading-7 font-light mt-4">
            This principle guides my approach to machine learning, emphasizing stability and reliability in my projects.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-accent text-2xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-accent">Get in Touch</h3>
          <div className="flex flex-col gap-4">
            <a href="mailto:muhumuzadeus.ai@gmail.com" className="flex items-center gap-4 text-text-secondary hover:text-accent transition-transform transform hover:translate-x-2">
              <FaEnvelope className="text-accent text-lg" />
              <span>muhumuzadeus.ai@gmail.com</span>
            </a>
            <a href="tel:+256784871018" className="flex items-center gap-4 text-text-secondary hover:text-accent transition-transform transform hover:translate-x-2">
              <FaPhone className="text-accent text-lg" />
              <span>+256 784 871 018</span>
            </a>
            <div className="flex items-center gap-4 text-text-secondary">
              <FaLocationDot className="text-accent text-lg" />
              <span>Kampala, Uganda</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-accent text-2xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-accent">Connect With Me</h3>
          <p className="text-text-secondary text-base leading-7 font-light mb-4">
            Join me on social media for the latest updates on my projects and insights into AI, machine learning.
          </p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/muhumuza-deus-mugenyi-81a4a7268/" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-2xl hover:text-accent transition-transform transform hover:-translate-y-1" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/MDeus-ai" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-2xl hover:text-accent transition-transform transform hover:-translate-y-1" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://twitter.com/Muhumuzadeus5" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-2xl hover:text-accent transition-transform transform hover:-translate-y-1" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="https://wa.me/256784871018" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-2xl hover:text-accent transition-transform transform hover:-translate-y-1" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full relative py-8">
        <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-full mb-8"></div>
        <div className="text-center text-text-tertiary text-sm font-normal">
          <p>Designed and built with <FaHeart className="text-heart mx-1 animate-pulse inline" /> by Muhumuza Deus</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Muhumuza Deus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
