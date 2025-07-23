export default function Footer() {
  const scrollingText = "LET'S BUILD SOMETHING AMAZING TOGETHER • ";

  const connectLinks = [
    { href: "https://github.com/MDeus-ai", label: "Github" },
    { href: "https://twitter.com/Muhumuzadeus5", label: "Twitter" },
    { href: "https://www.youtube.com/@mlterminal", label: "YouTube" },
    { href: "https://www.linkedin.com/in/muhumuza-deus-mugenyi-81a4a7268/", label: "LinkedIn" },
    { href: "https://kaggle.com/muhumuzadeusai", label: "Kaggle" },
  ];

  const projectLinks = [
      { href: "https://github.com/MDeus-ai/PlantVision", label: "PlantVision" },
  ];

  const handleContactClick = (e) => {
      e.preventDefault();
      window.location.href = 'mailto:muhumuzadeus.ai@gmail.com';
  };

  return (
    <footer id="footer" className="bg-text-primary dark:bg-surface text-white dark:text-text-primary font-body overflow-hidden">
      <div className="bg-text-primary dark:bg-surface text-white dark:text-text-primary py-3 border-y-2 border-white/20 dark:border-border/10">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-base font-semibold mx-4 uppercase">{scrollingText.repeat(15)}</span>
          <span className="text-base font-semibold mx-4 uppercase" aria-hidden="true">{scrollingText.repeat(15)}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tighter text-white dark:text-text-primary font-heading">
            Have an idea?
          </h2>
          <p className="mt-2 text-base text-gray-400 dark:text-text-secondary max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your projects.
          </p>
          <div className="mt-6">
            <button
              onClick={handleContactClick}
              className="inline-block bg-accent dark:bg-surface text-accent-text dark:text-accent px-6 py-3 border-2 border-border font-bold transition-all duration-200 hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 active:translate-x-0 active:translate-y-0 shadow-[6px_6px_0px_theme(colors.shadow)]"
            >
              Let's Collaborate
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
          <div className="text-center md:text-left md:col-span-1">
             <h3 className="text-xl font-extrabold tracking-tighter font-heading">
                MUHUMUZA DEUS M <span className="text-yellow-400 dark:text-accent">.</span>
            </h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-gray-500 dark:text-text-secondary/70">
                Data Scientist
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-1 md:gap-0 md:col-span-2 md:grid md:grid-cols-2 md:gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-base font-bold mb-3 uppercase tracking-wider">Main Projects</h3>
              <div className="space-y-2">
                {projectLinks.map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="group block text-gray-300 dark:text-text-secondary hover:text-yellow-400 dark:hover:text-accent transition-colors">
                    <span className="text-sm font-semibold uppercase tracking-wider">{link.label}</span>
                    <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-2 ml-2">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-base font-bold mb-3 uppercase tracking-wider">Connect</h3>
              <div className="space-y-2">
                {connectLinks.map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="group block text-gray-300 dark:text-text-secondary hover:text-yellow-400 dark:hover:text-accent transition-colors">
                    <span className="text-sm font-semibold uppercase tracking-wider">{link.label}</span>
                    <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-2 ml-2">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 dark:border-border/10 py-3">
        <p className="text-center text-xs text-gray-500 dark:text-text-secondary/70 uppercase tracking-wider">
            © {new Date().getFullYear()} Muhumuza Deus • All Rights Reserved
        </p>
      </div>
    </footer>
  );
}