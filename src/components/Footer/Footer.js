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
    <footer id="footer" className="bg-black text-white font-sans overflow-hidden">
      <div className="bg-black text-white py-3 border-y-2 border-gray-800">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-base font-semibold mx-4 uppercase">{scrollingText.repeat(15)}</span>
          <span className="text-base font-semibold mx-4 uppercase" aria-hidden="true">{scrollingText.repeat(15)}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tighter text-white">
            Have an idea?
          </h2>
          <p className="mt-2 text-base text-gray-400 max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your projects.
          </p>
          <a
            href="mailto:muhumuzadeus.ai@gmail.com"
            className="inline-block mt-4 bg-yellow-400 text-black px-6 py-2.5 border-2 border-black 
                       font-bold text-base
                       shadow-[6px_6px_0px_#000] hover:shadow-none 
                       hover:translate-x-1.5 hover:translate-y-1.5 
                       transition-all duration-200 ease-in-out"
          >
            Let's Collaborate
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
          <div className="text-center md:text-left md:col-span-1">
             <h3 className="text-xl font-extrabold tracking-tighter">
                MUHUMUZA DEUS M <span className="text-yellow-400">.</span>
            </h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">
                Data Scientist
            </p>
          </div>

          {/* Mobile: side by side, Desktop: normal grid */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-1 md:gap-0 md:col-span-2 md:grid md:grid-cols-2 md:gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-base font-bold mb-3 uppercase tracking-wider">Main Projects</h3>
              <div className="space-y-2">
                {projectLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-gray-300 hover:text-yellow-400 transition-colors"
                  >
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
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    <span className="text-sm font-semibold uppercase tracking-wider">{link.label}</span>
                    <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-2 ml-2">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 py-3">
        <p className="text-center text-xs text-gray-500 uppercase tracking-wider">
            © {new Date().getFullYear()} Muhumuza Deus • All Rights Reserved
        </p>
      </div>
    </footer>
  );
}