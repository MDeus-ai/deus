import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const socialLinks = [
  { href: "https://github.com/MDeus-ai", icon: FaGithub, label: "GitHub" },
  { href: "https://twitter.com/Muhumuzadeus5", icon: FaTwitter, label: "Twitter" },
  { href: "https://www.linkedin.com/in/muhumuza-deus-mugenyi-81a4a7268/", icon: FaLinkedin, label: "LinkedIn" },
];

const AuthorBio = () => {
  return (
    <div className="mt-16 pt-10 border-t border-border/20">
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-surface p-6 border-2 border-border">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/about/me.jpg`}
          alt="Muhumuza Deus"
          className="w-24 h-24 rounded-full border-2 border-border object-cover flex-shrink-0"
        />
        <div>
          <h3 className="font-heading text-xl font-bold text-text-primary mb-2">Written by Muhumuza Deus</h3>
          <p className="text-text-secondary mb-3">
            A self-taught data scientist and open-source developer passionate about building intelligent systems and sharing knowledge through writing.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-text-secondary hover:text-accent transition-colors"
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;