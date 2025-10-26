import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

const serviceCategories = [
  "AI & Automation Solutions",
  "Data Science & Predictive Insights", 
  "Business & Financial Strategy",
  "Dashboards & Data Visualization",
  "Other"
];

const projects = {
  "AI & Automation Solutions": [
    {
      id: 1,
      title: "Smart Workflow Automator",
      description: "Automated document processing and task management system that reduces manual work by 80%. Features intelligent document classification, automated data extraction, and seamless integration with existing business tools.",
      hashtag: "#WorkflowAI",
      techStack: ["Python", "OpenAI", "FastAPI", "PostgreSQL", "Docker", "AWS"],
      image: "/api/placeholder/400/250",
      longDescription: "A comprehensive automation platform that transforms how businesses handle document workflows. The system uses advanced NLP to understand document context, automatically categorizes incoming documents, and routes them to appropriate team members. Built with microservices architecture for scalability and reliability."
    },
    {
      id: 2,
      title: "Chatbot Assistant",
      description: "Intelligent customer support bot with natural language processing capabilities. Handles 90% of customer inquiries automatically with human-like responses and seamless escalation.",
      hashtag: "#CustomerAI",
      techStack: ["React", "Node.js", "TensorFlow", "MongoDB", "Redis", "WebSocket"],
      image: "/api/placeholder/400/250",
      longDescription: "An advanced conversational AI that understands context, maintains conversation history, and provides accurate responses. The bot integrates with CRM systems and can handle complex multi-turn conversations while maintaining brand voice consistency."
    },
    {
      id: 3,
      title: "Process Optimizer",
      description: "AI-powered business process analysis and optimization tool that identifies bottlenecks and suggests improvements. Reduces process time by an average of 35%.",
      hashtag: "#ProcessAI",
      techStack: ["Python", "Pandas", "Scikit-learn", "Docker", "Kubernetes", "Grafana"],
      image: "/api/placeholder/400/250",
      longDescription: "A sophisticated process mining tool that analyzes business workflows using machine learning. It identifies inefficiencies, predicts bottlenecks, and provides actionable recommendations for process improvement."
    }
  ],
  "Data Science & Predictive Insights": [
    {
      id: 4,
      title: "Predictive Happiness Model",
      description: "ML models predicting happiness using WHI + EFI data with 87% accuracy. Helps organizations understand employee satisfaction drivers and predict retention.",
      hashtag: "#HappinessPrediction",
      techStack: ["Python", "Scikit-learn", "Pandas", "Streamlit", "Plotly", "Jupyter"],
      image: "/api/placeholder/400/250",
      longDescription: "A comprehensive happiness prediction system that combines multiple data sources to forecast employee satisfaction. The model uses ensemble learning techniques and provides interpretable insights for HR decision-making."
    },
    {
      id: 5,
      title: "Market Trend Analyzer",
      description: "Real-time market analysis with predictive forecasting using advanced time series models. Provides 95% accurate trend predictions for investment decisions.",
      hashtag: "#MarketAI",
      techStack: ["Python", "TensorFlow", "Plotly", "AWS", "Apache Kafka", "InfluxDB"],
      image: "/api/placeholder/400/250",
      longDescription: "A sophisticated market analysis platform that processes real-time financial data streams and provides predictive insights. Uses LSTM networks and attention mechanisms for accurate forecasting."
    },
    {
      id: 6,
      title: "Customer Churn Predictor",
      description: "Predict customer churn with 95% accuracy using behavioral data and advanced ML algorithms. Helps businesses retain customers and increase lifetime value.",
      hashtag: "#ChurnPrediction",
      techStack: ["Python", "XGBoost", "Pandas", "Flask", "Celery", "PostgreSQL"],
      image: "/api/placeholder/400/250",
      longDescription: "An end-to-end churn prediction system that analyzes customer behavior patterns and identifies at-risk customers. Provides actionable insights and automated retention campaigns."
    }
  ],
  "Business & Financial Strategy": [
    {
      id: 7,
      title: "Investment Portfolio Optimizer",
      description: "AI-driven portfolio optimization with risk analysis using modern portfolio theory and machine learning. Achieves 15% better risk-adjusted returns than traditional methods.",
      hashtag: "#PortfolioAI",
      techStack: ["Python", "NumPy", "Matplotlib", "Django", "Celery", "Redis"],
      image: "/api/placeholder/400/250",
      longDescription: "A comprehensive portfolio management platform that uses advanced optimization algorithms to construct optimal portfolios. Incorporates risk factors, market conditions, and investor preferences for personalized recommendations."
    },
    {
      id: 8,
      title: "Financial Forecasting Tool",
      description: "Advanced financial modeling and forecasting platform with scenario analysis capabilities. Provides accurate revenue and expense predictions for strategic planning.",
      hashtag: "#FinanceAI",
      techStack: ["Python", "Prophet", "Pandas", "React", "FastAPI", "PostgreSQL"],
      image: "/api/placeholder/400/250",
      longDescription: "A sophisticated financial forecasting system that combines time series analysis with external factors. Provides multiple scenario modeling and sensitivity analysis for robust financial planning."
    },
    {
      id: 9,
      title: "Business Proposal Generator",
      description: "AI-powered proposal generation with market analysis and competitive intelligence. Increases proposal win rates by 40% through data-driven insights.",
      hashtag: "#ProposalAI",
      techStack: ["OpenAI", "Python", "FastAPI", "PostgreSQL", "Elasticsearch", "Docker"],
      image: "/api/placeholder/400/250",
      longDescription: "An intelligent proposal generation system that analyzes RFP requirements, researches market data, and creates compelling proposals. Uses natural language generation to maintain consistency and quality."
    }
  ],
  "Dashboards & Data Visualization": [
    {
      id: 10,
      title: "Executive Dashboard",
      description: "Real-time business intelligence dashboard for executives with interactive visualizations and automated insights. Provides 360-degree view of business performance.",
      hashtag: "#ExecutiveDash",
      techStack: ["React", "D3.js", "Node.js", "MongoDB", "WebSocket", "Redis"],
      image: "/api/placeholder/400/250",
      longDescription: "A comprehensive executive dashboard that aggregates data from multiple sources and presents it in an intuitive, interactive format. Features real-time updates and mobile responsiveness."
    },
    {
      id: 11,
      title: "Sales Analytics Platform",
      description: "Interactive sales data visualization and analysis tool with predictive insights. Helps sales teams identify opportunities and optimize performance.",
      hashtag: "#SalesViz",
      techStack: ["Vue.js", "Chart.js", "Python", "PostgreSQL", "Apache Airflow", "Docker"],
      image: "/api/placeholder/400/250",
      longDescription: "A comprehensive sales analytics platform that provides deep insights into sales performance, customer behavior, and market trends. Features advanced filtering and drill-down capabilities."
    },
    {
      id: 12,
      title: "KPI Monitoring System",
      description: "Real-time KPI tracking with automated alerts and reports. Monitors 50+ KPIs across different departments with customizable thresholds and notifications.",
      hashtag: "#KPITracker",
      techStack: ["React", "Recharts", "Express", "Redis", "InfluxDB", "Grafana"],
      image: "/api/placeholder/400/250",
      longDescription: "A real-time KPI monitoring system that tracks key performance indicators across the organization. Features automated alerting, trend analysis, and customizable dashboards for different user roles."
    }
  ],
  "Other": [
    {
      id: 13,
      title: "Personal Portfolio",
      description: "A modern, responsive portfolio website built with Next.js and TailwindCSS. Features dark mode, smooth animations, and interactive components.",
      hashtag: "#WebDev",
      techStack: ["Next.js", "TailwindCSS", "Framer Motion", "TypeScript", "React", "Vercel"],
      image: "/api/placeholder/400/250",
      longDescription: "A fully responsive portfolio website showcasing my projects and skills. Built with modern web technologies and best practices. Features include dark mode support, smooth page transitions, interactive components, and optimized performance."
    },
    {
      id: 14,
      title: "Tech Blog",
      description: "Personal blog sharing insights about AI, data science, and tech. Features MDX for rich content, code syntax highlighting, and responsive design.",
      hashtag: "#TechBlog",
      techStack: ["Next.js", "MDX", "TailwindCSS", "Vercel", "Prism.js", "React"],
      image: "/api/placeholder/400/250",
      longDescription: "A technical blog platform built from scratch using Next.js and MDX. Features include code syntax highlighting, dark mode support, responsive images, and optimized performance. Content focuses on AI, data science, and web development tutorials and insights."
    },
    {
      id: 15,
      title: "Open Source Contributions",
      description: "Various contributions to open source projects including bug fixes, feature implementations, and documentation improvements.",
      hashtag: "#OpenSource",
      techStack: ["Python", "JavaScript", "React", "Node.js", "Git", "GitHub"],
      image: "/api/placeholder/400/250",
      longDescription: "Active contributions to various open source projects, focusing on improving documentation, fixing bugs, and implementing new features. Projects include popular libraries in the Python and JavaScript ecosystems, particularly in the areas of data science and web development."
    }
  ]
};

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-lightbox dark:bg-darkbox border border-lightborder dark:border-darkborder rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image placeholder */}
      <div className="h-48 bg-lighthover dark:bg-darkhover border-b border-lightborder dark:border-darkborder flex items-center justify-center">
        <div className="text-lighttexttertiary dark:text-darktexttertiary text-sm">Project Image</div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 text-lighttextprimary dark:text-darktextprimary">{project.title}</h3>
        <p className="text-sm text-lighttextsecondary dark:text-darktextsecondary mb-3 leading-relaxed">{project.description}</p>
        
        {/* Hashtag */}
        <div className="mb-4">
          <span className="text-sm font-medium text-lightaccent dark:text-darkaccent underline decoration-wavy">
            {project.hashtag}
          </span>
        </div>
        
        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech: string, i: number) => (
            <div
              key={i}
              className="px-3 py-1 rounded-full text-xs font-medium border border-lightborder dark:border-darkborder bg-lightbox/50 dark:bg-darkbox/50 text-lighttextsecondary dark:text-darktextsecondary"
              title={tech}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const router = useRouter();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(serviceCategories[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const currentProjects = projects[selectedCategory as keyof typeof projects];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle category from URL parameter
  useEffect(() => {
    if (router.isReady && router.query.category) {
      const category = decodeURIComponent(router.query.category as string);
      if (serviceCategories.includes(category)) {
        setSelectedCategory(category);
      }
      setIsLoading(false);
    } else if (router.isReady) {
      setIsLoading(false);
    }
  }, [router.isReady, router.query.category]);

  return (
    <>
      <Head>
        <title>Projects | Emmi Yeo</title>
        <meta name="description" content="Explore my portfolio of AI, Data Science, Business Strategy, and Data Visualization projects" />
      </Head>
      
      <div className="min-h-screen bg-lightsecondary dark:bg-darksecondary">
        {/* Header */}
        <header className="border-b border-lightborder dark:border-darkborder bg-lightsecondary dark:bg-darksecondary sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold hover:underline">
                ← Back to Portfolio
              </Link>
              <div className="text-sm text-lighttextsecondary dark:text-darktextsecondary">
                {currentProjects.length} projects in {selectedCategory}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12 pt-20">
          {/* Category Filter */}
          <div className="mb-12">
            <h1 className="text-2xl md:text-3xl font-bold mb-10 text-center text-lighttextprimary dark:text-darktextprimary">
              More Stuffs I've Made
            </h1>
            <div className="flex flex-wrap justify-center gap-3 px-4">
              {serviceCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-5 py-2.5 rounded-full border font-medium transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: selectedCategory === category
                    ? '#FBD144'
                    : 'transparent',
                  color: selectedCategory === category
                    ? '#000000'
                    : (mounted && theme === 'dark' ? '#FFFFFF' : '#000000'),
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: selectedCategory === category
                    ? '#FBD144'
                    : (mounted && theme === 'dark' ? '#FFFFFF' : '#000000')
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FBD144';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.borderColor = '#FBD144';
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory === category) {
                    e.currentTarget.style.backgroundColor = '#FBD144';
                    e.currentTarget.style.color = '#000000';
                    e.currentTarget.style.borderColor = '#FBD144';
                  } else {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = (mounted && theme === 'dark') ? '#FFFFFF' : '#000000';
                    e.currentTarget.style.borderColor = (mounted && theme === 'dark') ? '#FFFFFF' : '#000000';
                  }
                }}
              >
                {category}
              </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-lighttextsecondary dark:text-darktextsecondary">Loading projects...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && currentProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lighttextsecondary dark:text-darktextsecondary">No projects found in this category.</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
