import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2, PieChart as PieChartIcon } from 'lucide-react';

const AboutPage = () => {
  const [chartType, setChartType] = useState('bar');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isVisible, setIsVisible] = useState({
    intro: false,
    background: false,
    skills: false,
    focus: false,
    goals: false
  });

  useEffect(() => {
    // Set page title when component mounts
    document.title = 'About Me | Muhumuza Deus';
    
    // Restore original title when component unmounts
    return () => {
      document.title = 'Muhumuza Deus';
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  const skills = [
    { name: 'Statistical Analysis', proficiency: 70, color: '#4C51BF' },
    { name: 'Machine Learning', proficiency: 65, color: '#48BB78' },
    { name: 'Deep Learning', proficiency: 50, color: '#4299E1' },
    { name: 'Data Visualization', proficiency: 65, color: '#ED8936' },
    { name: 'Python Programming', proficiency: 60, color: '#9F7AEA' },
    { name: 'Microsoft Office Suite', proficiency: 85, color: '#F56565' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow-lg border border-gray-200">
          <p className="font-medium text-xs sm:text-sm">{payload[0].payload.name}</p>
          <p className="text-xs text-gray-600">Proficiency: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#1a1b3c] text-text-primary font-roboto-slab min-h-screen">
      <header 
        className="relative h-[40vh] bg-cover bg-center flex items-center justify-center" 
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/about/picture_1.jpg)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-text-primary z-10">About Me</h1>
      </header>

      <main className="max-w-screen-xl mx-auto py-8 md:py-16 px-4 md:px-8 space-y-8 md:space-y-16">
        <section 
          data-section="intro"
          className={`flex flex-col md:flex-row items-center md:gap-12 gap-8 text-center md:text-left 
            transition-all duration-1000 ease-out
            ${isVisible.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="w-full md:w-1/3 flex justify-center">
            <img 
              src={`${process.env.PUBLIC_URL}/assets/images/about/me.jpg`} 
              alt="Muhumuza Deus" 
              className="w-36 h-36 md:w-72 md:h-72 rounded-full object-cover shadow-xl border-4 border-accent"
              loading="lazy"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-accent">Hello, I&apos;m Muhumuza Deus</h2>
            <p className="text-base md:text-lg leading-relaxed">
              I&apos;m a passionate statistics student at Kyambogo University and a self-taught machine learning practitioner. 
              My journey in the world of data science, machine learning and deep learning has been driven by curiosity. Am always on the move to learn new things.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
          <div 
            data-section="background"
            style={{ zIndex: hoveredSkill ? 0 : 1 }}
            className={`bg-[#1a1a2e] p-6 md:p-8 rounded-xl shadow-md transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl
              ${isVisible.background ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h3 className="text-xl font-bold text-accent mb-4">My Background</h3>
            <p className="text-sm md:text-base leading-relaxed">
              I taught myself everything l know about machine learning and deep learning, and my knowledge has been strengthened through utilising online tutorials,
              kaggle competitions and my projects. My desire to take the path least travelled, and doing hard things has been my driving force.
            </p>
          </div>

          <div 
            data-section="skills"
            className={`bg-[#1a1a2e] p-4 md:p-8 rounded-xl shadow-md transition-all duration-1000 ease-out hover:-translate-y-2 hover:shadow-2xl row-span-2 relative z-10
              ${isVisible.skills ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-10 rotate-2'}`}
          >
            <h3 className="text-xl font-bold text-accent mb-4 flex justify-between items-center">
              Skills & Expertise
              <div className="flex gap-2">
                <button
                  onClick={() => setChartType('bar')}
                  className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                    chartType === 'bar' ? 'bg-accent text-white' : 'bg-gray-200'
                  }`}
                >
                  <BarChart2 size={16} />
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                    chartType === 'pie' ? 'bg-accent text-white' : 'bg-gray-200'
                  }`}
                >
                  <PieChartIcon size={16} />
                </button>
              </div>
            </h3>
            
            <div className="h-[200px] md:h-[300px] transition-all duration-1000 delay-300">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                  <BarChart
                    data={skills}
                    layout="vertical"
                    margin={{ 
                      top: 5, 
                      right: 20, 
                      left: 70, 
                      bottom: 5 
                    }}
                  >
                    <XAxis 
                      type="number" 
                      domain={[0, 100]}
                      tick={{ fontSize: 10 }}
                      tickCount={6}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={70}
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="proficiency"
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                      onMouseEnter={(data) => setHoveredSkill(data.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {skills.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          className={`transition-all duration-300 ${
                            hoveredSkill === entry.name
                              ? 'opacity-100 filter brightness-110'
                              : 'opacity-75'
                          }`}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={skills}
                      dataKey="proficiency"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={50}
                      onMouseEnter={(_, index) => setHoveredSkill(skills[index].name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {skills.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          className={`transition-all duration-300 ${
                            hoveredSkill === entry.name
                              ? 'opacity-100 filter brightness-110'
                              : 'opacity-75'
                          }`}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`p-2 rounded-lg transition-all duration-500 transform ${
                    hoveredSkill === skill.name
                      ? 'scale-105 shadow-lg ring-2 ring-offset-2'
                      : 'scale-100 hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: `${skill.color}15`,
                    borderLeft: `4px solid ${skill.color}`,
                    ringColor: skill.color,
                    opacity: isVisible.skills ? 1 : 0,
                    transform: `translateY(${isVisible.skills ? '0' : '20px'})`,
                    transition: `all 500ms ease-out ${500 + index * 100}ms`
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <p className="text-xs md:text-sm font-medium truncate">{skill.name}</p>
                  <p className="text-xs text-gray-600">{skill.proficiency}%</p>
                </div>
              ))}
            </div>
          </div>

          <div 
            data-section="focus"
            style={{ zIndex: hoveredSkill ? 0 : 1 }}
            className={`bg-[#1a1a2e] p-6 md:p-8 rounded-xl shadow-md transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl
              ${isVisible.focus ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h3 className="text-xl font-bold text-accent mb-4">Current Focus</h3>
            <p className="text-sm md:text-base leading-relaxed">
              I&apos;m currently focusing on mastering advanced statistical methods, machine learning and its applications 
              in computer vision. I&apos;m also creating youtube content for machine learning.
              And am actively participating in kaggle competitions every month.
            </p>
          </div>

          <div 
            data-section="goals"
            style={{ zIndex: hoveredSkill ? 0 : 1 }}
            className={`bg-[#1a1a2e] p-6 md:p-8 rounded-xl shadow-md transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl
              ${isVisible.goals ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h3 className="text-xl font-bold text-accent mb-4">Future Goals</h3>
            <p className="text-sm md:text-base leading-relaxed">
              My aim is to contribute to the field of AI and statistics by developing innovative solutions 
              that can make a real-world impact, and making this knowledge free for everyone. 
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;