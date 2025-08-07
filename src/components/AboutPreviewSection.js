import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AboutBanner = () => {
  const tickerText = "KNOW ABOUT ME • ";
  return (
    <div>
      <div className="bg-black dark:bg-accent text-white dark:text-accent-text py-3 w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-base font-semibold mx-4 uppercase">{tickerText.repeat(10)}</span>
          <span className="text-base font-semibold mx-4 uppercase" aria-hidden="true">{tickerText.repeat(10)}</span>
        </div>
      </div>
    </div>
  );
};

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

const InfoCard = ({ title, children, className = '' }) => (
  <div className={`bg-surface border-2 border-border p-8 h-full transition-all duration-200 ease-in-out shadow-[8px_8px_0px_theme(colors.shadow)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 active:translate-x-0 active:translate-y-0 ${className}`}>
    <h3 className="text-2xl font-bold mb-4 text-text-primary dark:text-accent">{title}</h3>
    <div className="text-text-secondary leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

const AboutPreviewSection = () => {
  const skills = [
    { name: 'Data Visualization', proficiency: 65 },
    { name: 'Statistical Analysis', proficiency: 60 },
    { name: 'Python', proficiency: 60 },
    { name: 'Machine Learning', proficiency: 55 },
    { name: 'MLOps', proficiency: 20 },
    { name: 'SQL & PostgreSQL', proficiency: 25 },
  ];

  return (
    <section id="about-section" className="font-body bg-background">
      <AboutBanner />
      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto mb-16 lg:mb-20">
          <div className="hidden md:flex md:col-span-1 justify-center">
            <div className="w-48 h-48 md:w-56 md:h-56 cursor-pointer relative bg-surface border-2 border-border p-2 transition-all duration-200 ease-in-out shadow-[8px_8px_0px_theme(colors.shadow)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 active:translate-x-0 active:translate-y-0">
                <img
                    src={`${process.env.PUBLIC_URL}/assets/images/about/me.jpg`}
                    alt="Muhumuza Deus"
                    className="w-full h-full object-cover"
                />
            </div>
          </div>
          <div className="md:col-span-2 text-center md:text-left">
            <h3 className="text-3xl font-heading font-bold mb-4 text-text-primary dark:text-accent">Hello, I'm Muhumuza Deus</h3>
            <p className="text-lg leading-relaxed text-text-secondary"> A passionate statistics student at Kyambogo University and a self-taught machine learning practitioner. My journey in the world of data science, machine learning and deep learning has been driven by curiosity. I'm always on the move to learn new things. </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <InfoCard title="My Background">
            <p> I taught myself everything I know about machine learning and deep learning, and my knowledge has been strengthened through utilising online tutorials, Kaggle competitions and personal projects. My desire to take the path least travelled has been my driving force. </p>
          </InfoCard>
          <InfoCard title="Skills & Expertise" className="lg:col-span-2">
            <div className="hidden md:block h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skills} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 100]} stroke="rgb(var(--color-text-secondary))" tick={{ fill: 'rgb(var(--color-text-secondary))', fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" width={100} stroke="rgb(var(--color-text-secondary))" tick={{ fill: 'rgb(var(--color-text-secondary))', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(224, 224, 224, 0.1)' }} />
                  <Bar dataKey="proficiency" barSize={20} fill="rgb(var(--color-text-primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="md:hidden">
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div key={skill.name} className="bg-surface border border-border/20 text-text-primary text-center text-sm font-semibold p-2 rounded">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </InfoCard>
          <InfoCard className="lg:col-span-3">
             <div className="text-center">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
                  <div className="text-center">
                    <h4 className="font-heading font-bold text-lg mb-3 text-text-primary dark:text-accent">Resume</h4>
                    <a
                        href={`${process.env.PUBLIC_URL}/assets/documents/MUHUMUZA DEUS @ RESUME.pdf`}
                        download="Resume_Muhumuza_Deus.pdf"
                        className="inline-block bg-surface text-text-primary px-6 py-3 border-2 border-border font-bold transition-all duration-200 hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 active:translate-x-0 active:translate-y-0 shadow-[6px_6px_0px_theme(colors.shadow)]"
                    >
                        Download PDF
                    </a>
                  </div>
                  <div className="text-center">
                    <h4 className="font-heading font-bold text-lg mb-3 text-text-primary dark:text-accent">Curriculum Vitae (CV)</h4>
                    <a
                        href={`${process.env.PUBLIC_URL}/assets/documents/MUHUMUZA DEUS @ CV.pdf`}
                        download="CV_Muhumuza_Deus.pdf"
                        className="inline-block bg-surface text-text-primary px-6 py-3 border-2 border-border font-bold transition-all duration-200 hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 active:translate-x-0 active:translate-y-0 shadow-[6px_6px_0px_theme(colors.shadow)]"
                    >
                        Download PDF
                    </a>
                  </div>
                </div>
            </div>
          </InfoCard>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;