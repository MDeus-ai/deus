import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
//  START OF CONFIGURATION & CONTENT AREA (IMPROVED)
//
// ===================================================================================

const SectionTypes = {
  DOCUMENTATION: 'documentation',
  METRICS: 'metrics',
  ROADMAP: 'roadmap',
  PROJECT_STRUCTURE: 'project_structure',
};

const projectData = {
  "plantvision-cv001dd": {
    id: "plantvision-cv001dd",
    title: "PlantVision Disease Detection",
    description: "An end-to-end deep learning system for detecting and classifying different kinds of plant diseases based on their leaves",
    image: "/assets/images/project/plantvision.jpg",
    github: "https://github.com/MDeus-ai/PlantVision",
    tags: ["PyTorch", "Computer Vision", "FastAPI", "Docker", "Flutter", "MLOps"],

    sidebar: [
      {
        category: 'Project Links',
        links: [
          { id: 'github-link', title: 'GitHub Repository', external: true, href: "https://github.com/MDeus-ai/PlantVision" }
        ]
      },
      {
        category: 'On this page',
        links: [
          { id: 'overview', title: 'Overview', subheadings: true },
          { id: 'metrics', title: 'Performance Metrics' },
          { id: 'structure', title: 'Project Structure' },
          { id: 'roadmap', title: 'Roadmap & Challenges' },
        ]
      },
    ],

    sections: [
      {
        id: 'overview',
        title: 'Overview & Documentation',
        type: SectionTypes.DOCUMENTATION,
        content: `
## The Problem & Solution

Crop diseases are a primary threat to global food security, causing an average of 40% yield loss annually. For millions of small-scale farmers and home gardeners, early and accurate disease identification is the key to effective management, but access to expert agricultural advice is often limited and expensive.

**PlantVision** addresses this challenge by democratizing plant pathology. It uses a highly accurate and efficient deep learning model to provide instant disease diagnosis from a simple photograph of a plant leaf. The system is designed for accessibility, with a offline-first mobile app for fieldwork and a scalable API for broader integration.

---

### System Architecture

The project is architected as a robust, production-ready system with three core components:

1.  **PyTorch Classification Model**: The heart of the system is an EfficientNet model fine-tuned for high accuracy on plant leaf images.
2.  **FastAPI Backend**: A high-performance, containerized REST API serves the model, handling image preprocessing and inference requests.
3.  **Cross-Platform Mobile App**: A Flutter-based application that allows users to perform offline inference directly on their device using a quantized version of the model.

> *A high-level view of the system architecture. Placeholder for diagram.*

---

### Dataset & Preprocessing

The model was trained on the **PlantVillage Dataset**, a public benchmark containing over 54,000 images of healthy and diseased leaves across 14 plant species and 38 distinct classes. To build a model that is robust to real-world variations, a strong augmentation pipeline was crucial.

*   **Geometric Augmentations**: Random resized crops, flips, and rotations.
*   **Color Augmentations**: Adjustments to brightness, contrast, and saturation.
*   **Normalization**: Images were normalized using ImageNet's mean and standard deviation.

---

### Performance Evaluation

The final model was evaluated on a held-out test set (20% of the total data).

| Metric          | Score   | Description                              |
|:----------------|:--------|:-----------------------------------------|
| **Accuracy**    | 98.7%   | Overall percentage of correct predictions. |
| **Precision**   | 97.2%   | Ability of the model not to label a negative sample as positive. |
| **Recall**      | 96.5%   | Ability of the model to find all the positive samples. |
| **F1-Score**    | 96.8%   | The weighted average of Precision and Recall. |

> **Note:** These are weighted averages across all 38 classes to account for moderate class imbalance in the dataset.

---

### Mathematical Formulation

The core of the classification task is minimizing the Cross-Entropy Loss, which is ideal for multi-class problems. The function is defined as:

$$
L_{CE} = - \\sum_{i=1}^{C} y_i \\log(\\hat{y}_i)
$$

Where:
- $C$ is the total number of classes (38 in our case).
- $y_i$ is the binary indicator (0 or 1) if class label $i$ is the correct classification.
- $\\hat{y}_i$ is the predicted probability for class $i$.
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
          { name: "Top-2 Acc", value: 99.4 },
        ]
      },
      {
        id: 'structure',
        title: 'Project Structure',
        type: SectionTypes.PROJECT_STRUCTURE,
        content: `
PlantVision_cv001dd/
├── configs/                  # The Recipe Book: All experiment parameters.
│   ├── data_config.yaml
│   ├── model_config.yaml
│   └── train_config.yaml
├── data/                     # All project data.
│   ├── processed/            # Cleaned, transformed data for training.
│   ├── raw/                  # Original, immutable data.
│   └── README.md             # README containing information about the datasets
├── logo/               
│   └── logo.png
├── mlruns/                   # MLflow experimentations
├── notebooks/                # The Lab Notebook: For exploration and analysis.
├── outputs/                  # Outputs from the system
│   ├── best_model.pth
│   ├── class_names.json
│   ├── classification_report.txt
│   └── confusion_matrix.png
│   
├── scripts/               
│   └── run_docker.sh
├── src/                      # All PlantVision source code.
│   ├── PlantVision/          # The core installable package for our project.
│   │   ├── data/
│   │   │   ├── __init__.py
│   │   │   ├── loader.py
│   │   │   └── transforms.py
│   │   ├── models/
│   │   │   └── efficientnet/
│   │   │       ├── __init__.py
│   │   │       └── EfficientNet.py 
│   │   ├── __init__.py
│   │   ├── evaluate.py       # Entrypoint for training.
│   │   ├── paths.py          # Entrypoint for evaluation.
│   │   ├── predict.py        # Entrypoint for evaluation.
│   │   ├── train.py
│   │   └── utils.py              
├── tests/                    # Unit tests to verify if all components work as intended
│   ├── data/
│   │   ├── __init__.py
│   │   ├── test_loader.py
│   │   └── test_transforms.py
│   ├── models/
│   │   └── efficientnet/
│   │   │       ├── __init__.py
│   │   │       └── test_efficientnet.py
│   │   ├── __init__.py
│   │   ├── conftest.py          # Creates a simple temporary dummy project structure similar to this
│   │   ├── test_evaluate.py       
│   │   ├── test_predict.py     
│   │   └── test_train.py
├── .dockerignore             # Tells Docker what to ignore.
├── Dockerfile                # The Shipping Container: For reproducibility.
├── LICENSE
├── pytest.ini                # Suppress warnings during unit tests
├── README.md                 # Project explanation.
├── requirements.txt          # PlantVision Project dependencies.
└── setup.py                  # Build script for the project
`
      },
      {
        id: 'roadmap',
        title: 'Roadmap & Challenges',
        type: SectionTypes.ROADMAP,
        challenges: [
          "**Domain Shift**: Ensuring the model generalizes well to images taken with different cameras and lighting not present in the training data.",
          "**Class Ambiguity**: Some diseases present very similar visual symptoms, making them difficult for the model to distinguish.",
          "**Model Size vs. Accuracy**: Continually balancing the trade-off between performance and resource footprint for efficient on-device inference.",
        ],
        futurePlans: [
          "**Expand Dataset**: Incorporate more plant species and disease varieties, including user-submitted images with a verification pipeline.",
          "**Disease Severity Estimation**: Move beyond classification to regression, estimating the severity of the disease (e.g., % leaf area affected).",
          "**CI/CD for Model Retraining**: Implement a full MLOps pipeline to automatically retrain and deploy the model as new data becomes available.",
        ]
      }
    ]
  }
};

// ===================================================================================
//
//  END OF CONFIGURATION & CONTENT AREA
//
// ===================================================================================

// -----------------------------
// Markdown custom renderers
// -----------------------------
const MarkdownComponents = {
  h2: ({ node, children, ...props }) => {
    // Some headings may include inline nodes; build a safe id
    const text = node.children ? node.children.map(c => c.value || '').join('') : '';
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
    return <h2 id={id} className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-10 sm:mt-14 mb-5 scroll-mt-24 font-heading" {...props}>{children}</h2>;
  },
  h3: ({ node, children, ...props }) => {
    const text = node.children ? node.children.map(c => c.value || '').join('') : '';
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
    return <h3 id={id} className="text-xl sm:text-2xl font-extrabold text-text-primary mt-8 sm:mt-12 mb-4 scroll-mt-24 font-heading" {...props}>{children}</h3>;
  },
  p: ({ children, ...props }) => <p className="text-lg leading-relaxed text-text-secondary mb-6" {...props}>{children}</p>,
  ul: ({ children, ...props }) => <ul className="list-disc list-outside pl-5 mb-6 space-y-2 text-lg text-text-secondary" {...props}>{children}</ul>,
  ol: ({ children, ...props }) => <ol className="list-decimal list-outside pl-5 mb-6 space-y-2 text-lg text-text-secondary" {...props}>{children}</ol>,
  li: ({ children, ...props }) => <li className="leading-relaxed" {...props}>{children}</li>,
  blockquote: ({ children, ...props }) => <blockquote className="my-8 border-l-4 border-accent pl-4 sm:pl-6 italic text-text-secondary text-lg" {...props}>{children}</blockquote>,
  a: ({ children, ...props }) => <a className="text-accent font-medium underline hover:opacity-80 transition-opacity break-words" {...props}>{children}</a>,
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <div className="my-6 sm:my-8">
        <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" customStyle={{ fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: '1.4', margin: 0 }} {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className="bg-accent/20 text-accent font-mono text-[0.9em] px-1.5 py-0.5 rounded-sm break-words" {...props}>{children}</code>
    );
  },
  table: ({ children, ...props }) => <div className="my-8 w-full overflow-x-auto border-2 border-border"><table className="w-full min-w-full border-collapse text-base" {...props}>{children}</table></div>,
  thead: ({ children, ...props }) => <thead className="bg-gray-900 text-white dark:bg-text-primary dark:text-background" {...props}>{children}</thead>,
  th: ({ children, ...props }) => <th className="text-left font-bold p-3 border-r-2 border-background/20 dark:border-background/20 last:border-r-0" {...props}>{children}</th>,
  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
  tr: ({ children, ...props }) => <tr className="border-b-2 border-border/10 last:border-b-0" {...props}>{children}</tr>,
  td: ({ children, ...props }) => <td className="p-3 border-r-2 border-border/10 last:border-r-0 text-text-secondary" {...props}><div>{children}</div></td>,
};

const DocumentationSection = ({ content }) => (
  <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>
    {content}
  </ReactMarkdown>
);

// -----------------------------
// Metrics Section
// -----------------------------
const MetricsSection = ({ data }) => (
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div className="lg:col-span-2">
      <div className="grid grid-cols-2 gap-4">
        {data.map((metric) => (
          <div key={metric.name}
               className="bg-surface border-2 border-border p-4 text-center transition-all duration-200 ease-in-out shadow-[4px_4px_0px_theme(colors.shadow)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0">
            <h4 className="text-sm font-bold text-text-primary mb-1 leading-tight">{metric.name}</h4>
            <p className="text-3xl font-extrabold text-text-primary font-heading">{metric.value}%</p>
          </div>
        ))}
      </div>
    </div>
    <div className="lg:col-span-3">
      <div className="h-80 bg-surface border-2 border-border p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-text-secondary) / 0.2)" />
            <XAxis dataKey="name" stroke="rgb(var(--color-text-secondary))" tick={{ fontSize: 12, fill: 'rgb(var(--color-text-secondary))' }} />
            <YAxis domain={[90, 100]} stroke="rgb(var(--color-text-secondary))" tick={{ fontSize: 12, fill: 'rgb(var(--color-text-secondary))' }} />
            <Tooltip contentStyle={{ backgroundColor: 'rgb(var(--color-background))', color: 'rgb(var(--color-text-primary))', border: '1px solid rgb(var(--color-border))' }} cursor={{ fill: 'rgb(var(--color-accent) / 0.2)' }} />
            <Bar dataKey="value" fill="rgb(var(--color-accent))" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

// -----------------------------
// Structure Section
// -----------------------------
const StructureSection = ({ content }) => (
  <div className="border-2 border-border overflow-hidden">
    <div className="bg-text-primary text-background p-3 border-b-2 border-border flex items-center gap-3">
      <FaFolder /><h3 className="font-bold font-body">Project Root</h3>
    </div>
    <SyntaxHighlighter language="bash" style={vscDarkPlus} PreTag="div" customStyle={{ margin: 0, fontFamily: 'var(--font-mono)' }}>
      {content.trim()}
    </SyntaxHighlighter>
  </div>
);

// -----------------------------
// Roadmap Section (render items as markdown to keep formatting)
// -----------------------------
const RoadmapSection = ({ challenges = [], futurePlans = [] }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="bg-surface border-2 border-border p-6 md:p-8 transition-all duration-200 ease-in-out shadow-[8px_8px_0px_theme(colors.shadow)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 active:translate-x-0 active:translate-y-0">
      <h3 className="text-2xl font-extrabold text-text-primary mb-4 flex items-center gap-2 font-heading">
        <FaExclamationTriangle className="text-yellow-500" /> Challenges
      </h3>
      <ul className="space-y-3 text-lg list-disc list-outside pl-5 text-text-secondary">
        {challenges.map((item, i) => (
          <li key={i} className="leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{item}</ReactMarkdown>
          </li>
        ))}
      </ul>
    </div>
    <div className="bg-surface border-2 border-border p-6 md:p-8 transition-all duration-200 ease-in-out shadow-[8px_8px_0px_theme(colors.shadow)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 active:translate-x-0 active:translate-y-0">
      <h3 className="text-2xl font-extrabold text-text-primary mb-4 flex items-center gap-2 font-heading">
        <FaLightbulb className="text-blue-500" /> Future Work
      </h3>
      <ul className="space-y-3 text-lg list-disc list-outside pl-5 text-text-secondary">
        {futurePlans.map((item, i) => (
          <li key={i} className="leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{item}</ReactMarkdown>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// -----------------------------
// Sidebar (memoized and enhanced)
// -----------------------------
const ProjectSidebar = ({ project, activeId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSections, setOpenSections] = useState({});
  const enhancedSidebar = useMemo(() => {
    // improved regex to match ATX headings like "## Title" or "### Title"
    const headingRegex = /^(?:\s{0,3})(#{2,3})\s+(.*)$/gm;
    return project.sidebar.map(category => ({
      ...category,
      links: category.links.map(link => {
        if (!link.subheadings) return link;
        const section = project.sections.find(s => s.id === link.id);
        if (!section || !section.content) return link;
        const subheadings = [];
        let match;
        try {
          while ((match = headingRegex.exec(section.content)) !== null) {
            const level = match[1].length; // 2 or 3
            const title = match[2].trim();
            const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
            subheadings.push({ level, title, id });
            // avoid infinite loops if zero-length match (shouldn't happen)
            if (match.index === headingRegex.lastIndex) headingRegex.lastIndex++;
          }
        } catch (e) {
          // fallback to no children if something goes wrong
          console.warn('Error parsing subheadings', e);
        }
        return { ...link, children: subheadings };
      }),
    }));
  }, [project]);

  useEffect(() => {
    // auto-open sidebar groups that contain activeId
    const newOpen = {};
    enhancedSidebar.forEach(cat => {
      cat.links.forEach(link => {
        if (link.children && link.children.some(c => c.id === activeId)) {
          newOpen[link.id] = true;
        }
      });
    });
    setOpenSections(prev => ({ ...prev, ...newOpen }));
  }, [activeId, enhancedSidebar]);

  const filteredNavItems = useMemo(() => {
    if (!searchTerm) return enhancedSidebar;
    const lowercased = searchTerm.toLowerCase();
    return enhancedSidebar.map(category => {
      const filteredLinks = category.links.filter(link =>
        (link.title && link.title.toLowerCase().includes(lowercased)) ||
        (link.children && link.children.some(child => child.title.toLowerCase().includes(lowercased)))
      );
      return { ...category, links: filteredLinks };
    }).filter(category => category.links.length > 0);
  }, [searchTerm, enhancedSidebar]);

  const toggleSection = useCallback((id) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    const element = document.getElementById(hash);
    if (element) {
      window.history.pushState(null, null, `#${hash}`);
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <aside className="sticky top-24 w-full">
      <div className="relative mb-6">
        <input aria-label="Search this page" type="text" placeholder="Search this page..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-surface border-b-2 border-border/30 focus:border-border text-text-primary placeholder:text-text-secondary/70 focus:ring-0 text-sm py-2 pl-9 pr-3 font-mono" />
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/50" />
      </div>
      <nav>
        {filteredNavItems.map(item => (
          <div key={item.category} className="mb-5">
            <h3 className="text-xs text-text-secondary font-bold uppercase tracking-wider mb-2">{item.category}</h3>
            <ul>
              {item.links.map(link => (
                <li key={link.id}>
                  <div className="flex items-center justify-between">
                    <a href={link.external ? link.href : `#${link.id}`} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined} onClick={(e) => !link.external && handleNavClick(e, link.id)}
                      className={`text-sm py-1.5 transition-all duration-200 border-l-2 flex-grow ${activeId === link.id && !link.children ? 'text-text-primary font-semibold border-accent pl-3' : 'text-text-secondary hover:text-text-primary border-transparent hover:border-border/30 pl-3'}`}>
                      {link.title}{link.external && <FaExternalLinkAlt className="inline-block w-3 h-3 ml-1.5 opacity-60" />}
                    </a>
                    {link.children && (
                      <button aria-label={`Toggle ${link.title}`} onClick={() => toggleSection(link.id)} className="p-1 text-text-secondary/60 hover:text-text-primary">
                        <ChevronDown size={16} className={`transition-transform duration-200 ${openSections[link.id] ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {link.children && (
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSections[link.id] ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className="pl-4 mt-1">
                        {link.children.map(child => (
                          <li key={child.id}>
                            <a href={`#${child.id}`} onClick={(e) => handleNavClick(e, child.id)} className={`flex items-center text-sm py-1 transition-all duration-200 border-l-2 ${activeId === child.id ? 'text-text-primary font-semibold border-accent pl-3' : 'text-text-secondary hover:text-text-primary border-transparent hover:border-border/30 pl-3'}`}>
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
        {filteredNavItems.length === 0 && <p className="text-sm text-text-secondary">No results found.</p>}
      </nav>
    </aside>
  );
};

// -----------------------------
// Main page
// -----------------------------
const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = projectData[projectId];
  const [activeId, setActiveId] = useState('');
  const [imageError, setImageError] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    document.title = `${project?.title || 'Project'} | Muhumuza Deus`;
  }, [project]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  // IntersectionObserver for active heading tracking (better performance than scroll events)
  useEffect(() => {
    if (!project) return;
    const options = {
      root: null,
      rootMargin: '-40% 0% -40% 0%', // trigger when heading is near center
      threshold: 0,
    };
    const callback = (entries) => {
      // Find the entry with isIntersecting true and highest boundingClientRect.top
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);
      if (visible.length > 0) {
        setActiveId(visible[0].target.id || '');
      } else {
        // fallback: choose first section id
        setActiveId(project.sections?.[0]?.id || '');
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observerRef.current = observer;
    const allHeadings = document.querySelectorAll('main section[id], main h2[id], main h3[id]');
    allHeadings.forEach(h => observer.observe(h));
    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [project, projectId]);

  if (!project) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center text-center px-4">
            <div>
                <h2 className="text-4xl font-extrabold mb-4 text-text-primary font-heading">Project Not Found</h2>
                <Link to="/" className="inline-flex items-center justify-center bg-accent text-accent-text px-6 py-3 border-2 border-border font-bold transition-all duration-200 hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 active:translate-x-0 active:translate-y-0 shadow-[6px_6px_0px_theme(colors.shadow)]">
                    <FaArrowLeft className="inline mr-2" /> Back to Home
                </Link>
            </div>
        </div>
    );
  }

  const sectionComponentMap = {
    [SectionTypes.DOCUMENTATION]: DocumentationSection,
    [SectionTypes.METRICS]: MetricsSection,
    [SectionTypes.ROADMAP]: RoadmapSection,
    [SectionTypes.PROJECT_STRUCTURE]: StructureSection,
  };

  return (
    <div className="bg-background text-text-primary font-body">
      <header className="bg-surface text-text-primary border-b border-border/20">
        <div className="container mx-auto px-4 pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-text-primary font-heading leading-tight">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-gray-100 text-gray-800 border border-gray-300 rounded-full text-sm font-medium dark:bg-accent/10 dark:text-accent dark:border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-accent-text px-6 py-3 border-2 border-border font-bold transition-all duration-200 hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 active:translate-x-0 active:translate-y-0 shadow-[6px_6px_0px_theme(colors.shadow)]"
                >
                  <FaGithub className="w-5 h-5" />
                  View on GitHub
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-surface text-text-primary px-6 py-3 border-2 border-border font-bold transition-all duration-200 hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 active:translate-x-0 active:translate-y-0 shadow-[6px_6px_0px_theme(colors.shadow)] hover:bg-border/10"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* FIXED IMAGE SECTION (improved) */}
            <div className="order-first lg:order-last mb-8 lg:mb-0">
              <div className="relative max-w-md mx-auto lg:max-w-none lg:ml-[-2rem]">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-accent/5 -rotate-6 rounded-lg border-4 border-accent/20" aria-hidden="true"></div>

                {/* Main image container */}
                <div className="relative bg-surface border-2 border-border transition-all duration-300 ease-in-out shadow-[8px_8px_0px_theme(colors.shadow)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 active:translate-x-0 active:translate-y-0 rounded-lg overflow-hidden">
                  {!imageError ? (
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="w-full h-80 lg:h-96 object-cover"
                      loading="lazy"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                          <FaFolder className="w-8 h-8 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-2 font-heading">
                          {project.title}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          Project Preview
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12">
          <div className="hidden lg:block lg:col-span-3">
            <ProjectSidebar project={project} activeId={activeId} />
          </div>
          <main className="lg:col-span-9 mt-12 lg:mt-0" aria-live="polite">
            <div className="space-y-16 lg:space-y-20">
                {project.sections.map((section) => {
                  const Component = sectionComponentMap[section.type];
                  if (!Component) return null;
                  const showTitle = section.type !== SectionTypes.DOCUMENTATION;
                  return (
                    <section key={section.id} id={section.id} className="scroll-mt-24">
                      {showTitle && (
                         <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-8 text-text-primary font-heading">{section.title}</h2>
                      )}
                      <Component {...section} />
                    </section>
                  );
                })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
