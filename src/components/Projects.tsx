"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

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
      title: "AI Blogpost Generation",
      description: "Automated content generation for marketing blogs using Gemini and Google Docs via n8n workflow.",
      longDescription: "An end-to-end AI content automation pipeline that generates structured blog posts based on brand tone, trending topics, and SEO keywords. The system drafts directly into Google Docs, ready for review and publication.",
      source: "client use",
      hashtag: "#ClientUse #ContentAutomation #GeminiAI",
      image: "/api/1.png",
      techStack: ["n8n", "Google Docs", "Gemini"],
      link: ""
    },
    {
      id: 2,
      title: "Social Media Reels Trend Analysis",
      description: "Automated extraction and analysis of trending Reels to inform client content strategy.",
      longDescription: "A social intelligence automation that uses Apify to scrape Reels metadata, analyzes trends and engagement using Gemini, and reports insights directly in Google Sheets for actionable campaign planning.",
      source: "client use",
      hashtag: "#ClientUse #SocialAI #ReelTrends",
      image: "/api/2.png",
      techStack: ["n8n", "Apify", "Google Sheets", "Gemini"],
      link: ""
    },
    {
      id: 4,
      title: "SOP Reformatting Automation",
      description: "Transforms SOP videos or playbooks into a unified, structured format using AI.",
      longDescription: "An intelligent SOP processor that extracts steps, responsibilities, and tools from video transcripts or raw playbooks, reformats them into standardized templates in Google Sheets and Docs for consistent internal documentation.",
      source: "client use",
      hashtag: "#ClientUse #SOPAutomation #ProcessAI",
      image: "/api/4.png",
      techStack: ["n8n", "Google Sheets", "Gemini", "Google Docs"],
      link: ""
    }
  ],
  "Data Science": [
    {
      id: 19,
      title: "Predictive Analysis of Happiness using World Happiness & Economic Freedom Index",
      description: "Master's research project exploring global happiness prediction using socioeconomic indicators.",
      longDescription: "A comprehensive analysis combining the World Happiness Report and Economic Freedom Index datasets to identify key drivers of national happiness. Built machine learning models to predict happiness scores, interpret feature importance, and visualize country-level patterns using interactive dashboards. Explored correlations between economic freedom and life satisfaction across regions.",
      source: "personal (Master's research)",
      hashtag: "#PersonalProject #DataScience #PredictiveAnalytics #Python",
      image: ["/api/19-1.png", "/api/19-2.png", "/api/19-3.png", "/api/19-4.png"],
      techStack: ["Python", "Supabase", "Gemini"],
      link: "https://hera-uoek.onrender.com/"
    },
    {
      id: 20,
      title: "Fraud Call Prevention System",
      description: "Multi-algorithm fraud detection web app deployed for real-time call risk classification.",
      longDescription: "Led ideation and model development for a fraud detection system combining Logistic Regression, Naive Bayes, Random Forest, Gradient Boosting, AdaBoost, SVM, and BERT. The platform classifies incoming calls based on linguistic and metadata features to identify potential fraud attempts, supporting early prevention and awareness.",
      source: "group project",
      hashtag: "#GroupProject #FraudDetection #MachineLearning #CyberSecurity",
      image: "/api/20.png",
      techStack: ["Logistic Regression", "Naive Bayes", "Random Forest", "Gradient Boosting", "AdaBoost", "SVM", "BERT", "Python"],
      link: "https://fraud-detection-web-app.onrender.com/"
    },
    {
      id: 28,
      title: "Optimization of Swing Trading Strategy Using Technical Indicators",
      description: "Bachelor’s final year project applying ML models to optimize swing trading decisions.",
      longDescription: "Analyzed 2011–2020 market data from FBM KLCI and S&P 500’s top firms using 20 technical indicators across momentum, trend, volume, and volatility. Compared CART, CHAID, Genetic Algorithm (GA), and Genetic Programming (GP) models to predict buy/sell signals. Evaluated overfitting, robustness, and interpretability for strategy improvement.",
      source: "academic (Bachelor’s final year project)",
      hashtag: "#GroupProject #FinanceAI #TradingStrategy #MachineLearning",
      image: "",
      techStack: ["CART", "CHAID", "GA", "GP", "Python", "Excel"],
      link: ""
    }
  ],
  "Business & Financial": [
    {
      id: 32,
      title: "Pickleball Court Development Proposal",
      description: "Investment and feasibility proposal for developing a pickleball court complex.",
      longDescription: "Created a PowerPoint proposal outlining the financial viability and market potential of a pickleball court project, including construction costs, revenue streams, and ROI projections. The proposal emphasizes recreational market growth and investor returns.",
      source: "client use",
      hashtag: "#ClientUse #SportsBusiness #Pickleball #InvestmentProposal",
      image: "/api/32.png",
      techStack: ["PowerPoint"],
      link: ""
    },
    {
      id: 33,
      title: "Coconut Plantation Investment Proposal",
      description: "Agribusiness proposal for coconut plantation investment and development planning.",
      longDescription: "Developed a PowerPoint presentation detailing plantation setup, cost structure, yield forecasting, and profitability analysis. Focused on long-term sustainability, land optimization, and regional export potential for coconut-based products.",
      source: "client use",
      hashtag: "#ClientUse #Agribusiness #InvestmentProposal #Sustainability",
      image: "/api/33.png",
      techStack: ["PowerPoint"],
      link: ""
    },
    {
      id: 34,
      title: "Industrial Park Development Proposal",
      description: "Comprehensive proposal integrating infrastructure, investment, and government collaboration.",
      longDescription: "Prepared a PowerPoint and Word proposal for an eco-industrial park project, covering master planning, infrastructure layout, public-private partnership models, and land utilization strategies. Included project feasibility, investment options, and stakeholder engagement plans.",
      source: "client use",
      hashtag: "#ClientUse #IndustrialDevelopment #EcoPark #PublicPrivatePartnership",
      image: "/api/34.png",
      techStack: ["PowerPoint", "Word"],
      link: ""
    }
  ],
  "Data Visualization": [
    {
      id: 41,
      title: "Google Ads Dashboard",
      description: "Interactive Looker Studio dashboard visualizing Google Ads performance in real time.",
      longDescription: "Developed a client-facing Looker Studio dashboard that connects directly to Google Ads API, displaying campaign KPIs such as impressions, clicks, CPC, and ROI. Enables marketing teams to monitor ad performance, optimize budgets, and identify trends through dynamic filters and visual analytics.",
      source: "client use",
      hashtag: "#ClientUse #GoogleAds #DataVisualization #LookerStudio",
      image: "/api/41.png",
      techStack: ["Looker Studio"],
      link: ""
    },
    {
      id: 42,
      title: "Operations KPI Dashboard",
      description: "Company-wide dashboard tracking key performance indicators across departments.",
      longDescription: "Designed and implemented an interactive Looker Studio dashboard integrating multiple data sources, including finance, HR, and operations. The dashboard visualizes real-time KPIs and operational efficiency metrics, empowering management with instant insights for strategic decision-making.",
      source: "client use",
      hashtag: "#ClientUse #KPIDashboard #BusinessIntelligence #LookerStudio",
      image: "/api/42.png",
      techStack: ["Looker Studio"],
      link: ""
    },
    {
      id: 43,
      title: "Dropshipping Dashboard",
      description: "Excel-based dashboard showcasing sales, order fulfillment, and profit tracking for demo purposes.",
      longDescription: "Built an Excel dashboard simulating a real dropshipping business operation, including dynamic charts for revenue trends, fulfillment rates, and top-selling products. The dashboard uses automated formulas and conditional formatting for quick visualization and business insight demonstration.",
      source: "client demo",
      hashtag: "#ClientDemo #EcommerceAnalytics #ExcelDashboard #DataVisualization",
      image: "/api/43.png",
      techStack: ["Excel"],
      link: ""
    }
  ],
    "Other": [
      {
        id: 44,
        title: "Personal Portfolio",
        description: "A modern, responsive portfolio website built with Next.js and TailwindCSS. Features dark mode, smooth animations, and interactive components.",
        hashtag: "#PersonalProject #WebDev",
        techStack: ["Next.js", "TailwindCSS", "Framer Motion", "TypeScript", "React", "Vercel"],
        image: "/api/44.png",
        longDescription: "A fully responsive portfolio website showcasing my projects and skills. Built with modern web technologies and best practices. Features include dark mode support, smooth page transitions, interactive components, and optimized performance."
      }
    ]
};

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMediaIndex, setModalMediaIndex] = useState(0);
  const scrollPositionRef = useRef(0);
  
  // Handle multiple images for project 19
  const isMultipleImages = Array.isArray(project.image) && project.image.length > 1;
  const displayImage = Array.isArray(project.image) ? project.image[currentImageIndex] : project.image;
  const isVideo = displayImage && (displayImage.endsWith('.mov') || displayImage.endsWith('.mp4') || displayImage.endsWith('.webm'));
  
  // Auto-advance slideshow for multiple images
  useEffect(() => {
    if (isMultipleImages && !isVideo) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.image.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMultipleImages, project.image]);
  
  const handleMediaClick = () => {
    if (displayImage) {
      // Store current scroll position
      scrollPositionRef.current = window.scrollY;
      
      // Lock the body at current scroll position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Hide navbar
      const navbar = document.querySelector('nav')?.parentElement?.parentElement?.parentElement;
      if (navbar) navbar.style.display = 'none';
      
      setModalMediaIndex(currentImageIndex);
      setIsModalOpen(true);
    }
  };
  
  const closeModal = () => {
    // Unlock the body
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    
    // Show navbar
    const navbar = document.querySelector('nav')?.parentElement?.parentElement?.parentElement;
    if (navbar) navbar.style.display = 'block';
    
    setIsModalOpen(false);
    
    // Restore scroll position after a short delay
    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      const navbar = document.querySelector('nav')?.parentElement?.parentElement?.parentElement;
      if (navbar) navbar.style.display = 'block';
    };
  }, []);
  
  const navigateSlides = (direction: 'prev' | 'next') => {
    if (Array.isArray(project.image) && project.image.length > 1) {
      if (direction === 'prev') {
        setModalMediaIndex((prev) => (prev - 1 + project.image.length) % project.image.length);
      } else {
        setModalMediaIndex((prev) => (prev + 1) % project.image.length);
      }
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-lightbox dark:bg-darkbox border border-lightborder dark:border-darkborder rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image/Video container */}
      <div 
        className="h-48 bg-lighthover dark:bg-darkhover border-b border-lightborder dark:border-darkborder flex items-center justify-center relative overflow-hidden cursor-pointer"
        onClick={handleMediaClick}
      >
        {displayImage ? (
          <>
            {isVideo ? (
              <video
                src={displayImage}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                style={{ cursor: 'pointer' }}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={displayImage}
                alt={project.title}
                width={400}
                height={250}
                className="h-full w-full object-cover"
                unoptimized
              />
            )}
            {/* Slideshow indicator for multiple images */}
            {isMultipleImages && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {(project.image as string[]).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full ${
                      idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-lighttexttertiary dark:text-darktexttertiary text-sm text-center px-4">
            No visuals, but trust me — even I was impressed.
          </div>
        )}
      </div>
      
      {/* Modal/Lightbox */}
      {isModalOpen && displayImage && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 bg-black flex items-center justify-center p-4"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000000',
            zIndex: 99999999
          }}
          onClick={closeModal}
        >
          <div 
            className="max-w-7xl max-h-[90vh] relative"
            style={{
              zIndex: 999999999
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-yellow-400 transition-colors"
            >
              ✕ Close
            </button>
            
            {/* Navigation arrows for multiple images */}
            {isMultipleImages && project.image.length > 1 && (
              <>
                <button
                  onClick={() => navigateSlides('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-yellow-400 transition-colors"
                >
                  ‹ Prev
                </button>
                <button
                  onClick={() => navigateSlides('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-yellow-400 transition-colors"
                >
                  Next ›
                </button>
              </>
            )}
            
            {/* Media content */}
            {Array.isArray(project.image) ? (
              (() => {
                const modalMedia = project.image[modalMediaIndex];
                const isModalVideo = modalMedia.endsWith('.mov') || modalMedia.endsWith('.mp4') || modalMedia.endsWith('.webm');
                return isModalVideo ? (
                  <video
                    src={modalMedia}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                    autoPlay
                    muted
                    loop
                    controls
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={modalMedia}
                    alt={project.title}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                    unoptimized
                  />
                );
              })()
            ) : isVideo ? (
              <video
                src={displayImage}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                autoPlay
                muted
                loop
                controls
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={displayImage}
                alt={project.title}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                unoptimized
              />
            )}
          </div>
        </div>,
        document.body
      )}
      
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 text-lighttextprimary dark:text-darktextprimary">{project.title}</h3>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-bold text-[#FBD144] hover:text-[#FFE071] transition-colors mb-2 underline active:scale-95"
          >
            Try It Out →
          </a>
        )}
        <p className="text-sm text-lighttextsecondary dark:text-darktextsecondary mb-3 leading-relaxed">{project.description}</p>
        
        {/* Hashtag */}
        <div className="mb-4">
          <span className="text-sm font-medium text-lightaccent dark:text-darkaccent">
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
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(serviceCategories[0]);
  const currentProjects = projects[selectedCategory as keyof typeof projects];

  return (
    <section id="stuffs I've made" className="relative z-0 bg-lightsecondary dark:bg-darksecondary px-3 sm:px-4 md:px-6 lg:px-8">
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
