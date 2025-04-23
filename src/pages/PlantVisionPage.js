import React, { useEffect } from 'react';
import { FaGithub, FaArrowLeft, FaChartLine, FaCode, FaFileAlt, FaExclamationTriangle, FaLightbulb, FaBook, FaFolder, FaLink, FaClipboard } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Using the previously selected theme
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// --- Sample Data (projectsData) remains the same ---
const projectsData = {
  "plantvision-cv001dd": {
    id: 1,
    title: "PlantVision cv001dd (Currently under development...)",
    description: "A Vision model based on the Convolutional Neural Network Architecture (CNN) for detecting and classifying plant diseases based on plant leaves",
    fullDescription: "PlantVision is an innovative deep learning solution that leverages computer vision to help farmers and agricultural specialists identify plant diseases quickly and accurately. Built on a Convolutional Neural Network architecture, this model analyzes images of plant leaves to detect and classify diseases, providing early warning and treatment recommendations to prevent crop loss.",
    image: "/assets/images/project/plantvision.jpg",
    github: "https://github.com/MDeus-ai/PlantVision-cv001dd",
    tags: ["Tensorflow", "Pytorch", "Python", "Flutter", "Cuda"],
    metrics: [
      { name: "Model Accuracy", value: 92 }, // Example: Updated values
      { name: "Precision", value: 88 },
      { name: "Recall", value: 85 },
      { name: "F1 Score", value: 86 },
      { name: "Top 1% Acc", value: 95 }, // Shortened names for chart
      { name: "Top 5% Acc", value: 98 }
    ],
    documentation: `
# Architecture Overview

The system consists of three main components:

1.  **CNN-based Image Classification Model based on an EfficientNet-2b**: Built with TensorFlow and PyTorch.
2.  **Mobile Application**: Developed using Flutter.
3.  **Backend API**: Handles image processing, model inference, and treatment recommendations.

## Model Details

The model used is an EfficientNet-2b originally trained on the ImageNet dataset.

\`\`\`python

\`\`\`

### Technical Specifications

-   **Input Size**: 224x224x3 (RGB)
-   **Backbone**: EfficientNetB2 (Note: Example uses B2, text says modified ResNet50 - clarify consistency if needed)
-   **Dataset**: 50,000+ images across 38 disease classes
-   **Validation**: 5-fold cross-validation

## Deployment Guide

1.  Clone the repository: \`git clone <repo_url>\`
2.  Install dependencies: \`pip install -r requirements.txt\`
3.  Download pre-trained weights (link provided in repo)
4.  Configure environment variables (\`.env\` file)
5.  Run the application: \`python main.py\` or similar

## API Reference

| Endpoint         | Method | Description                          |
|------------------|--------|--------------------------------------|
| \`/api/analyze\`   | POST   | Submit an image for analysis         |
| \`/api/diseases\`  | GET    | Retrieve supported diseases         |
| \`/api/treatments\`| GET    | Get treatment recommendations        |

    `,
    codeSnippets: [
      {
        title: "Data Augmentation (Example using Albumentations)",
        language: "python",
        code: ``
      },
      {
        title: "Data Transformation (Pytorch data_loader.py)",
        language: "python",
        code: `import torch
from torchvision import datasets
from torchvision.transforms import v2 # Using updated transforms
from torch.utils.data import DataLoader

# Define image transformations for training and validation
train_transforms = v2.Compose([
    v2.Resize((240, 240)), # Slightly larger resize before random crop
    v2.RandomCrop((224, 224)),
    v2.RandomHorizontalFlip(p=0.5),
    v2.RandomRotation(degrees=10),
    v2.ColorJitter(brightness=0.1, contrast=0.1, saturation=0.1),
    # v2.ToImage(), # Convert PIL image to torch.Image
    v2.ToDtype(torch.float32, scale=True), # Convert to float and scale to [0, 1]
    v2.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

val_transforms = v2.Compose([
    v2.Resize((224, 224)),
    # v2.ToImage(),
    v2.ToDtype(torch.float32, scale=True),
    v2.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])


# CREATING DATASETS
# Ensure paths are correct
train_dataset = datasets.ImageFolder(
    root='/path/to/train/data',
    transform=train_transforms
)
val_dataset = datasets.ImageFolder(
    root='/path/to/validation/data',
    transform=val_transforms
)

# DATASET LOADERS
BATCH_SIZE = 64
NUM_WORKERS = 4 # Adjust based on system capabilities

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=NUM_WORKERS,
    pin_memory=True # Speeds up data transfer to GPU if using CUDA
)
val_loader = DataLoader(
    val_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False, # No need to shuffle validation data
    num_workers=NUM_WORKERS,
    pin_memory=True
)`
      }
    ],
    challenges: [
      "Dealing with imbalanced classes in the dataset (e.g., using weighted loss, over/under-sampling).",
      "Optimizing model size for mobile deployment (quantization, pruning) without sacrificing accuracy.",
      "Handling varying lighting conditions and backgrounds in field photos (robust data augmentation).",
      "Ensuring model generalization to unseen plant varieties or growth stages."
    ],
    futurePlans: [
      "Expand the model to cover more plant species and diseases.",
      "Implement real-time detection capabilities using optimized models (e.g., TensorFlow Lite, ONNX Runtime).",
      "Integrate with agricultural IoT systems for automated monitoring and alerts.",
      "Develop a system for tracking disease progression over time.",
      "Add severity estimation alongside classification."
    ]
  }
  // Add more project entries as needed
};


const SectionTypes = {
  OVERVIEW: 'overview',
  DOCUMENTATION: 'documentation',
  METRICS: 'metrics',
  PROJECT_STRUCTURE: 'project_structure',
  CODE: 'code',
  DATA_LINKS: 'data_links',
  APPENDICES: 'appendices',
  CHALLENGES: 'challenges'
};

// Define the chosen theme and common styles
const codeHighlightTheme = vscDarkPlus;

const commonCodeStyle = {
  fontFamily: 'Consolas, "Courier New", monospace',
  padding: '1rem',
  margin: 0,
  borderRadius: '0.375rem', // Tailwind's rounded-md
  fontSize: '0.875rem',
  lineHeight: '1.6',
  overflowX: 'auto',
  // Let the theme dictate the background color primarily
  // Example: Set a specific background if the theme doesn't provide one or needs override
  // backgroundColor: '#1e1e1e',
};


const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = projectsData[projectId];

  useEffect(() => {
    document.title = `${project?.title || 'Project'} | Muhumuza Deus`;
    window.scrollTo(0, 0);
    return () => {
      document.title = 'Muhumuza Deus';
    };
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-900 text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 font-roboto-slab">Project Not Found</h2>
          <Link to="/projects" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition-colors font-roboto-slab">
            <FaArrowLeft /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const metricsData = project.metrics.map(metric => ({
    name: metric.name,
    value: metric.value
  }));

  // --- Configure Markdown Components ---
  const MarkdownComponents = {
    // --- Keep other Markdown components (img, h1, h2, etc.) as they were ---
    img: ({ node, src, alt, ...props }) => {
      const imgSrc = src.startsWith('/') ? src : `/${src}`;
      return (
        <div className="my-4 md:my-8 flex justify-center">
          <figure>
            <img
              src={imgSrc}
              alt={alt === "my_math" ? "Mathematical Formula" : alt}
              className="rounded-lg max-w-full h-auto mx-auto shadow-md border border-neutral-700"
              style={{ maxWidth: '700px' }}
              loading="lazy"
              {...props}
            />
            {alt && alt !== "my_math" && (
              <figcaption className="text-center text-xs sm:text-sm text-neutral-400 mt-2 font-roboto-slab">
                {alt}
              </figcaption>
            )}
          </figure>
        </div>
      );
    },
    h1: ({ children, ...props }) => (
      <h1 className="text-2xl sm:text-3xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 pb-1 border-b border-neutral-700 font-roboto-slab" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-xl sm:text-2xl font-bold mt-5 md:mt-6 mb-3 md:mb-4 pb-1 border-b border-neutral-800 font-roboto-slab" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2 md:mb-3 font-roboto-slab" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-3 md:mb-4 leading-relaxed text-sm sm:text-base text-gray-300 font-roboto-slab" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-outside pl-5 mb-3 md:mb-4 space-y-1 md:space-y-2 text-sm sm:text-base font-roboto-slab" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-outside pl-5 mb-3 md:mb-4 space-y-1 md:space-y-2 text-sm sm:text-base font-roboto-slab" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="mb-1 leading-relaxed text-sm sm:text-base text-gray-300 font-roboto-slab" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-neutral-600 pl-4 py-2 my-3 md:my-4 bg-neutral-800/60 italic text-sm sm:text-base font-roboto-slab text-gray-400"
        {...props}
      >
        {children}
      </blockquote>
    ),
     a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline font-roboto-slab text-sm sm:text-base"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children} <FaLink size="0.7em" className="inline ml-1" />
      </a>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-4 md:my-6 rounded-lg border border-neutral-700">
        <table
          className="min-w-full divide-y divide-neutral-700 text-xs sm:text-sm font-roboto-slab"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
        <thead className="bg-neutral-800" {...props}>{children}</thead>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-3 py-2 md:px-5 md:py-3 text-left text-xs md:text-sm font-medium text-neutral-300 uppercase tracking-wider font-roboto-slab"
        {...props}
      >
        {children}
      </th>
    ),
    tbody: ({ children, ...props }) => (
        <tbody className="bg-neutral-800/50 divide-y divide-neutral-750" {...props}>{children}</tbody>
    ),
    td: ({ children, ...props }) => (
      <td
        className="px-3 py-2 md:px-5 md:py-4 text-neutral-300 text-xs sm:text-sm font-roboto-slab"
        {...props}
      >
        {children}
      </td>
    ),

    // --- UPDATED CODE COMPONENT within Markdown ---
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (

        <div className="my-4 md:my-5"> {/* Simple margin wrapper */}
            <SyntaxHighlighter
                style={codeHighlightTheme}
                language={match[1]}
                PreTag="div"
                customStyle={commonCodeStyle} // Uses common style with built-in rounding
                wrapLongLines={false}
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        </div>
      ) : (
        // Keep inline code styling simple
        <code className="bg-neutral-700 px-1.5 py-0.5 rounded text-neutral-300 font-mono text-[0.85em]" {...props}>
          {children}
        </code>
      );
    },
  };


  // --- Define Sections (structure remains the same) ---
  const sections = [
    // --- Overview Section ---
    {
      id: SectionTypes.OVERVIEW,
      title: "Project Overview",
      icon: <FaFileAlt />,
      content: () => (
         <div className="bg-neutral-800 rounded-lg p-4 md:p-6 shadow-md border border-neutral-700">
          <p className="text-sm md:text-base leading-relaxed text-gray-300 font-roboto-slab">
            {project.fullDescription}
          </p>
        </div>
      )
    },
    // --- Documentation Section ---
    {
      id: SectionTypes.DOCUMENTATION,
      title: "Documentation",
      icon: <FaBook />,
      content: () => (
        // This ReactMarkdown instance will use the updated MarkdownComponents.code
        // which now renders code blocks without the extra outer border.
        <div className="bg-neutral-800 rounded-lg p-4 md:p-6 shadow-md border border-neutral-700">
          <article className="prose prose-invert prose-sm sm:prose-base max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              components={MarkdownComponents}
            >
              {project.documentation}
            </ReactMarkdown>
          </article>
        </div>
      )
    },
    // --- Metrics Section ---
    {
      id: SectionTypes.METRICS,
      title: "Key Metrics",
      icon: <FaChartLine />,
       content: () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-neutral-800 rounded-lg p-4 md:p-6 shadow-md border border-neutral-700">
            <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-3 md:mb-4 font-roboto-slab">
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {project.metrics.map((metric, index) => (
                <div key={index} className="bg-neutral-700 rounded-lg p-3 md:p-4 border border-neutral-600 flex flex-col items-center justify-center text-center">
                  <h4 className="text-xs md:text-sm font-medium text-gray-300 mb-1 font-roboto-slab leading-tight">
                    {metric.name}
                  </h4>
                  <p className="text-xl md:text-2xl font-bold text-gray-100 font-roboto-slab">
                    {metric.value}%
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-neutral-800 rounded-lg p-4 md:p-6 shadow-md border border-neutral-700">
            <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-3 md:mb-4 font-roboto-slab">
              Metrics Visualization
            </h3>
            <div className="h-60 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metricsData} margin={{ top: 5, right: 5, left: -25, bottom: 45 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis
                      dataKey="name"
                      angle={-60}
                      textAnchor="end"
                      interval={0}
                      height={60}
                      stroke="#BBB"
                      tick={{ fontSize: 9, fontFamily: 'Roboto Slab' }}
                    />
                  <YAxis domain={[0, 100]} stroke="#BBB" tick={{ fontSize: 10, fontFamily: 'Roboto Slab' }} />
                  <Tooltip
                      contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#EEE', fontSize: '12px', fontFamily: 'Roboto Slab' }}
                      itemStyle={{ color: '#EEE' }}
                      labelStyle={{ color: '#FFF', fontWeight: 'bold' }}
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                  <Bar dataKey="value" fill="#4ade80" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )
    },
    // --- Project Structure Section ---
     {
      id: SectionTypes.PROJECT_STRUCTURE,
      title: "Project Structure",
      icon: <FaFolder />,
      content: () => (
        // Keep this consistent, using SyntaxHighlighter directly for the structure
        <div className="bg-neutral-800 rounded-lg shadow-md border border-neutral-700 overflow-hidden">
          <SyntaxHighlighter
            language="bash"
            style={codeHighlightTheme}
            PreTag="div"
            customStyle={commonCodeStyle}
          >
{`cv001dd/ # Root directory
├── data/                 # Raw and Processed Data
│   ├── raw/              # Original untouched data
│   └── processed/        # Cleaned, augmented, split data
├── logs/                 # Training & experiment logs
│   ├── train/
│   └── validation/
├── outputs/              # Model outputs
│   ├── checkpoints/      # Saved model weights during training
│   └── best_model.h5     # Final best performing model
├── src/                  # Source code for the project
│   ├── callbacks/        # Custom Keras/PyTorch callbacks
│   │   ├── checkpoints.py
│   │   └── tensorboard.py
│   ├── data/             # Data loading and preprocessing scripts
│   │   └── data_loader.py # (Example shown in snippets)
│   ├── models/           # Model definitions
│   │   └── model.py      # Defines the CNN architecture
│   ├── train/            # Training scripts
│   │   └── train.py      # Main training loop
│   ├── evaluation/       # Model evaluation scripts
│   │   └── evaluate.py   # Calculates metrics on test set
│   ├── utils/            # Utility functions (logging, config, etc.)
│   │   └── logger.py
│   └── __init__.py
├── notebooks/            # Jupyter notebooks for exploration, visualization
├── tests/                # Unit and integration tests
│   ├── test_models.py
│   └── test_data.py
├── scripts/              # Helper scripts (inference, deployment)
│   ├── inference.py      # Run model on new data
│   └── deploy.py         # Deployment related scripts (e.g., Docker build)
├── requirements.txt      # Project dependencies
├── README.md             # Project overview and setup instructions
└── .gitignore            # Files/directories ignored by Git`}
          </SyntaxHighlighter>
        </div>
      )
    },
    // --- Code Snippets Section ---
    {
      id: SectionTypes.CODE,
      title: "Code Snippets",
      icon: <FaCode />,
      content: () => (
        // This section remains structurally the same, inheriting the common code style
        <div className="space-y-5 md:space-y-6">
          {project.codeSnippets.map((snippet, index) => (
            <div key={index} className="bg-neutral-800 rounded-lg overflow-hidden shadow-md border border-neutral-700">
              <div className="bg-neutral-700 px-3 py-2 md:px-4 md:py-3 flex justify-between items-center border-b border-neutral-600">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white font-roboto-slab">
                  {snippet.title}
                </h3>
                <span className="px-2 py-0.5 text-[10px] sm:text-xs bg-neutral-600 text-gray-300 rounded-full font-roboto-slab uppercase">
                  {snippet.language}
                </span>
              </div>
              <SyntaxHighlighter
                language={snippet.language}
                style={codeHighlightTheme}
                PreTag="div"
                customStyle={commonCodeStyle}
                wrapLongLines={false}
              >
                {String(snippet.code).trim()}
              </SyntaxHighlighter>
            </div>
          ))}
        </div>
      )
    },
    // --- Other sections (DATA_LINKS, APPENDICES, CHALLENGES) remain the same ---
     {
      id: SectionTypes.DATA_LINKS,
      title: "Relevant Links & Papers",
      icon: <FaLink />,
      content: () => (
        <div className="bg-neutral-800 rounded-lg p-4 md:p-6 shadow-md border border-neutral-700">
          <ul className="list-none space-y-3 text-sm md:text-base font-roboto-slab">
            <li>
              <FaGithub className="inline mr-2 text-gray-400" />
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Project GitHub Repository
              </a>
            </li>
            <li>
              <FaBook className="inline mr-2 text-gray-400" />
              <a href="https://arxiv.org/abs/1905.11946" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                EfficientNet: Rethinking Model Scaling for CNNs (arXiv)
              </a>
              <p className="text-xs text-gray-400 pl-6">Paper detailing the EfficientNet architecture and scaling.</p>
            </li>
             <li>
              <FaLink className="inline mr-2 text-gray-400" />
              <a href="https://pytorch.org/vision/stable/transforms.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Torchvision Transforms v2 Documentation
              </a>
              <p className="text-xs text-gray-400 pl-6">Details on the data transformations used.</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: SectionTypes.APPENDICES,
      title: "Appendices",
      icon: <FaClipboard />,
       content: () => (
        <div className="bg-neutral-800 rounded-lg p-4 md:p-6 shadow-md border border-neutral-700">
          <p className="text-gray-300 text-sm md:text-base font-roboto-slab italic">
             Currently empty. This section can include supplementary materials like detailed hyperparameter tuning results, confusion matrices, or specific setup guides for less common environments.
          </p>
        </div>
      )
    },
    {
      id: SectionTypes.CHALLENGES,
      title: "Challenges & Future Plans",
      icon: <FaExclamationTriangle />,
      content: () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-neutral-800 rounded-lg p-4 md:p-6 shadow-md border border-neutral-700">
            <h3 className="text-lg md:text-xl font-semibold text-gray-100 mb-3 flex items-center gap-2 font-roboto-slab">
              <FaExclamationTriangle className="text-yellow-500"/> Challenges Faced
            </h3>
            <ul className="space-y-2 text-sm md:text-base font-roboto-slab list-disc list-outside pl-5">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="text-gray-300">
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-neutral-800 rounded-lg p-4 md:p-6 shadow-md border border-neutral-700">
            <h3 className="text-lg md:text-xl font-semibold text-gray-100 mb-3 flex items-center gap-2 font-roboto-slab">
              <FaLightbulb className="text-blue-400"/> Future Enhancements
            </h3>
            <ul className="space-y-2 text-sm md:text-base font-roboto-slab list-disc list-outside pl-5">
              {project.futurePlans.map((plan, index) => (
                <li key={index} className="text-gray-300">
                  {plan}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  ];


  // --- Render Component ---
  return (
    <div className="min-h-screen bg-neutral-900 text-gray-200">
      {/* Global Styles */}
       <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css');

        body {
          font-family: 'Roboto Slab', serif;
          scroll-behavior: smooth;
        }
        .font-roboto-slab {
          font-family: 'Roboto Slab', serif;
        }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #1f2937; }
        ::-webkit-scrollbar-thumb { background-color: #4b5563; border-radius: 4px; border: 2px solid #1f2937; }
        ::-webkit-scrollbar-thumb:hover { background-color: #6b7280; }
        .katex { font-size: 1.1em; }
      `}</style>

      {/* Hero Section */}
      <header className="relative h-[30vh] sm:h-[35vh] md:h-[45vh] lg:h-[50vh] flex items-end pb-4 sm:pb-6 md:pb-10 justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={project.image || "/api/placeholder/1200/600"}
            alt={`${project.title} banner`}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-3 sm:px-4 max-w-5xl mx-auto w-full">
          {/* Back Button */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 bg-neutral-800/70 text-white rounded-md hover:bg-neutral-700/90 transition-all font-roboto-slab backdrop-blur-sm
                      px-2 py-1 text-xs
                      sm:px-3 sm:py-1.5 sm:text-sm sm:gap-2"
              title="Back to Projects"
            >
              <FaArrowLeft />
              <span className="hidden sm:inline">Back to Projects</span>
            </Link>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 font-roboto-slab drop-shadow-lg">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-3xl mx-auto mb-3 sm:mb-4 md:mb-5 px-2 font-roboto-slab drop-shadow">
            {project.description}
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-neutral-800/80 text-gray-300 rounded-full text-[10px] sm:text-xs font-medium hover:bg-neutral-700/90 transition-colors font-roboto-slab backdrop-blur-sm"
              >
                <span className="text-[9px] sm:text-xs">{section.icon}</span>
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-10 md:space-y-16">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-20 md:scroll-mt-24">
                <div className="flex items-center gap-3 mb-4 md:mb-6 pb-2 border-b border-neutral-700">
                    <span className="text-blue-400 text-xl sm:text-2xl">{section.icon}</span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100 font-roboto-slab">
                     {section.title}
                    </h2>
                </div>
                {section.content()}
              </section>
            ))}
        </div>
      </main>

      {/* Footer (remains the same) */}
       <footer className="bg-neutral-800 border-t border-neutral-700 py-6 md:py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p className="text-sm md:text-base font-roboto-slab mb-2">
            © {new Date().getFullYear()} Muhumuza Deus. All rights reserved.
          </p>
          <div className="flex justify-center items-center gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-200 transition-colors text-xs sm:text-sm font-roboto-slab"
              title="View Project on GitHub"
            >
              <FaGithub className="text-lg" />
              <span>GitHub</span>
            </a>
             <span className="text-gray-600">|</span>
             <Link to="/projects" className="text-gray-400 hover:text-gray-200 transition-colors text-xs sm:text-sm font-roboto-slab">
                Back to Projects
             </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetailPage;