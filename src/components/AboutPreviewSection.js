import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'; 


const AboutBanner = () => {
  const tickerText = "KNOW ABOUT ME • ";
  return (
    <div>
      <div className="bg-black text-white py-3 w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-base font-semibold mx-4 uppercase">{tickerText.repeat(10)}</span>
          <span className="text-base font-semibold mx-4 uppercase" aria-hidden="true">{tickerText.repeat(10)}</span>
        </div>
      </div>
    </div>
  );
};

// --- InfoCard and CustomTooltip components ---
const InfoCard = ({ title, children, className = '' }) => (
  <div className={`bg-white border-2 border-black p-8 h-full ${className}
                   shadow-[8px_8px_0px_#000] hover:shadow-none 
                   hover:translate-x-2 hover:translate-y-2 
                   transition-all duration-200 ease-in-out`}>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <div className="text-gray-700 leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white p-2 rounded border border-gray-600 shadow-lg">
        <p className="font-bold text-sm">{payload[0].payload.name}</p>
        <p className="text-xs text-gray-300">Proficiency: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

// --- Main Exported Component ---
const AboutPreviewSection = () => {
  
  const skills = [
    { name: 'Statistical Analysis', proficiency: 70 },
    { name: 'Machine Learning', proficiency: 65 },
    { name: 'Deep Learning', proficiency: 50 },
    { name: 'Data Visualization', proficiency: 65 },
    { name: 'Python', proficiency: 60 },
    { name: 'Office Suite', proficiency: 85 },
    { name: 'SQL', proficiency: 45 },
  ];

  return (
    <section className="bg-white text-black font-sans">
      
      <AboutBanner />

      <div className="container mx-auto px-4 py-20 lg:py-28">
        
        {/* Intro Section with Image */}
        <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto mb-16 lg:mb-20">
          <div className="hidden md:flex md:col-span-1 justify-center">
             <div className="relative w-48 h-48 md:w-56 md:h-56">
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/images/about/me.jpg`} 
                  alt="Muhumuza Deus" 
                  className="relative w-full h-full object-cover border-2 border-black z-10"
                />
                <div className="absolute inset-0 bg-black translate-x-3 translate-y-3"></div>
            </div>
          </div>
          <div className="md:col-span-2 text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4">Hello, I'm Muhumuza Deus</h3>
            <p className="text-lg leading-relaxed">
              A passionate statistics student at Kyambogo University and a self-taught machine learning practitioner. My journey in the world of data science, machine learning and deep learning has been driven by curiosity. I'm always on the move to learn new things.
            </p>
          </div>
        </div>

        {/* Grid for Info Cards and Skills Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <InfoCard title="My Background">
            <p>
              I taught myself everything I know about machine learning and deep learning, and my knowledge has been strengthened through utilising online tutorials, Kaggle competitions and personal projects. My desire to take the path least travelled has been my driving force.
            </p>
          </InfoCard>

          <InfoCard title="Skills & Expertise" className="lg:col-span-2">
            {/* The chart toggle buttons have been removed */}
            
            {/* --- Desktop View: The Bar Chart --- */}
            {/* This whole block is now hidden on mobile */}
            <div className="hidden md:block h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skills} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#000', fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#000', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.1)' }}/>
                  <Bar dataKey="proficiency" barSize={20} fill="#000" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* --- Mobile View: Simple Text List --- */}
            {/* This block is ONLY visible on mobile */}
            <div className="md:hidden">
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div key={skill.name} className="bg-gray-100 border border-gray-300 text-black text-center text-sm font-semibold p-2 rounded">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </InfoCard>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;