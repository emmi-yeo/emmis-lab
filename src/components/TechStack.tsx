"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import { useTheme } from "next-themes";

const categories = [
  {
    name: "🧠 Programming & Development",
    layout: "col1-top",
    height: "h-[400px]", // slightly taller
    tools: [
      { name: "Python", logo: "/logos/python.png", level: 1 },
      { name: "R", logo: "/logos/r.png", level: 3 },
      { name: "JavaScript", logo: "/logos/javascript.png", level: 1 },
      { name: "Swift", logo: "/logos/swift.png", level: 2 },
      { name: "Google Apps Script", logo: "/logos/appsscript.png", level: 1 },
      { name: "VBA", logo: "/logos/vba.png", level: 1 },
      { name: "Flask", logo: "/logos/flask.png", level: 1 },
      { name: "Cursor", logo: "/logos/cursor.png", level: 2 },
      { name: "Claude", logo: "/logos/claude.png", level: 2 },
      { name: "GitHub", logo: "/logos/github.png", level: 2 },
    ],
  },
  {
    name: "⚙️ Backend, Cloud & Automation",
    layout: "col1-bottom",
    height: "h-[200px]", // smaller
    tools: [
      { name: "Render", logo: "/logos/render.png", level: 1 },
      { name: "Supabase", logo: "/logos/supabase.png", level: 1 },
      { name: "Google Cloud Platform (GCP)", logo: "/logos/gcp.png", level: 2 },
      { name: "n8n", logo: "/logos/n8n.png", level: 1 },
      { name: "Power Automate", logo: "/logos/powerautomate.png", level: 3 },
      { name: "Apify", logo: "/logos/apify.png", level: 2 },
    ],
  },
  {
    name: "🤖 AI, Machine Learning & Data Science",
    layout: "col2-full",
    height: "h-[650px]", // tallest
    tools: [
      { name: "pandas", logo: "/logos/pandas.svg", level: 1 },
      { name: "NumPy", logo: "/logos/numpy.png", level: 1 },
      { name: "scikit-learn", logo: "/logos/scikit.png", level: 1 },
      { name: "XGBoost", logo: "/logos/xgboost.png", level: 1 },
      { name: "LightGBM", logo: "/logos/lightgbm.png", level: 1 },
      { name: "TensorFlow", logo: "/logos/tensorflow.png", level: 2 },
      { name: "PyTorch", logo: "/logos/pytorch.png", level: 2 },
      { name: "SHAP", logo: "/logos/shap.png", level: 1 },
      { name: "LIME", logo: "/logos/lime.svg", level: 1 },
      { name: "OpenAI", logo: "/logos/openai.png", level: 1 },
      { name: "Gemini", logo: "/logos/gemini.png", level: 1 },
      { name: "LangChain", logo: "/logos/langchain.png", level: 3 },
      { name: "LangGraph", logo: "/logos/langgraph.png", level: 3 },
      { name: "Hugging Face Transformers", logo: "/logos/huggingface.svg", level: 3 },
      { name: "Roboflow", logo: "/logos/roboflow.png", level: 3 },
//      { name: "Kaggle", logo: "/logos/kaggle.png", level: 1 },
//      { name: "Google Colab", logo: "/logos/colab.png", level: 1 },
    ],
  },
  {
    name: "📊 Analytics & Visualization",
    layout: "col3-top",
    height: "h-[200px]", // smaller
    tools: [
      { name: "Matplotlib", logo: "/logos/matplotlib.png", level: 1 },
      { name: "Seaborn", logo: "/logos/seaborn.svg", level: 1 },
      { name: "Plotly", logo: "/logos/plotly.png", level: 1 },
      { name: "Looker Studio", logo: "/logos/lookerstudio.png", level: 1 },
      { name: "Tableau", logo: "/logos/tableau.png", level: 2 },
      { name: "Power BI", logo: "/logos/powerbi.png", level: 2 },
    ],
  },
  {
    name: "🎨 Design, Media & Content Creation",
    layout: "col3-bottom",
    height: "h-[400px]", // moderately tall
    tools: [
      { name: "Canva", logo: "/logos/canva.png", level: 1 },
      { name: "Adobe Illustrator", logo: "/logos/illustrator.png", level: 1 },
      { name: "Figma", logo: "/logos/figma.png", level: 3 },
      { name: "Midjourney", logo: "/logos/midjourney.png", level: 2 },
      { name: "Veo 3", logo: "/logos/veo3.png", level: 2 },
      { name: "ElevenLabs", logo: "/logos/elevenlabs.svg", level: 2 },
      { name: "HeyGen", logo: "/logos/heygen.png", level: 2 },
      { name: "Higgsfield", logo: "/logos/higgsfield.png", level: 2 },
      { name: "Creatomate", logo: "/logos/creatomate.png", level: 2 },
      { name: "CapCut", logo: "/logos/capcut.png", level: 1 },
      { name: "Fliki", logo: "/logos/fliki.png", level: 1 },
    ],
  },
];

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export default function TechStack() {
  const { theme } = useTheme();
  const randomOffsets = useMemo(() => {
    const offsets: Record<string, { dx: number; dy: number; duration: number }> = {};
    categories.forEach((cat) =>
      cat.tools.forEach((tool) => {
        offsets[tool.name] = {
          dx: rand(5, 15),
          dy: rand(8, 20),
          duration: rand(3, 6),
        };
      })
    );
    return offsets;
  }, []);

  const sizeMap = { 1: 70, 2: 55, 3: 40 };

  return (
    <section
      id="my toolbox"
      className="relative z-0 bg-lightsecondary dark:bg-darksecondary px-3 sm:px-4 md:px-6 lg:px-8"
    >
    <div className="border border-lightborder dark:border-darkborder -mt-px">
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-14 md:mb-16">What's In My Toolbox</h2>

        {/* Asymmetric layout grid */}
        <div className="grid grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="flex flex-col gap-8">
            {categories.filter(c => c.layout.startsWith("col1")).map((cat, i) => (
              <CategoryBox key={i} cat={cat} />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col justify-center">
            {categories.filter(c => c.layout === "col2-full").map((cat, i) => (
              <CategoryBox key={i} cat={cat} />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8">
            {categories.filter(c => c.layout.startsWith("col3")).map((cat, i) => (
              <CategoryBox key={i} cat={cat} />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-10 text-sm text-lighttextsecondary dark:text-darktextsecondary text-center max-w-5xl mx-auto leading-relaxed">
          <p>
            <strong>Bubble size</strong> = tool time!
            <span className="font-semibold"> Big </span> = daily drama,
            <span className="font-semibold"> medium</span> = weekend buddy,
            <span className="font-semibold"> small</span> = once in a blue moon.
          </p>
        </div>
      </div>
      </div>
    </section>
  );

  function CategoryBox({ cat }: { cat: (typeof categories)[0] }) {
    return (
      <div className="relative flex flex-col items-center">
        <div 
          className="relative z-20 mb-[-10px] px-4 py-1 rounded-full text-sm font-semibold"
          style={{
            backgroundColor: theme === 'dark' ? '#FFFFFF' : '#000000',
            color: theme === 'dark' ? '#000000' : '#FFFFFF'
          }}
        >
          {cat.name}
        </div>
        <div className={`relative z-10 w-full ${cat.height} border border-lightborder dark:border-darkborder rounded-xl overflow-hidden bg-lightbox/20 dark:bg-darkbox/20 backdrop-blur-sm`}>
          <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-6 px-6 pt-10">
            {cat.tools.map((tool, i) => {
              const anim = randomOffsets[tool.name];
              const size = sizeMap[tool.level as keyof typeof sizeMap];
              return (
                <motion.div
                  key={i}
                  className="relative group flex items-center justify-center rounded-full border shadow-md hover:scale-110 transition-transform cursor-pointer"
                  style={{ 
                    width: `${size}px`, 
                    height: `${size}px`,
                    backgroundColor: theme === 'dark' ? '#FFFFFF' : 'rgba(255, 255, 255, 1)',
                    borderColor: theme === 'dark' ? '#FFFFFF' : '#575757',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  animate={{ x: [0, anim.dx, 0], y: [0, -anim.dy, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: anim.duration,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    width={size / 2}
                    height={size / 2}
                    unoptimized
                    className="object-contain"
                  />
                  <div className="absolute bottom-full mb-2 hidden group-hover:block text-xs font-medium bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded whitespace-nowrap shadow">
                    {tool.name}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
