"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

const serviceCategories = [
  "AI & Automation",
  "Data Science", 
  "Business & Financial",
  "Data Visualization",
  "Other"
];

const projects = {
  "AI & Automation": [
    {
      id: 1,
      title: "Smart Workflow Automator",
      description: "Automated document processing and task management system",
      hashtag: "#WorkflowAI",
      techStack: ["Python", "OpenAI", "FastAPI", "PostgreSQL"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Chatbot Assistant",
      description: "Intelligent customer support bot with natural language processing",
      hashtag: "#CustomerAI",
      techStack: ["React", "Node.js", "TensorFlow", "MongoDB"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Process Optimizer",
      description: "AI-powered business process analysis and optimization tool",
      hashtag: "#ProcessAI",
      techStack: ["Python", "Pandas", "Scikit-learn", "Docker"],
      image: "/api/placeholder/300/200"
    }
  ],
  "Data Science": [
    {
      id: 4,
      title: "Predictive Happiness Model",
      description: "ML models predicting happiness using WHI + EFI data",
      hashtag: "#HappinessPrediction",
      techStack: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      title: "Market Trend Analyzer",
      description: "Real-time market analysis with predictive forecasting",
      hashtag: "#MarketAI",
      techStack: ["Python", "TensorFlow", "Plotly", "AWS"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      title: "Customer Churn Predictor",
      description: "Predict customer churn with 95% accuracy using behavioral data",
      hashtag: "#ChurnPrediction",
      techStack: ["Python", "XGBoost", "Pandas", "Flask"],
      image: "/api/placeholder/300/200"
    }
  ],
  "Business & Financial": [
    {
      id: 7,
      title: "Investment Portfolio Optimizer",
      description: "AI-driven portfolio optimization with risk analysis",
      hashtag: "#PortfolioAI",
      techStack: ["Python", "NumPy", "Matplotlib", "Django"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 8,
      title: "Financial Forecasting Tool",
      description: "Advanced financial modeling and forecasting platform",
      hashtag: "#FinanceAI",
      techStack: ["Python", "Prophet", "Pandas", "React"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 9,
      title: "Business Proposal Generator",
      description: "AI-powered proposal generation with market analysis",
      hashtag: "#ProposalAI",
      techStack: ["OpenAI", "Python", "FastAPI", "PostgreSQL"],
      image: "/api/placeholder/300/200"
    }
  ],
  "Data Visualization": [
    {
      id: 10,
      title: "Executive Dashboard",
      description: "Real-time business intelligence dashboard for executives",
      hashtag: "#ExecutiveDash",
      techStack: ["React", "D3.js", "Node.js", "MongoDB"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 11,
      title: "Sales Analytics Platform",
      description: "Interactive sales data visualization and analysis tool",
      hashtag: "#SalesViz",
      techStack: ["Vue.js", "Chart.js", "Python", "PostgreSQL"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 12,
      title: "KPI Monitoring System",
      description: "Real-time KPI tracking with automated alerts and reports",
      hashtag: "#KPITracker",
      techStack: ["React", "Recharts", "Express", "Redis"],
      image: "/api/placeholder/300/200"
    }
  ],
  "Other": [
    {
      id: 13,
      title: "Personal Portfolio",
      description: "A modern, responsive portfolio website built with Next.js",
      hashtag: "#WebDev",
      techStack: ["Next.js", "TailwindCSS", "Framer Motion", "TypeScript"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 14,
      title: "Tech Blog",
      description: "Personal blog sharing insights about AI, data science, and tech",
      hashtag: "#TechBlog",
      techStack: ["Next.js", "MDX", "TailwindCSS", "Vercel"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 15,
      title: "Open Source Contributions",
      description: "Various contributions to open source projects",
      hashtag: "#OpenSource",
      techStack: ["Python", "JavaScript", "React", "Node.js"],
      image: "/api/placeholder/300/200"
    }
  ]
};

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-lightbox dark:bg-darkbox border border-lightborder dark:border-darkborder rounded-xl overflow-hidden shadow-sm"
    >
      {/* Image placeholder */}
      <div className="h-48 bg-lighthover dark:bg-darkhover border-b border-lightborder dark:border-darkborder flex items-center justify-center">
        <div className="text-lighttexttertiary dark:text-darktexttertiary text-sm">Project Image</div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 text-lighttextprimary dark:text-darktextprimary">{project.title}</h3>
        <p className="text-sm text-lighttextsecondary dark:text-darktextsecondary mb-3">{project.description}</p>
        
        {/* Hashtag */}
        <div className="mb-4">
          <span className="text-sm font-medium text-lightaccent dark:text-darkaccent underline decoration-wavy">
            {project.hashtag}
          </span>
        </div>
        
        {/* Tech stack bubbles */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech: string, i: number) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full border border-lightborder dark:border-darkborder bg-lighthover dark:bg-darkhover"
              title={tech}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(serviceCategories[0]);
  const currentProjects = projects[selectedCategory as keyof typeof projects];

  return (
    <section id="projects" className="relative z-0 bg-lightsecondary dark:bg-darksecondary px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="border border-lightborder dark:border-darkborder -mt-px">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Header with dropdown */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-transparent text-2xl md:text-3xl font-bold focus:outline-none cursor-pointer hover:opacity-70 transition-opacity pr-8 min-w-[300px]"
              >
                {serviceCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <span className="text-2xl md:text-3xl font-bold">Stuffs I've Made</span>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* See More button */}
          <div className="text-center">
            <Link
              href={`/projects?category=${encodeURIComponent(selectedCategory)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 font-medium rounded-full transition-all duration-200 active:scale-95"
              style={{
                backgroundColor: theme === 'dark' ? '#FFFFFF' : '#000000',
                color: theme === 'dark' ? '#000000' : '#FFFFFF',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: theme === 'dark' ? '#FFFFFF' : '#000000'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FBD144';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.borderColor = '#FBD144';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme === 'dark' ? '#FFFFFF' : '#000000';
                e.currentTarget.style.color = theme === 'dark' ? '#000000' : '#FFFFFF';
                e.currentTarget.style.borderColor = theme === 'dark' ? '#FFFFFF' : '#000000';
              }}
            >
              Projects That Didn’t Fit In Here But Deserve Love Too
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
