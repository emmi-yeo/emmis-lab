import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
      id: 3,
      title: "Website Content Quality Checker",
      description: "Webscraping automation to assess product page quality and completeness.",
      longDescription: "A web automation that scans product listings using Webscraper.io, flags missing images, poor descriptions, or inconsistent SEO data, and summarizes results in Google Sheets for quality audits.",
      source: "client use",
      hashtag: "#ClientUse #WebAutomation #ContentQA",
      image: "/api/3.png",
      techStack: ["n8n", "Webscraper.io", "Google Sheets"],
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
    },
    {
      id: 5,
      title: "Extract Text from PDFs",
      description: "Automates text extraction from PDFs into structured Google Sheets format.",
      longDescription: "This automation reads PDFs, identifies relevant data fields (invoices, reports, contracts), and organizes them into a centralized Google Sheet for easy search and analysis.",
      source: "client use",
      hashtag: "#ClientUse #DocAutomation #PDFProcessing",
      image: "/api/5.png",
      techStack: ["n8n", "Google Sheets", "Gemini"],
      link: ""
    },
    {
      id: 6,
      title: "IG Carousel Post Generator",
      description: "AI-assisted design generation for Instagram carousel posts using Canva and Sheets.",
      longDescription: "This workflow creates batch-ready carousel post outlines, headlines, and captions using Gemini and exports formatted design prompts directly into Canva for visual production.",
      source: "client use",
      hashtag: "#ClientUse #SocialAI #DesignAutomation",
      image: "/api/6.png",
      techStack: ["Google Sheets", "Canva"],
      link: ""
    },
    {
      id: 7,
      title: "Product Description Generator",
      description: "Creates product descriptions dynamically using Google Apps Script and Gemini.",
      longDescription: "A lightweight generator embedded in Google Sheets that writes consistent, SEO-friendly product descriptions from raw product names or specifications, saving hours of manual copywriting.",
      source: "client use",
      hashtag: "#ClientUse #EcommerceAI #TextGeneration",
      image: "/api/7.png",
      techStack: ["Google Sheets", "Google Apps Script", "Gemini"],
      link: ""
    },
    {
      id: 8,
      title: "SOP Generator from Video Transcript",
      description: "Transforms video transcripts into structured SOP documents automatically.",
      longDescription: "Built using Gemini and Google Apps Script, this workflow analyzes transcribed meeting or tutorial videos, identifies action steps, and formats them into standardized SOP templates within Google Docs.",
      source: "client use",
      hashtag: "#ClientUse #SOPAI #KnowledgeAutomation",
      image: "",
      techStack: ["Google Docs", "Google Apps Script", "Gemini"],
      link: ""
    },
    {
      id: 9,
      title: "Product Sales Report Generator",
      description: "Automates sales report compilation and formatting from raw data in Sheets.",
      longDescription: "A smart Google Apps Script solution that consolidates daily sales data, applies business logic, and produces formatted summary reports and visual analytics in Google Sheets.",
      source: "client use",
      hashtag: "#ClientUse #DataAutomation #SalesAnalytics",
      image: "/api/9.png",
      techStack: ["Google Sheets", "Google Apps Script"],
      link: ""
    },
    {
      id: 10,
      title: "Google Ads Traffic Weekly Summary",
      description: "Automates weekly Ads traffic summaries for management reports.",
      longDescription: "Fetches campaign metrics, calculates key KPIs, and generates summarized performance dashboards automatically every week, saving manual reporting time.",
      source: "client use",
      hashtag: "#ClientUse #AdsAutomation #MarketingAnalytics",
      image: "",
      techStack: ["Google Sheets", "Google Apps Script"],
      link: ""
    },
    {
      id: 11,
      title: "Bulk Insert Video Links to Sheets",
      description: "Uploads Drive video links in bulk into Sheets for centralized tracking.",
      longDescription: "An Apps Script that scans a specified Google Drive folder, retrieves file names and links, and appends them neatly into Google Sheets for easy referencing and sharing.",
      source: "client use",
      hashtag: "#ClientUse #DriveAutomation #FileSync",
      image: "/api/11.png",
      techStack: ["Google Sheets", "Google Apps Script"],
      link: ""
    },
    {
      id: 12,
      title: "Google Docs Sync Automation",
      description: "Syncs content between two Google Docs documents automatically.",
      longDescription: "Built as a client demo, this Apps Script automation mirrors updates between master and child documents, maintaining content consistency across teams.",
      source: "client demo",
      hashtag: "#ClientDemo #DocSync #GoogleAppsScript",
      image: "/api/12.mov",
      techStack: ["Google Docs", "Google Apps Script"],
      link: ""
    },
    {
      id: 13,
      title: "CEO Performance Chatbot",
      description: "AI chatbot that evaluates CEO performance metrics and provides insights.",
      longDescription: "Powered by Google AI Studio, this chatbot analyzes key performance indicators, feedback reports, and strategic notes to provide conversational summaries and improvement recommendations.",
      source: "client use",
      hashtag: "#ClientUse #ChatbotAI #LeadershipInsights",
      image: "/api/13.png",
      techStack: ["Google AI Studio"],
      link: ""
    },
    {
      id: 14,
      title: "Crypto Statement Daily Automation",
      description: "Automates cleaning, merging, and archiving of crypto wallet statements.",
      longDescription: "A daily Python and Automator pipeline that processes multiple wallet statement formats, merges them into a unified CSV, cleans duplicates, and archives logs for audit readiness.",
      source: "client use",
      hashtag: "#ClientUse #CryptoAutomation #FinanceAI",
      image: "",
      techStack: ["Python", "Automator"],
      link: ""
    },
    {
      id: 15,
      title: "Office Form Email Alert",
      description: "Triggers email alerts upon new form submissions in office workflows.",
      longDescription: "A Power Automate flow that connects office forms to real-time email alerts, ensuring instant communication and response to employee or client submissions.",
      source: "client demo",
      hashtag: "#ClientDemo #WorkflowAutomation #PowerAutomate",
      image: "/api/15.mov",
      techStack: ["Power Automate"],
      link: ""
    },
    {
      id: 16,
      title: "Horse Breeding Recommendation Tool",
      description: "Excel-based tool that suggests ideal breeding matches for racehorses.",
      longDescription: "Developed using VBA logic, this client demo tool evaluates genetic, performance, and budget data to recommend optimal horse pairings for breeding efficiency.",
      source: "client demo",
      hashtag: "#ClientDemo #HorseAnalytics #ExcelAutomation",
      image: "/api/16.mov",
      techStack: ["Excel", "VBA"],
      link: ""
    },
    {
      id: 17,
      title: "VRA Ticksheet",
      description: "Excel ticksheet system for tracking operational records and KPIs.",
      longDescription: "A VBA-powered ticksheet that automates KPI tracking and daily record management for operational teams, ensuring visibility and compliance.",
      source: "client demo",
      hashtag: "#ClientDemo #ExcelAutomation #KPITracking",
      image: "/api/17.mov",
      techStack: ["Excel", "VBA"],
      link: ""
    },
    {
      id: 18,
      title: "Price Calculator",
      description: "Automated Excel tool for price estimation with adjustable parameters.",
      longDescription: "A VBA-enhanced calculator that factors in product cost, overhead, and profit margin to generate accurate and dynamic price quotes instantly.",
      source: "client demo",
      hashtag: "#ClientDemo #PricingTool #ExcelVBA",
      image: "/api/18.mov",
      techStack: ["Excel", "VBA"],
      link: ""
    }
  ],
    "Data Science & Predictive Insights": [
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
        id: 21,
        title: "Bias Detection in Job Descriptions (NLP + RAG)",
        description: "AI-powered NLP system that identifies and rewrites biased phrases in job postings.",
        longDescription: "Developed an intelligent job description analysis system leveraging Retrieval-Augmented Generation (RAG). The model detects subtle linguistic biases across gender, age, and inclusivity categories, and generates unbiased rewrite suggestions to promote fair hiring practices. Integrated with explainability modules for transparency.",
        source: "group project",
        hashtag: "#GroupProject #BiasDetection #NLP #RAG #FairAI",
        image: "/api/21.png",
        techStack: ["NLP", "RAG", "Python", "Gemini", "FAISS"],
        link: ""
      },
      {
        id: 22,
        title: "Breast Cancer Survival Prediction Web App",
        description: "Web app predicting breast cancer survival using multiple ML algorithms.",
        longDescription: "Designed and deployed a predictive web application using Logistic Regression, KNN, SVC, Naive Bayes, and Random Forest. The system analyzes patient health data to classify cancer survivability risk, offering a simple user interface for healthcare visualization and education.",
        source: "group project",
        hashtag: "#GroupProject #HealthAI #PredictiveModeling #MachineLearning",
        image: "/api/22.png",
        techStack: ["Logistic Regression", "KNN", "SVC", "Naive Bayes", "Random Forest", "Python", "Render"],
        link: "https://breast-cancer-survival-prediction.onrender.com/"
      },
      {
        id: 23,
        title: "AI-Powered Mental Health Risk Prediction Tool",
        description: "Predicts mental health risk levels among students using supervised learning models.",
        longDescription: "A machine learning web app developed using Logistic Regression, Random Forest, and SVM to assess mental health risks based on lifestyle and survey data. Built in Streamlit and deployed via Render, providing a simple yet impactful visualization for early risk detection and campus wellness interventions.",
        source: "group project",
        hashtag: "#GroupProject #MentalHealthAI #PredictiveModeling #Streamlit",
        image: ["/api/23-1.png", "/api/23-2.png"],
        techStack: ["Logistic Regression", "Random Forest", "SVM", "Streamlit", "Render"],
        link: "https://student-mental-prediction.onrender.com/"
      },
      {
        id: 24,
        title: "Early Detection of Mental Illness from Journal (Ideation)",
        description: "Concept design for emotion-based early detection system using journal analysis.",
        longDescription: "An ideation project visualized in Adobe Illustrator, exploring the potential of AI to analyze user journaling patterns and sentiment changes over time for early identification of mental health concerns. Focused on ethical design and empathetic AI interaction.",
        source: "personal project",
        hashtag: "#PersonalProject #MentalHealthAI #Ideation #HumanAI",
        image: "/api/24.png",
        techStack: ["Adobe Illustrator"],
        link: ""
      },
      {
        id: 25,
        title: "Customer Segmentation for Restaurant Business Growth",
        description: "Data-driven segmentation to optimize restaurant marketing and loyalty strategies.",
        longDescription: "Implemented K-Means, Hierarchical Clustering, and Gaussian Mixture Models in R to group customers by spending habits and demographics. Delivered insights to inform targeted promotions, loyalty program design, and revenue optimization strategies for the restaurant industry.",
        source: "group project",
        hashtag: "#GroupProject #CustomerAnalytics #Clustering #R",
        image: "/api/25.png",
        techStack: ["R", "K-Means", "Hierarchical Clustering", "GMM"],
        link: ""
      },
      {
        id: 26,
        title: "Spatiotemporal Analysis of US Traffic Accident Hotspots",
        description: "Big data study identifying accident hotspots across time and geography.",
        longDescription: "Conducted geospatial analysis using Python and MongoDB to identify high-risk zones and temporal patterns in US traffic accidents. Collaborated on data preprocessing, feature extraction, and hotspot visualization to support public safety analytics.",
        source: "group project",
        hashtag: "#GroupProject #GeospatialAnalysis #BigData #TrafficSafety",
        image: "/api/26.png",
        techStack: ["MongoDB", "Python", "Geospatial Analysis"],
        link: ""
      },
      {
        id: 27,
        title: "Cotton Crop & Weather Analytics Dashboard",
        description: "End-to-end data pipeline and dashboard for agriculture intelligence.",
        longDescription: "Built a Google Cloud-based analytics pipeline integrating Pub/Sub, BigQuery, and Looker Studio to visualize cotton crop yield patterns and weather anomalies. Delivered real-time insights on regional performance and environmental trends.",
        source: "group project",
        hashtag: "#GroupProject #AgriTech #BigQuery #LookerStudio",
        image: "/api/27.png",
        techStack: ["Google Pub/Sub", "BigQuery", "Looker Studio"],
        link: ""
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
      "Business & Financial Strategy": [
        {
          id: 29,
          title: "Discounted Cash Flow (DCF) Valuation",
          description: "Excel-based financial model estimating company intrinsic value via discounted cash flow analysis.",
          longDescription: "Developed a detailed DCF valuation model that projects free cash flows, calculates terminal value, and discounts future earnings using WACC. The model allows sensitivity testing on growth rate and risk factors to assess investment attractiveness and intrinsic value.",
          source: "client use",
          hashtag: "#ClientUse #DCF #Valuation #FinancialModeling",
          image: "/api/29.png",
          techStack: ["Excel"],
          link: ""
        },
        {
          id: 30,
          title: "Projected Cash Flow Statement",
          description: "Forecast model tracking operational, investing, and financing cash flows for liquidity management.",
          longDescription: "Built a robust cash flow forecasting model in Excel that tracks monthly inflows and outflows, highlights potential liquidity gaps, and visualizes net cash position trends. Enables proactive planning for capital requirements and operational sustainability.",
          source: "client use",
          hashtag: "#ClientUse #CashFlow #Forecasting #FinancialPlanning",
          image: "/api/30.png",
          techStack: ["Excel"],
          link: ""
        },
        {
          id: 31,
          title: "Projected Profit & Loss (P&L) Statement",
          description: "Profit and loss forecasting model for evaluating business growth and profitability.",
          longDescription: "Designed an Excel-based P&L projection model that automatically computes revenue, gross profit, and net income across multiple scenarios. Supports data-driven planning for budgeting, expense control, and profitability optimization.",
          source: "client use",
          hashtag: "#ClientUse #PnL #Forecasting #BusinessFinance",
          image: "/api/31.png",
          techStack: ["Excel"],
          link: ""
        },
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
        },
        {
          id: 35,
          title: "Ferry Express Business Proposal",
          description: "Strategic proposal for ferry route expansion and service modernization.",
          longDescription: "Crafted a PowerPoint proposal outlining route optimization, passenger growth forecast, vessel utilization, and profitability. Included competitive analysis and partnership opportunities for enhancing cross-border ferry operations.",
          source: "client use",
          hashtag: "#ClientUse #TransportBusiness #MaritimeStrategy #BusinessProposal",
          image: "/api/35.png",
          techStack: ["PowerPoint"],
          link: ""
        },
        {
          id: 36,
          title: "Recon Car Business Proposal",
          description: "Proposal for a reconditioned car trading business covering operations and financial outlook.",
          longDescription: "Developed a PowerPoint proposal illustrating the recon car market potential, supply chain management, dealership model, and profit margins. Included investment analysis, sales forecast, and compliance with local automotive import policies.",
          source: "client use",
          hashtag: "#ClientUse #AutomotiveBusiness #ReconCars #InvestmentProposal",
          image: "/api/36.png",
          techStack: ["PowerPoint"],
          link: ""
        },
        {
          id: 37,
          title: "MM2H Agency Business Proposal",
          description: "Business and marketing strategy proposal for Malaysia My Second Home (MM2H) agency operations.",
          longDescription: "Created a PowerPoint proposal outlining service offerings, operational workflows, partnership opportunities, and pricing strategies for an MM2H agency. Included market research, projected revenue streams, and compliance framework with Malaysia’s immigration policies.",
          source: "client use",
          hashtag: "#ClientUse #MM2H #BusinessStrategy #Consulting",
          image: "/api/37.png",
          techStack: ["PowerPoint"],
          link: ""
        },
        {
          id: 38,
          title: "Visa Agency Proposal (Chinese Market)",
          description: "Proposal targeting Chinese clients for visa and relocation services.",
          longDescription: "Prepared a PowerPoint proposal tailored for the Chinese market, highlighting agency services, pricing structure, customer journey, and partnership network. Included marketing roadmap and strategic insights into Chinese outbound mobility trends.",
          source: "client use",
          hashtag: "#ClientUse #VisaServices #ChinaMarket #AgencyProposal",
          image: "/api/38.png",
          techStack: ["PowerPoint"],
          link: ""
        },
        {
          id: 39,
          title: "Visa Agency Proposal (Pakistanese Market)",
          description: "Business proposal for visa and recruitment services for Pakistani market.",
          longDescription: "Designed a PowerPoint proposal showcasing business models, client acquisition strategies, and regulatory compliance frameworks for serving Pakistani clients. Focused on cross-border coordination and recruitment-to-visa processing efficiency.",
          source: "client use",
          hashtag: "#ClientUse #VisaServices #PakistanMarket #RecruitmentStrategy",
          image: "/api/39.png",
          techStack: ["PowerPoint"],
          link: ""
        },
        {
          id: 40,
          title: "Visa Agency Proposal (Nepalese Market)",
          description: "Proposal for establishing visa and migration services for Nepalese clients.",
          longDescription: "Developed a PowerPoint proposal that presents market entry plans, operational frameworks, and partnership opportunities with Nepalese recruitment agents. Emphasized ethical recruitment, compliance, and sustainable growth in the visa facilitation industry.",
          source: "client use",
          hashtag: "#ClientUse #VisaServices #NepalMarket #MigrationAgency",
          image: "/api/40.png",
          techStack: ["PowerPoint"],
          link: ""
        }
      ],    
        "Dashboards & Data Visualization": [
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

type Project = {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  source?: string;
  hashtag: string;
  image: string | string[];
  techStack: string[];
  link?: string;
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMediaIndex, setModalMediaIndex] = useState(0);
  const scrollPositionRef = useRef(0);
  
  // Handle multiple images for project 19 and 23
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
        <p className="text-sm text-lighttextsecondary dark:text-darktextsecondary mb-3 leading-relaxed">{project.longDescription}</p>
        
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
  const router = useRouter();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(serviceCategories[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const currentProjects = projects[selectedCategory as keyof typeof projects];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll to show/hide jump to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Jump to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Projects | Emmi Yeo</title>
        <meta name="description" content="Explore my portfolio of AI, Data Science, Business Strategy, and Data Visualization projects" />
      </Head>
      
      <div className="min-h-screen bg-lightsecondary dark:bg-darksecondary">
        {/* Header */}
        <header className="border-b border-lightborder dark:border-darkborder bg-lightsecondary dark:bg-darksecondary">
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

        {/* Jump to Top Button */}
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-[#FBD144] text-black rounded-full shadow-lg flex items-center justify-center text-2xl font-bold hover:bg-[#FFE071] transition-all duration-200 active:scale-95 z-50"
            aria-label="Jump to top"
          >
            ↑
          </button>
        )}
      </div>
    </>
  );
}
