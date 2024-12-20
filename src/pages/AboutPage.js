import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-background text-text-primary font-roboto-slab min-h-screen">
      {/* Hero Section */}
      <header 
        className="relative h-[40vh] bg-cover bg-center flex items-center justify-center" 
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/about/picture_1.jpg)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary z-10">About Me</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto py-16 px-8 space-y-16">
        {/* Intro Section */}
        <section className="flex flex-col md:flex-row items-center md:gap-12 gap-8 text-center md:text-left">
          <div className="w-full md:w-1/3 flex justify-center">
            <img 
              src={`${process.env.PUBLIC_URL}/assets/images/about/me.jpg`} 
              alt="Muhumuza Deus" 
              className="w-48 h-48 md:w-72 md:h-72 rounded-full object-cover shadow-xl border-4 border-accent"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-accent">Hello, I&apos;m Muhumuza Deus</h2>
            <p className="text-lg leading-relaxed">
              I&apos;m a passionate statistics student at Kyambogo University and a self-taught machine learning practitioner. 
              My journey in the world of machine learning and deep learning has been driven by curiosity. I also love learning about celestial bodies🔭 and astronomy🚀. Am someone how is always on the move to learn now things.
            </p>
          </div>
        </section>

        {/* Details Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="bg-accent-light p-8 rounded-xl shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-accent mb-4">My Background</h3>
            <p className="leading-relaxed">
              Currently pursuing my degree in Statistics, I&apos;ve combined my academic knowledge with practical 
              experience in machine learning and deep learning. This unique blend allows me to approach 
              data-driven problems with both statistical rigor and cutting-edge AI techniques.
            </p>
          </div>

          <div className="bg-accent-light p-8 rounded-xl shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-accent mb-4">Skills & Expertise</h3>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li className="text-text-primary">Statistical Analysis</li>
              <li className="text-text-primary">Machine Learning</li>
              <li className="text-text-primary">Deep Learning</li>
              <li className="text-text-primary">Data Visualization</li>
              <li className="text-text-primary">Python Programming</li>
              <li className="text-text-primary">Microsoft Office Suite</li>
            </ul>
          </div>

          <div className="bg-accent-light p-8 rounded-xl shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-accent mb-4">Current Focus</h3>
            <p className="leading-relaxed">
              I&apos;m currently diving deep into advanced neural network architectures and their applications 
              in computer vision and natural language processing. I&apos;m also creating youtube content for machine learning.
            </p>
          </div>

          <div className="bg-accent-light p-8 rounded-xl shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-accent mb-4">Future Goals</h3>
            <p className="leading-relaxed">
              My aim is to contribute to the field of AI and statistics by developing innovative solutions 
              that can make a real-world impact. I&apos;m particularly interested in applications of AI in 
              healthcare, and its intersection with modern astronomy🚀
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;