import { useState, useEffect, useMemo } from 'react';
import { FaGithub, FaExclamationTriangle, FaLightbulb, FaFolder, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { Search, ChevronDown } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

// ===================================================================================
//
//  START OF CONFIGURATION & CONTENT AREA
//  This is the primary section to edit for project content.
//
// ===================================================================================

// --- 1. Section Type Definitions ---
const SectionTypes = {
  OVERVIEW: 'overview',
  DOCUMENTATION: 'documentation',
  METRICS: 'metrics',
  PROJECT_STRUCTURE: 'project_structure',
  CODE: 'code',
  ROADMAP: 'roadmap',
};

// --- 2. Project Content ---
const projectData = {
  "plantvision-cv001dd": {
    id: "plantvision-cv001dd",
    title: "PlantVision cv001dd",
    description: "A Vision model for detecting and classifying plant diseases from leaf images.",
    image: "/assets/images/project/plantvision.jpg",
    github: "https://github.com/MDeus-ai/PlantVision",
    tags: ["Tensorflow", "Pytorch", "Python", "Flutter", "Cuda"],

    // --- 2a. Sidebar Navigation Structure ---
    sidebar: [
      {
        category: 'Project Links',
        links: [
          { id: 'github-link', title: 'GitHub Repository', external: true, href: "https://github.com/MDeus-ai/PlantVision-cv001dd" }
        ]
      },
      {
        category: 'On this page',
        links: [
          { id: 'overview', title: 'Overview' },
          { id: 'documentation', title: 'Documentation', subheadings: true },
          { id: 'metrics', title: 'Performance' },
          { id: 'structure', title: 'Structure' },
          { id: 'code', title: 'Code' },
          { id: 'roadmap', title: 'Roadmap' },
        ]
      },
    ],

    // --- 2b. Page Content Sections ---
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        type: SectionTypes.OVERVIEW,
        content: "PlantVision is an innovative deep learning solution that leverages computer vision to help farmers and agricultural specialists identify plant diseases quickly and accurately. Built on a Convolutional Neural Network architecture, this model analyzes images of plant leaves to detect and classify diseases, providing early warning and treatment recommendations to prevent crop loss."
      },
      {
        id: 'documentation',
        title: 'Technical Documentation',
        type: SectionTypes.DOCUMENTATION,
        content: `
## Architecture

The system consists of three main components:

1.  **CNN-based Image Classification Model**: Built with TensorFlow and PyTorch, using an EfficientNet-B2 backbone pre-trained on ImageNet.
2.  **Mobile Application**: Developed using Flutter for cross-platform deployment.
3.  **Backend API**: A Flask-based API to handle image processing, model inference, and deliver results.

### The CNN Model
The core of the project is the deep learning model. We chose EfficientNet due to its excellent balance of accuracy and computational efficiency, making it suitable for potential mobile deployment. This is a key architectural decision.

### Data Preprocessing
Data augmentation was critical. Techniques included random rotations, flips, and brightness adjustments to simulate real-world conditions.

## Model Performance

Below is a summary of the model's performance on the hold-out test set.

| Metric          | Score   | Notes                                    |
|:----------------|:--------|:-----------------------------------------|
| **Accuracy**    | 98.7%   | Overall correctness                      |
| **Precision**   | 97.2%   | Of positive predictions, how many are correct |
| **Recall**      | 96.5%   | Of actual positives, how many were found |
| **F1-Score**    | 96.8%   | Harmonic mean of Precision and Recall    |

> **Note:** These metrics represent the weighted average across all disease classes, accounting for class imbalance.

## Mathematical Formulation

The loss function used is the cross-entropy loss, defined as:

$$
L_{CE} = - \\sum_{i=1}^{C} y_i \\log(\\hat{y}_i)
$$

Where $C$ is the number of classes, $y_i$ is the true label (one-hot encoded), and $\\hat{y}_i$ is the predicted probability for class $i$.
`
      },
      {
        id: 'metrics',
        title: 'Performance Metrics',
        type: SectionTypes.METRICS,
        data: [
          { name: "Accuracy", value: 98.7 },
          { name: "Precision", value: 97.2 },
          { name: "Recall", value: 96.5 },
          { name: "F1 Score", value: 96.8 },
          { name: "Top 1% Acc", value: 99.1 },
          { name: "Top 5% Acc", value: 99.8 }
        ]
      },
      {
        id: 'structure',
        title: 'Project Structure',
        type: SectionTypes.PROJECT_STRUCTURE,
        content: `
plantvision/
├── data/                    # ⛔ Not included in Git. Use DVC or git-lfs
├── src/                     # ✅ Source code
│   ├── configs/             # 📄 YAML configs (no hardcoded values)
│   ├── data/                # 📦 Data loading, augmentations
│   ├── models/              # 🧠 Model definitions: CNNs, EfficientNet
│   ├── train.py             # 🚂 Launch training with config + MLflow
│   ├── evaluate.py          # 📊 Validation + metrics
│   ├── quantize.py          # 🔧 Convert to ONNX/TFLite/INT8
│   ├── serve/               # 🌐 FastAPI or TorchServe entrypoint
│   └── utils.py             # 🛠 Logging, reproducibility, etc.
├── docker/                  # 🐳 Training + inference Dockerfiles
├── mlruns/                  # 🧪 MLflow experiment tracking
├── mlflow/                  # ⚙️ Config for MLflow server (optional)
├── Dockerfile               # 🔧 Main container spec
├── docker-compose.yml       # 🚀 Stack for local dev
├── requirements.txt         # 📦 Python dependencies
├── README.md                # 📘 Docs & instructions
├── start.sh                 # 🏁 Easy entrypoint to run things
└── experiment/              # 📁 Jupyter notebooks, exploration
`
      },
//       {
//         id: 'code',
//         title: 'Code Snippets',
//         type: SectionTypes.CODE,
//         snippets: [
//           { title: "Data Augmentation (Albumentations)", language: "python", code: `
// import albumentations as A
// from albumentations.pytorch import ToTensorV2

// def get_train_transforms():
//     return A.Compose([
//         A.RandomResizedCrop(height=256, width=256, scale=(0.8, 1.0)),
//         A.HorizontalFlip(p=0.5),
//         A.VerticalFlip(p=0.5),
//         A.Rotate(limit=45, p=0.5),
//     ])`
//           },
//           { title: "PyTorch Data Loader", language: "python", code: `
// import torch
// from torch.utils.data import DataLoader

// # Create data loaders
// train_loader = DataLoader(
//     train_dataset,
//     batch_size=32,
//     shuffle=True,
//     num_workers=4
// )`
//           }
//         ]
//       },
      {
        id: 'roadmap',
        title: 'Challenges & Future Plans',
        type: SectionTypes.ROADMAP,
        challenges: [
          "Dealing with imbalanced classes in the dataset.",
          "Optimizing model size for mobile deployment.",
          "Handling varying lighting conditions.",
          "Ensuring model generalization.",
        ],
        futurePlans: [
          "Expand the model to cover more plant species.",
          "Implement real-time detection capabilities.",
          "Integrate with agricultural IoT systems.",
          "Add severity estimation.",
        ]
      }
    ]
  }
};

// ===================================================================================
//
//  END OF CONFIGURATION & CONTENT AREA
//  React component logic begins below.
//
// ===================================================================================


// --- Reusable Markdown component configuration ---
const MarkdownComponents = {
  // FIXED: Added `children` to all components to resolve jsx-a11y warnings.
  h2: ({ node, children, ...props }) => <h2 id={node.children[0].value.toLowerCase().replace(/\s+/g, '-')} className="text-2xl sm:text-3xl font-extrabold text-black mt-10 sm:mt-14 mb-5 scroll-mt-24" {...props}>{children}</h2>,
  h3: ({ node, children, ...props }) => <h3 id={node.children[0].value.toLowerCase().replace(/\s+/g, '-')} className="text-xl sm:text-2xl font-extrabold text-black mt-8 sm:mt-12 mb-4 scroll-mt-24" {...props}>{children}</h3>,
  p: ({ children, ...props }) => <p className="text-lg md:text-xl leading-relaxed text-gray-800 mb-6" {...props}>{children}</p>,
  ul: ({ children, ...props }) => <ul className="list-disc list-outside pl-5 mb-6 space-y-2 text-lg md:text-xl text-gray-800" {...props}>{children}</ul>,
  ol: ({ children, ...props }) => <ol className="list-decimal list-outside pl-5 mb-6 space-y-2 text-lg md:text-xl text-gray-800" {...props}>{children}</ol>,
  li: ({ children, ...props }) => <li className="leading-relaxed" {...props}>{children}</li>,
  blockquote: ({ children, ...props }) => <blockquote className="my-8 border-l-4 border-yellow-400 pl-4 sm:pl-6 italic text-gray-700 text-lg md:text-xl" {...props}>{children}</blockquote>,
  a: ({ children, ...props }) => <a className="text-black font-medium underline hover:text-gray-700 transition-colors break-words" {...props}>{children}</a>,
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (<div className="my-6 sm:my-8"><SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" customStyle={{ fontSize: '14px', lineHeight: '1.4', margin: 0 }} {...props}>{String(children).replace(/\n$/, '')}</SyntaxHighlighter></div>) : (<code className="bg-yellow-200 text-yellow-900 font-mono text-[0.9em] px-1.5 py-0.5 rounded-sm break-words" {...props}>{children}</code>);
  },
  table: ({ children, ...props }) => <div className="my-8 w-full overflow-x-auto border-2 border-black"><table className="w-full min-w-full border-collapse text-base" {...props}>{children}</table></div>,
  thead: ({ children, ...props }) => <thead className="bg-black text-white" {...props}>{children}</thead>,
  th: ({ children, ...props }) => <th className="text-left font-bold p-3 border-r-2 border-white last:border-r-0" {...props}>{children}</th>,
  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
  tr: ({ children, ...props }) => <tr className="border-b-2 border-black/10 last:border-b-0" {...props}>{children}</tr>,
  td: ({ children, ...props }) => <td className="p-3 border-r-2 border-black/10 last:border-r-0" {...props}>{children}</td>,
};


// --- Individual Section Components ---
const OverviewSection = ({ content }) => <p className="text-lg text-gray-800 leading-relaxed">{content}</p>;
const DocumentationSection = ({ content }) => <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>{content}</ReactMarkdown>;
const MetricsSection = ({ data }) => (
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div className="lg:col-span-2"><div className="grid grid-cols-2 gap-4">
      {data.map((metric) => (<div key={metric.name} className="bg-white border-2 border-black p-4 text-center shadow-[4px_4px_0px_#000]"><h4 className="text-sm font-bold text-black mb-1 leading-tight">{metric.name}</h4><p className="text-3xl font-extrabold text-black">{metric.value}%</p></div>))}
    </div></div>
    <div className="lg:col-span-3"><div className="h-80">
      <ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" stroke="#ccc" /><XAxis dataKey="name" stroke="#333" tick={{ fontSize: 12 }} /><YAxis domain={[90, 100]} stroke="#333" tick={{ fontSize: 12 }} /><Tooltip contentStyle={{ backgroundColor: '#000', color: '#fff', border: 'none' }} cursor={{ fill: 'rgba(250, 204, 21, 0.3)' }} /><Bar dataKey="value" fill="#facc15" barSize={30} /></BarChart></ResponsiveContainer>
    </div></div>
  </div>
);
const StructureSection = ({ content }) => (
  <div className="border-2 border-black overflow-hidden">
    <div className="bg-black text-white p-3 border-b-2 border-black flex items-center gap-3"><FaFolder /><h3 className="font-bold">Project Root</h3></div>
    <SyntaxHighlighter language="bash" style={vscDarkPlus} PreTag="div" customStyle={{ margin: 0 }}>{content}</SyntaxHighlighter>
  </div>
);
const CodeSection = ({ snippets }) => (
  <div className="space-y-8">
    {snippets.map((snippet, index) => (
      <div key={index} className="border-2 border-black overflow-hidden">
        <div className="bg-black text-white p-3 border-b-2 border-black flex justify-between items-center"><h3 className="font-bold">{snippet.title}</h3><span className="text-xs font-mono uppercase bg-gray-700 px-2 py-0.5">{snippet.language}</span></div>
        <SyntaxHighlighter language={snippet.language} style={vscDarkPlus} PreTag="div" customStyle={{ margin: 0 }}>{String(snippet.code).trim()}</SyntaxHighlighter>
      </div>
    ))}
  </div>
);
const RoadmapSection = ({ challenges, futurePlans }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="bg-gray-50 border-2 border-black p-6 md:p-8"><h3 className="text-2xl font-extrabold text-black mb-4 flex items-center gap-2"><FaExclamationTriangle className="text-yellow-500" /> Challenges</h3><ul className="space-y-3 text-lg list-disc list-outside pl-5 text-gray-800">{challenges.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
    <div className="bg-gray-50 border-2 border-black p-6 md:p-8"><h3 className="text-2xl font-extrabold text-black mb-4 flex items-center gap-2"><FaLightbulb className="text-blue-500" /> Future Work</h3><ul className="space-y-3 text-lg list-disc list-outside pl-5 text-gray-800">{futurePlans.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
  </div>
);


// --- Smart Sidebar with Collapsible Sections ---
const ProjectSidebar = ({ project, activeId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (id) => {
    setOpenSections(prev => ({...prev, [id]: !prev[id]}));
  };
  
  const handleNavClick = (e, hash) => {
    e.preventDefault();
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, null, `#${hash}`);
  };

  const enhancedSidebar = useMemo(() => {
    return project.sidebar.map(category => ({
      ...category,
      links: category.links.map(link => {
        if (!link.subheadings) return link;
        const section = project.sections.find(s => s.id === link.id);
        if (!section || section.type !== SectionTypes.DOCUMENTATION) return link;
        
        const subheadings = [...section.content.matchAll(/^(##|###)\s(.*)/gm)].map(match => ({
          level: match[1].length,
          title: match[2].trim(),
          id: match[2].trim().toLowerCase().replace(/\s+/g, '-'),
        }));
        return { ...link, children: subheadings };
      }),
    }));
  }, [project]);

  // Effect to auto-open section if a child is active
  useEffect(() => {
    const newOpenSections = {};
    enhancedSidebar.forEach(category => {
      category.links.forEach(link => {
        if (link.children && link.children.some(child => child.id === activeId)) {
          newOpenSections[link.id] = true;
        }
      });
    });
    setOpenSections(prev => ({ ...prev, ...newOpenSections }));
  }, [activeId, enhancedSidebar]);


  const filteredNavItems = useMemo(() => {
    if (!searchTerm) return enhancedSidebar;
    const lowercasedFilter = searchTerm.toLowerCase();
    return enhancedSidebar.map(category => {
      const filteredLinks = category.links.filter(link => 
        link.title.toLowerCase().includes(lowercasedFilter) ||
        (link.children && link.children.some(child => child.title.toLowerCase().includes(lowercasedFilter)))
      );
      return { ...category, links: filteredLinks };
    }).filter(category => category.links.length > 0);
  }, [searchTerm, enhancedSidebar]);

  return (
    <aside className="sticky top-24 w-full">
      <div className="relative mb-6">
        <input type="text" placeholder="Search this page..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white border-b-2 border-gray-300 focus:border-black focus:ring-0 text-sm py-2 pl-9 pr-3" />
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
      <nav>
        {filteredNavItems.map(item => (
          <div key={item.category} className="mb-5">
            <h3 className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">{item.category}</h3>
            <ul>
              {item.links.map(link => (
                <li key={link.id}>
                  <div className="flex items-center justify-between">
                    <a href={link.external ? link.href : `#${link.id}`} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined} onClick={(e) => handleNavClick(e, link.id)}
                      className={`text-sm py-1.5 transition-all duration-200 border-l-2 flex-grow ${activeId === link.id && !link.children ? 'text-black font-semibold border-yellow-400 pl-3' : 'text-gray-500 hover:text-black border-transparent hover:border-gray-300 pl-3'}`}>
                      {link.title}{link.external && <FaExternalLinkAlt className="inline-block w-3 h-3 ml-1.5 opacity-60" />}
                    </a>
                    {link.children && (
                      <button onClick={() => toggleSection(link.id)} className="p-1 text-gray-400 hover:text-black">
                        <ChevronDown size={16} className={`transition-transform duration-200 ${openSections[link.id] ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {link.children && (
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSections[link.id] ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className="pl-4 mt-1">
                        {link.children.map(child => (
                          <li key={child.id}>
                            <a href={`#${child.id}`} onClick={(e) => handleNavClick(e, child.id)} className={`flex items-center justify-between text-sm py-1 transition-all duration-200 border-l-2 ${activeId === child.id ? 'text-black font-semibold border-yellow-400 pl-3' : 'text-gray-500 hover:text-black border-transparent hover:border-gray-300 pl-3'}`}>
                               <span className={child.level === 3 ? 'ml-3' : ''}>{child.title}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {filteredNavItems.length === 0 && <p className="text-sm text-gray-500">No results found.</p>}
      </nav>
    </aside>
  );
};


// --- Main Page Component ---
const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = projectData[projectId];
  
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      let currentId = '';
      const allHeadings = document.querySelectorAll('main section[id], main h2[id], main h3[id]');
      
      allHeadings.forEach(heading => {
        if (heading.offsetTop - 150 <= window.scrollY) {
          currentId = heading.id;
        }
      });
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.title = `${project?.title || 'Project'} | Muhumuza Deus`;
  }, [project]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);


  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-center px-4">
        <div><h2 className="text-4xl font-extrabold mb-4">Project Not Found</h2><Link to="/projects" className="inline-block bg-yellow-400 text-black px-6 py-3 border-2 border-black font-bold shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all duration-200"><FaArrowLeft className="inline mr-2" /> Back to Projects</Link></div>
      </div>
    );
  }
  
  const sectionComponentMap = {
    [SectionTypes.OVERVIEW]: OverviewSection,
    [SectionTypes.DOCUMENTATION]: DocumentationSection,
    [SectionTypes.METRICS]: MetricsSection,
    [SectionTypes.PROJECT_STRUCTURE]: StructureSection,
    [SectionTypes.CODE]: CodeSection,
    [SectionTypes.ROADMAP]: RoadmapSection,
  };

  return (
    <div className="bg-white text-black font-sans">
      <header className="bg-yellow-400 border-b-4 border-black">
        <div className="container mx-auto px-4 pt-24 pb-16 lg:pt-28 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div><h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-4">{project.title}</h1><p className="text-lg md:text-xl text-black/80 mb-6 max-w-lg">{project.description}</p><div className="flex flex-wrap gap-2 mb-8">{project.tags.map((tag) => ( <span key={tag} className="px-3 py-1 bg-black text-white rounded-full text-xs font-bold">{tag}</span> ))}</div><a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-black px-6 py-3 border-2 border-black font-bold shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all duration-200"><FaGithub className="inline-block mr-2" /> View on GitHub</a></div>
              <div className="hidden lg:block"><div className="bg-gray-50 border-2 border-black transition-all duration-300 ease-in-out hover:shadow-[8px_8px_0px_#000] hover:-translate-x-1 hover:-translate-y-1"><img src={project.image} alt={`${project.title} preview`} className="w-full h-full object-cover"/></div></div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12">
          <div className="hidden lg:block lg:col-span-3">
            <ProjectSidebar project={project} activeId={activeId} />
          </div>
          <main className="lg:col-span-9 mt-12 lg:mt-0">
            <div className="space-y-16 lg:space-y-20">
                {project.sections.map((section) => {
                  const Component = sectionComponentMap[section.type];
                  return Component ? (
                    <section key={section.id} id={section.id} className="scroll-mt-24">
                      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-8 scroll-mt-24">{section.title}</h2>
                      <Component {...section} />
                    </section>
                  ) : null;
                })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;