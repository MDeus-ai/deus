import React, { useEffect } from 'react';
import { FaGithub, FaArrowLeft, FaChartLine, FaCode, FaImage, FaFileAlt, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - in a real app, you'd fetch this based on project ID
const projectsData = {
  "plantvision-cv001dd": {
    id: 1,
    title: "PlantVision (cv001dd)",
    description: "A Vision model based on the Convolutional Neural Network Architecture(CNN) for detecting and classifying plant diseases based on plant leaves",
    fullDescription: "PlantVision is an innovative deep learning solution that leverages computer vision to help farmers and agricultural specialists identify plant diseases quickly and accurately. Built on a Convolutional Neural Network architecture, this model analyzes images of plant leaves to detect and classify diseases, providing early warning and treatment recommendations to prevent crop loss.",
    image: "/assets/images/project/plantvision.jpg",
    github: "https://github.com/MDeus-ai/PlantVision-cv001dd",
    tags: ["Tensorflow", "Pytorch", "Python", "Flutter", "Cuda"],
    metrics: [
      { name: "Model Accuracy", value: 94.7 },
      { name: "Precision", value: 92.3 },
      { name: "Recall", value: 91.8 },
      { name: "F1 Score", value: 92.0 }
    ],
    process: [
      {
        title: "Data Collection & Preprocessing",
        description: "Collected over 50,000 images of plant leaves across 38 different plant diseases. Images were preprocessed, normalized, and augmented to improve model performance.",
        image: "/assets/images/project/plantvision_data.jpg"
      },
      {
        title: "Model Architecture",
        description: "Implemented a custom CNN with 5 convolutional layers, batch normalization, and dropout for regularization. Transfer learning was applied using pre-trained ResNet50 weights.",
        image: "/assets/images/project/plantvision_model.jpg"
      },
      {
        title: "Training & Validation",
        description: "Model was trained on 80% of the dataset with 10% for validation and 10% for testing. Used early stopping to prevent overfitting.",
        image: "/assets/images/project/plantvision_training.jpg"
      },
      {
        title: "Mobile Deployment",
        description: "Converted and optimized the model for mobile deployment using TensorFlow Lite. Implemented a Flutter-based mobile app for field diagnostics.",
        image: "/assets/images/project/plantvision_app.jpg"
      }
    ],
    codeSnippets: [
      {
        title: "Model Definition",
        language: "python",
        code: `def create_model(input_shape=(224, 224, 3), num_classes=38):
    """
    Create a CNN model for plant disease classification
    """
    base_model = tf.keras.applications.ResNet50(
        include_top=False,
        weights='imagenet',
        input_shape=input_shape
    )
    
    # Freeze the base model
    base_model.trainable = False
    
    model = tf.keras.Sequential([
        base_model,
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dense(1024, activation='relu'),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(512, activation='relu'),
        tf.keras.layers.Dropout(0.3),
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])
    
    return model`
      },
      {
        title: "Data Augmentation",
        language: "python",
        code: `def create_data_generators():
    """
    Create data generators with augmentation
    """
    train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )
    
    valid_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
        rescale=1./255
    )
    
    return train_datagen, valid_datagen`
      }
    ],
    challenges: [
      "Dealing with imbalanced classes in the dataset",
      "Optimizing model size for mobile deployment without sacrificing accuracy",
      "Handling varying lighting conditions and image quality from field photos"
    ],
    futurePlans: [
      "Expand the model to cover more plant species and diseases",
      "Implement real-time detection capabilities",
      "Integrate with agricultural IoT systems for automated monitoring"
    ]
  }
};

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = projectsData[projectId];
  
  useEffect(() => {
    // Set page title when component mounts
    document.title = `${project?.title || 'Project'} | Muhumuza Deus`;
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Restore original title when component unmounts
    return () => {
      document.title = 'Muhumuza Deus';
    };
  }, [project]);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <Link to="/projects" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
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

  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Hero Section */}
      <header className="relative h-[40vh] md:h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={project.image || "/api/placeholder/800/400"} 
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Link 
            to="/projects" 
            className="absolute top-6 left-6 md:top-12 md:left-12 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <FaArrowLeft /> Back to Projects
          </Link>
          
          <h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white z-10 mb-4"
            style={{ fontFamily: 'Roboto Slab, serif' }}
          >
            {project.title}
          </h1>
          
          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 md:px-6 md:py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            style={{ fontFamily: 'Roboto Slab, serif' }}
          >
            <FaGithub className="text-xl" />
            <span>View on GitHub</span>
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Project Overview */}
        <section id="overview" className="mb-10 md:mb-16">
          <h2 
            className="text-2xl md:text-3xl font-bold text-gray-100 mb-4 md:mb-6 flex items-center gap-3"
            style={{ fontFamily: 'Roboto Slab, serif' }}
          >
            <FaFileAlt /> Project Overview
          </h2>
          <div className="bg-gray-900 rounded-lg p-4 md:p-6 shadow-md border border-gray-800">
            <p 
              className="text-base md:text-lg leading-relaxed text-gray-300"
              style={{ fontFamily: 'Roboto Slab, serif' }}
            >
              {project.fullDescription}
            </p>
          </div>
        </section>
        
        {/* Key Metrics */}
        <section id="metrics" className="mb-10 md:mb-16">
          <h2 
            className="text-2xl md:text-3xl font-bold text-gray-100 mb-4 md:mb-6 flex items-center gap-3"
            style={{ fontFamily: 'Roboto Slab, serif' }}
          >
            <FaChartLine /> Key Metrics
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gray-900 rounded-lg p-4 md:p-6 shadow-md border border-gray-800">
              <h3 
                className="text-xl font-semibold text-gray-200 mb-4"
                style={{ fontFamily: 'Roboto Slab, serif' }}
              >
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {project.metrics.map((metric, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700 flex flex-col items-center justify-center"
                  >
                    <h4 
                      className="text-sm md:text-base font-medium text-gray-300 mb-1"
                      style={{ fontFamily: 'Roboto Slab, serif' }}
                    >
                      {metric.name}
                    </h4>
                    <p 
                      className="text-2xl md:text-3xl font-bold text-gray-100"
                      style={{ fontFamily: 'Roboto Slab, serif' }}
                    >
                      {metric.value}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 md:p-6 shadow-md border border-gray-800">
              <h3 
                className="text-xl font-semibold text-gray-200 mb-4"
                style={{ fontFamily: 'Roboto Slab, serif' }}
              >
                Metrics Visualization
              </h3>
              <div className="h-64 md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={metricsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} stroke="#BBB" />
                    <YAxis domain={[0, 100]} stroke="#BBB" />
                    <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#EEE' }} />
                    <Bar dataKey="value" fill="#4B5563" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
        
        {/* Development Process - Modified to plain text instead of cards */}
        <section id="process" className="mb-10 md:mb-16">
          <h2 
            className="text-2xl md:text-3xl font-bold text-gray-100 mb-4 md:mb-6 flex items-center gap-3"
            style={{ fontFamily: 'Roboto Slab, serif' }}
          >
            <FaImage /> Development Process
          </h2>

          <div className="bg-gray-900 rounded-lg p-4 md:p-6 shadow-md border border-gray-800">
            <div className="space-y-6 md:space-y-8">
              {project.process.map((step, index) => (
                <div key={index} className="border-b border-gray-700 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="w-full md:w-1/3 h-40 md:h-auto rounded-lg overflow-hidden bg-gray-800">
                      <img 
                        src={step.image || `/api/placeholder/400/300?text=Step ${index + 1}`} 
                        alt={step.title}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `/api/placeholder/400/300?text=Step ${index + 1}`;
                        }}
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 
                        className="text-xl md:text-2xl font-bold text-gray-100 mb-2 md:mb-3"
                        style={{ fontFamily: 'Roboto Slab, serif' }}
                      >
                        {`${index + 1}. ${step.title}`}
                      </h3>
                      <p 
                        className="text-gray-300 mb-4"
                        style={{ fontFamily: 'Roboto Slab, serif' }}
                      >
                        {step.description}
                      </p>
                      
                      {/* You can add additional content here, like documentation */}
                      <div className="mt-4 space-y-4">
                        {/* Example of where documentation could go */}
                        {/* 
                        <div>
                          <h4 className="text-lg font-semibold text-gray-200 mb-2">Documentation</h4>
                          <p className="text-gray-300">Your documentation content here...</p>
                        </div>
                        */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Code Snippets */}
        <section id="code" className="mb-10 md:mb-16">
          <h2 
            className="text-2xl md:text-3xl font-bold text-gray-100 mb-4 md:mb-6 flex items-center gap-3"
            style={{ fontFamily: 'Roboto Slab, serif' }}
          >
            <FaCode /> Code Snippets
          </h2>
          <div className="space-y-6 md:space-y-8">
            {project.codeSnippets.map((snippet, index) => (
              <div 
                key={index} 
                className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-800"
              >
                <div className="bg-gray-800 p-3 md:p-4 flex justify-between items-center">
                  <h3 
                    className="text-lg md:text-xl font-bold text-white"
                    style={{ fontFamily: 'Roboto Slab, serif' }}
                  >
                    {snippet.title}
                  </h3>
                  <span 
                    className="px-2 py-1 text-xs md:text-sm bg-gray-700 text-white rounded-full"
                    style={{ fontFamily: 'Roboto Slab, serif' }}
                  >
                    {snippet.language}
                  </span>
                </div>
                <div className="p-3 md:p-4 overflow-x-auto bg-gray-950">
                  <pre className="text-gray-300 font-mono text-xs md:text-sm">{snippet.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Challenges and Future Plans */}
        <section id="challenges" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-16">
          <div className="bg-gray-900 rounded-lg p-4 md:p-6 shadow-md border border-gray-800">
            <h2 
              className="text-xl md:text-2xl font-bold text-gray-100 mb-3 md:mb-4 flex items-center gap-3"
              style={{ fontFamily: 'Roboto Slab, serif' }}
            >
              <FaExclamationTriangle /> Challenges
            </h2>
            <ul className="space-y-2 md:space-y-3">
              {project.challenges.map((challenge, index) => (
                <li 
                  key={index}
                  className="flex items-start text-gray-300"
                  style={{ fontFamily: 'Roboto Slab, serif' }}
                >
                  <span className="text-gray-500 mr-2">•</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4 md:p-6 shadow-md border border-gray-800">
            <h2 
              className="text-xl md:text-2xl font-bold text-gray-100 mb-3 md:mb-4 flex items-center gap-3"
              style={{ fontFamily: 'Roboto Slab, serif' }}
            >
              <FaLightbulb /> Future Plans
            </h2>
            <ul className="space-y-2 md:space-y-3">
              {project.futurePlans.map((plan, index) => (
                <li 
                  key={index}
                  className="flex items-start text-gray-300"
                  style={{ fontFamily: 'Roboto Slab, serif' }}
                >
                  <span className="text-gray-500 mr-2">•</span>
                  {plan}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6 md:py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p 
            className="text-gray-400"
            style={{ fontFamily: 'Roboto Slab, serif' }}
          >
            © 2025 Muhumuza Deus. All rights reserved.
          </p>
          <div className="mt-2">
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors"
              style={{ fontFamily: 'Roboto Slab, serif' }}
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