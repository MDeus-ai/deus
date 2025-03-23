import React, { useEffect } from 'react';
import { FaGithub, FaArrowLeft, FaChartLine, FaCode, FaFileAlt, FaExclamationTriangle, FaLightbulb, FaBook, FaFolder, FaLink, FaClipboard } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Sample data - in a real app, you'd fetch this based on project ID
const projectsData = {
  "plantvision-cv001dd": {
    id: 1,
    title: "PlantVision (cv001dd)",
    description: "A Vision model based on the Convolutional Neural Network Architecture (CNN) for detecting and classifying plant diseases based on plant leaves",
    fullDescription: "PlantVision is an innovative deep learning solution that leverages computer vision to help farmers and agricultural specialists identify plant diseases quickly and accurately. Built on a Convolutional Neural Network architecture, this model analyzes images of plant leaves to detect and classify diseases, providing early warning and treatment recommendations to prevent crop loss.",
    image: "/assets/images/project/plantvision.jpg",
    github: "https://github.com/MDeus-ai/PlantVision-cv001dd",
    tags: ["Tensorflow", "Pytorch", "Python", "Flutter", "Cuda"],
    metrics: [
      { name: "Model Accuracy", value: 94.7 },
      { name: "Precision", value: 92.3 },
      { name: "Recall", value: 91.8 },
      { name: "F1 Score", value: 92.0 },
      { name: "Top 1% Accuracy", value: 98.5 },
      { name: "Top 5% Accuracy", value: 96.7 }
    ],
    documentation: `
# PlantVision Documentation

## Introduction

PlantVision is an innovative computer vision system designed for real-time identification and classification of plant diseases. It utilizes deep learning techniques to analyze plant leaf images and provide accurate diagnoses, helping in early disease detection and treatment.

## Architecture Overview

The system consists of three main components:

1. **CNN-based Image Classification Model**: Built with TensorFlow and PyTorch.
2. **Mobile Application**: Developed using Flutter.
3. **Backend API**: Handles image processing, model inference, and treatment recommendations.

## Model Details

The CNN architecture includes:

\`\`\`
Input Layer → Convolutional Layers → Pooling Layers → Fully Connected Layers → Output Layer
\`\`\`

### Technical Specifications

- **Input Size**: 224x224x3 (RGB)
- **Backbone**: Modified ResNet50
- **Dataset**: 50,000+ images across 38 disease classes
- **Validation**: 5-fold cross-validation

## Deployment Guide

1. Clone the repository
2. Install dependencies
3. Download pre-trained weights
4. Configure environment variables
5. Run the application

## API Reference

| Endpoint         | Method | Description                          |
|------------------|--------|--------------------------------------|
| /api/analyze     | POST   | Submit an image for analysis         |
| /api/diseases    | GET    | Retrieve supported diseases         |
| /api/treatments  | GET    | Get treatment recommendations        |

    `,
    codeSnippets: [
      {
        title: "Data Augmentation Script",
        language: "python",
        code: `
              import tensorflow as tf
              import os
              import random
              from tensorflow.keras.preprocessing.image import load_img, img_to_array, save_img

              def augment_images(input_dir, output_dir, num_augmentations):
                  """
                  Augments a specified number of images from a directory with diverse transformations 
                  and saves the augmented dataset, maintaining the original image sizes.

                  Parameters:
                  input_dir (str): Path to the directory containing the original images.
                  output_dir (str): Path to the output directory for augmented images.
                  num_augmentations (int): Number of images to randomly augment.
                  """
                  # Create the output directory if it doesn't exist
                  if not os.path.exists(output_dir):
                      os.makedirs(output_dir)

                  # List all image files in the input directory
                  image_files = [f for f in os.listdir(input_dir) if f.lower().endswith(('png', 'jpg', 'jpeg'))]
                  
                  if len(image_files) < num_augmentations:
                      raise ValueError("Number of augmentations exceeds the available images in the directory.")
                  
                  # Randomly select images for augmentation
                  selected_images = random.sample(image_files, num_augmentations)

                  # Define a function to apply diverse and advanced transformations
                  def apply_augmentations(image):
                      # Randomly flip
                      image = tf.image.random_flip_left_right(image)
                      image = tf.image.random_flip_up_down(image)

                      # Random rotation
                      radians = random.uniform(-45, 45) * (3.14159265 / 180.0)  # Limit rotation to ±30 degrees
                      image = rotate_image(image, radians)

                      # Random zoom
                      scales = [1.0, 1.2, 1.3, 1.5, 1.7, 1.9, 2.1, 2.4]
                      scale = random.choice(scales)
                      image = random_zoom(image, scale)

                      # Subtle brightness, contrast, saturation, and hue adjustments
                      image = tf.image.random_brightness(image, max_delta=0.35)
                      image = tf.image.random_contrast(image, lower=0.8, upper=1.2)
                      image = tf.image.random_saturation(image, lower=0.8, upper=1.2)
                      image = tf.image.random_hue(image, max_delta=0.1)  # Small hue adjustment

                      # Apply Gaussian noise
                      noise = tf.random.normal(shape=tf.shape(image), mean=0.0, stddev=0.037, dtype=tf.float32)  # Reduced noise
                      image = image + noise

                      # Clip pixel values to [0, 1]
                      image = tf.clip_by_value(image, 0.0, 1.0)
                      return image

                  def rotate_image(image, radians):
                      """Rotate the image using TensorFlow."""
                      image = tf.expand_dims(image, axis=0)
                      rotated_image = tf.keras.layers.RandomRotation(factor=(radians / (2 * 3.14159265)))(image)
                      return tf.squeeze(rotated_image, axis=0)

                  def random_zoom(image, scale):
                      """Apply random zoom by cropping and resizing."""
                      crop_height = min(int(scale * image.shape[0]), image.shape[0])
                      crop_width = min(int(scale * image.shape[1]), image.shape[1])
                      cropped_image = tf.image.random_crop(image, size=[crop_height, crop_width, image.shape[-1]])
                      return tf.image.resize(cropped_image, [image.shape[0], image.shape[1]])

                  # Process each selected image
                  for img_file in selected_images:
                      # Load the image
                      img_path = os.path.join(input_dir, img_file)
                      image = load_img(img_path)
                      image_array = img_to_array(image)

                      # Normalize the image
                      image_array = tf.convert_to_tensor(image_array / 255.0)

                      # Apply augmentations
                      augmented_image = apply_augmentations(image_array)

                      # Convert back to a valid image format
                      augmented_image = tf.clip_by_value(augmented_image * 255.0, 0, 255)
                      augmented_image = tf.cast(augmented_image, tf.uint8)

                      # Save the augmented image
                      augmented_img_path = os.path.join(output_dir, f"aug2_{img_file}")
                      save_img(augmented_img_path, augmented_image.numpy())

                  print(f"Augmented images saved in '{output_dir}'.")`
      },
    //   {
    //     title: "Data Augmentation",
    //     language: "python",
    //     code: `def create_data_generators():
    // """
    // Create data generators with augmentation.
    // """
    // train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    //     rescale=1./255,
    //     rotation_range=20,
    //     width_shift_range=0.2,
    //     height_shift_range=0.2,
    //     shear_range=0.2,
    //     zoom_range=0.2,
    //     horizontal_flip=True,
    //     fill_mode='nearest'
    // )
    
    // valid_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    //     rescale=1./255
    // )
    
    // return train_datagen, valid_datagen`
    //   }
    ],
    challenges: [
      "Dealing with imbalanced classes in the dataset",
      "Optimizing model size for mobile deployment without sacrificing accuracy",
      "Handling varying lighting conditions in field photos"
    ],
    futurePlans: [
      "Expand the model to cover more plant species and diseases",
      "Implement real-time detection capabilities",
      "Integrate with agricultural IoT systems for automated monitoring"
    ]
  }
};

// New section types
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

  // Convert metrics for chart display
  const metricsData = project.metrics.map(metric => ({
    name: metric.name,
    value: metric.value
  }));

  // Markdown components for documentation section, using the same code styling as code snippets
  const MarkdownComponents = {
    img: ({ node, src, alt, ...props }) => {
      const imgSrc = src.startsWith('/') ? src : `/${src}`;
      return (
        <div className="my-4 md:my-8">
          <img
            src={imgSrc}
            alt={alt}
            className="rounded-lg w-full max-w-3xl mx-auto"
            loading="lazy"
            {...props}
          />
          {alt && alt !== "my_math" && (
            <p className="text-center text-xs sm:text-sm text-neutral-400 mt-2 font-roboto-slab">
              {alt}
            </p>
          )}
        </div>
      );
    },
    h1: ({ children, ...props }) => (
      <h1 className="text-2xl sm:text-3xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 font-roboto-slab" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-xl sm:text-2xl font-bold mt-5 md:mt-6 mb-3 md:mb-4 font-roboto-slab" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-lg sm:text-xl font-bold mt-4 mb-2 md:mb-3 font-roboto-slab" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-3 md:mb-4 leading-relaxed text-sm sm:text-base font-roboto-slab" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside mb-3 md:mb-4 space-y-1 md:space-y-2 text-sm sm:text-base font-roboto-slab" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside mb-3 md:mb-4 space-y-1 md:space-y-2 text-sm sm:text-base font-roboto-slab" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed text-sm sm:text-base font-roboto-slab" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote 
        className="border-l-4 border-neutral-500 pl-4 py-2 my-3 md:my-4 bg-neutral-800/50 italic text-sm sm:text-base font-roboto-slab" 
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          className="rounded-lg my-3 md:my-4 text-xs sm:text-sm"
          customStyle={{ 
            fontFamily: 'monospace',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: '#1e293b',
            fontSize: '0.8rem'
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-neutral-800 px-1 py-0.5 rounded text-neutral-300 font-mono text-xs sm:text-sm" {...props}>
          {children}
        </code>
      );
    },
    a: ({ children, ...props }) => (
      <a 
        className="text-neutral-400 hover:text-neutral-300 transition-colors duration-300 underline text-sm sm:text-base font-roboto-slab" 
        {...props}
      >
        {children}
      </a>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-4 md:my-6">
        <table 
          className="min-w-full divide-y divide-neutral-700 border border-neutral-700 text-xs sm:text-sm font-roboto-slab" 
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th 
        className="px-3 py-2 md:px-6 md:py-3 bg-neutral-800 text-left text-xs md:text-sm font-medium text-neutral-300 uppercase tracking-wider border-b border-neutral-700 font-roboto-slab" 
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td 
        className="px-3 py-2 md:px-6 md:py-4 text-neutral-300 border-b border-neutral-700 text-xs sm:text-sm font-roboto-slab" 
        {...props}
      >
        {children}
      </td>
    ),
  };

  // Define sections with updated order and content
  const sections = [
    {
      id: SectionTypes.OVERVIEW,
      title: "Project Overview",
      icon: <FaFileAlt />,
      content: () => (
        <div className="bg-neutral-800 rounded-lg p-3 md:p-6 shadow-md border border-neutral-700">
          <p className="text-sm md:text-lg leading-relaxed text-gray-300 font-roboto-slab">
            {project.fullDescription}
          </p>
        </div>
      )
    },
    {
      id: SectionTypes.DOCUMENTATION,
      title: "Documentation",
      icon: <FaBook />,
      content: () => (
        <div className="bg-neutral-800 rounded-lg p-3 md:p-6 shadow-md border border-neutral-700">
          <article className="prose prose-invert prose-sm md:prose-lg max-w-none">
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
    {
      id: SectionTypes.METRICS,
      title: "Key Metrics",
      icon: <FaChartLine />,
      content: () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
          <div className="bg-neutral-800 rounded-lg p-3 md:p-6 shadow-md border border-neutral-700">
            <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-3 md:mb-4 font-roboto-slab">
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {project.metrics.map((metric, index) => (
                <div key={index} className="bg-neutral-700 rounded-lg p-2 md:p-4 border border-neutral-600 flex flex-col items-center justify-center">
                  <h4 className="text-xs md:text-base font-medium text-gray-300 mb-1 font-roboto-slab">
                    {metric.name}
                  </h4>
                  <p className="text-xl md:text-3xl font-bold text-gray-100 font-roboto-slab">
                    {metric.value}%
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-neutral-800 rounded-lg p-3 md:p-6 shadow-md border border-neutral-700">
            <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-3 md:mb-4 font-roboto-slab">
              Metrics Visualization
            </h3>
            <div className="h-48 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metricsData} margin={{ top: 5, right: 20, left: 0, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={40} stroke="#BBB" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 100]} stroke="#BBB" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#EEE', fontSize: '12px' }} />
                  <Bar dataKey="value" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )
    },
    {
      id: SectionTypes.PROJECT_STRUCTURE,
      title: "Project Structure",
      icon: <FaFolder />,
      content: () => (
        <div className="bg-neutral-800 rounded-lg p-3 md:p-6 shadow-md border border-neutral-700">
          <pre className="text-gray-200 font-mono text-xs md:text-sm whitespace-pre-line">
{`
cv001dd/
├── data/
│   ├── data/ 
│   └── raw/
│   └── processed/
├── logs/
│   ├── train/
│   └── validation/          
├── outputs/            
│   ├── checkpoints/          
│   └── best-model.hs           
├── src/  
│    ├── callbacks/            
│    │   ├── checkpoints.py          
│    │   └──tensorboard.py        
│    ├── data/            
│    │   └──tensorboard.py       
│    ├── models/            
│    │   └──model.py        
│    ├── train/            
│    │   └──train.py        
│    ├── evaluation/           
│    │   └──evaluation.py        
│    ├── utils/            
│    │   └──logger.py        
│    └── __init__.py            
├── notebooks/            
├── tests/  
│    ├── test_models.py          
│    ├── test_train.py 
│    └── test_data.py 
├── scripts/  
│    ├── inference.py          
│    └── deploy.py 
├── requirements.txt
├── README.md           
└── .gitignore `}
          </pre>
          <p className="mt-3 md:mt-4 text-gray-400 text-xs md:text-sm font-roboto-slab">
            End of project structure
          </p>
        </div>
      )
    },
    {
      id: SectionTypes.CODE,
      title: "Code Snippets",
      icon: <FaCode />,
      content: () => (
        <div className="space-y-4 md:space-y-8">
          {project.codeSnippets.map((snippet, index) => (
            <div key={index} className="bg-neutral-800 rounded-lg overflow-hidden shadow-md border border-neutral-700">
              <div className="bg-neutral-700 p-2 md:p-4 flex justify-between items-center">
                <h3 className="text-base md:text-xl font-bold text-white font-roboto-slab">
                  {snippet.title}
                </h3>
                <span className="px-2 py-0.5 text-xs bg-neutral-600 text-white rounded-full font-roboto-slab">
                  {snippet.language}
                </span>
              </div>
              <div className="p-2 md:p-4 overflow-x-auto" style={{ backgroundColor: '#1e293b' }}>
                <pre className="text-gray-200 font-mono text-xs md:text-sm">{snippet.code}</pre>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: SectionTypes.DATA_LINKS,
      title: "Data Sources & Papers",
      icon: <FaLink />,
      content: () => (
        <div className="bg-neutral-800 rounded-lg p-3 md:p-6 shadow-md border border-neutral-700">
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base font-roboto-slab">
            <li>
              <a href="https://example.com/dataset" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Plant Disease Dataset
              </a> - Public dataset used for training.
            </li>
            <li>
              <a href="https://example.com/research-paper" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Relevant Research Paper
              </a> - Paper on CNN architectures for plant disease detection.
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
        <div className="bg-neutral-800 rounded-lg p-3 md:p-6 shadow-md border border-neutral-700">
          <p className="text-gray-300 text-sm md:text-base font-roboto-slab">
            Additional information, experimental results, or supplementary materials can be added here.
          </p>
        </div>
      )
    },
    {
      id: SectionTypes.CHALLENGES,
      title: "Challenges & Future Plans",
      icon: <FaExclamationTriangle />,
      content: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
          <div className="bg-neutral-800 rounded-lg p-3 md:p-6 shadow-md border border-neutral-700">
            <h2 className="text-lg md:text-2xl font-bold text-gray-100 mb-3 flex items-center gap-2 font-roboto-slab">
              <FaExclamationTriangle /> Challenges
            </h2>
            <ul className="space-y-2 text-sm md:text-base font-roboto-slab">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <span className="text-gray-500 mr-2">•</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-neutral-800 rounded-lg p-3 md:p-6 shadow-md border border-neutral-700">
            <h2 className="text-lg md:text-2xl font-bold text-gray-100 mb-3 flex items-center gap-2 font-roboto-slab">
              <FaLightbulb /> Future Plans
            </h2>
            <ul className="space-y-2 text-sm md:text-base font-roboto-slab">
              {project.futurePlans.map((plan, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <span className="text-gray-500 mr-2">•</span>
                  {plan}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-200">
      {/* Global Font Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Roboto Slab', serif;
        }
        
        .font-roboto-slab {
          font-family: 'Roboto Slab', serif;
        }
      `}</style>
      
      {/* Hero Section without Back to Projects button */}
      <header className="relative h-[30vh] sm:h-[40vh] md:h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={project.image || "/api/placeholder/800/400"} 
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/70 to-neutral-900"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-8">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white z-10 mb-2 md:mb-4 font-roboto-slab">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-3 md:mt-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => document.getElementById(section.id).scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-neutral-800/80 text-gray-300 rounded-full text-xs sm:text-sm font-medium hover:bg-neutral-700/80 transition-colors font-roboto-slab"
              >
                <span className="text-[10px] sm:text-xs">{section.icon}</span>
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-6 md:py-12">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="mb-8 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100 mb-3 md:mb-6 flex items-center gap-2 font-roboto-slab">
              {section.icon} {section.title}
            </h2>
            {section.content()}
          </section>
        ))}
      </main>

      <footer className="bg-neutral-800 border-t border-neutral-700 py-4 md:py-8">
        <div className="max-w-5xl mx-auto px-3 md:px-4 text-center">
          <p className="text-gray-400 text-sm md:text-base font-roboto-slab">
            © 2025 Muhumuza Deus. All rights reserved.
          </p>
          <div className="mt-2">
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors text-xs sm:text-sm font-roboto-slab"
            >
              <FaGithub className="text-lg" />
              <span>View Project on GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetailPage;
