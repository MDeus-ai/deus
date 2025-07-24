import { FaGithub, FaTwitter, FaLinkedin, FaYoutube, FaKaggle } from 'react-icons/fa';

export default function Footer() {
  const connectLinks = [
    { href: "https://github.com/MDeus-ai", label: "Github", icon: FaGithub },
    { href: "https://twitter.com/Muhumuzadeus5", label: "Twitter", icon: FaTwitter },
    { href: "https://www.youtube.com/@deusML", label: "YouTube", icon: FaYoutube },
    { href: "https://www.linkedin.com/in/muhumuza-deus-mugenyi-81a4a7268/", label: "LinkedIn", icon: FaLinkedin },
    { href: "https://kaggle.com/muhumuzadeusai", label: "Kaggle", icon: FaKaggle },
  ];
  const handleContactClick = (e) => {
      e.preventDefault();
      window.location.href = 'mailto:muhumuzadeus.ai@gmail.com';
  };
  return (
    <footer className="bg-surface border-t-2 border-border text-text-primary font-body">
      <div className="container mx-auto px-4">
        <div className="text-center py-20">
          {/* THE FIX: Reverted to font-extrabold for impact */}
          <h2 className="font-heading text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Let's build something amazing.
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Have a project in mind, a question, or just want to connect? I'm always open to new ideas and collaborations.
          </p>
          <button onClick={handleContactClick} className="inline-block bg-accent text-accent-text px-8 py-3 border-2 border-border font-bold transition-all duration-200 hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 active:translate-x-0 active:translate-y-0 shadow-[6px_6px_0px_theme(colors.shadow)]">
            Get in Touch
          </button>
        </div>
        <div className="border-t-2 border-border py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
           <p className="text-sm text-text-secondary/70">© {new Date().getFullYear()} Muhumuza Deus • All Rights Reserved</p>
           <div className="flex items-center gap-5">
            {connectLinks.map(social => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-text-secondary hover:text-accent transition-colors"><social.icon size={20} /></a>
            ))}
           </div>
        </div>
      </div>
    </footer>
  );
}