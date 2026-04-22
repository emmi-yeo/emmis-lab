"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Milestone = {
  year: string;
  title: string;
  subtitle: string;
  detail: string;
};

const milestones: Milestone[] = [
  {
    year: "2017",
    title: "OPPO Electronics",
    subtitle: "Human Resources Assistant",
    detail: `
➤ Managed files for 500+ humans (and maybe one office plant 🌿).
➤ Helped find great talent — yes, I was your friendly interviewer who smiled a lot but still asked the hard questions.
➤ Solved mini workplace dramas before they hit soap-opera levels.
➤ Did all the admin things: filed, mailed, payroll’d like a champ.
    `,
  },
  {
    year: "2018 – 2021",
    title: "UCSI University",
    subtitle: "Bachelor’s Degree in Actuarial Science & Finance",
    detail: `
➤ Graduated with First Class Honours 💁🏻‍♀️
➤ Grade: 3.79 (because 3.80 would’ve been too mainstream)
➤ Scholar by day, board gamer by night:
  🧮 Actuarial Science Student Association
  💹 Bursa Young Investor Club
  🎲 Board Game Club
➤ Honoured to be a UCSI University Trust Scholar — shoutout to scholarships and sleepless nights!
    `,
  },
  {
    year: "2022",
    title: "CFA",
    subtitle: "Took CFA Level 1. Got humbled. Retried life instead.",
    detail: `
➤ Still recovering. Emotionally. 📉
    `,
  },
  {
    year: "2022 – 2025",
    title: "TSL Victory Sdn Bhd",
    subtitle: "Finance & Business Consultant",
    detail: `
➤ Worked with 50+ clients. Gave advice that actually worked.
➤ Wrote proposals that even the printer respected.
➤ Did financial analysis and ratio breakdowns like a boss — ROE, ROI, R.I.P sleep.
➤ Fluent in CAPM, RIM, ROIM, DCF, and other acronyms that scare normal people.

**Also: The CEO's Personal Assistant (and somehow still had time to breathe (barely)).**

➤ Wore 5 hats at once and somehow didn’t drop any.
➤ Acted as the human firewall between the CEO and absolute chaos.
➤ Was the go-to person for “can you help with this real quick?” (Yes. I did.)
➤ Managed gov projects, grant apps, land deals, and employment passes like a boss.
➤ Played translator between private companies and government agencies without accidentally starting a diplomatic crisis.
➤ Juggled meetings, reports, financials, and 10 browser tabs at once.
➤ Drafted proposals, invoices, letters, memos, reports, slides… basically Microsoft Office and I are in a very committed relationship.
    `,
  },
  {
    year: "2025",
    title: "University of Malaya",
    subtitle: "Master’s in Data Science (with Distinction!)",
    detail: `
➤ GPA: 3.97 — because 4.00 is for people who don’t touch grass 🌱
➤ I switched lanes from finance spreadsheets to Python scripts — and honestly, \`print("best decision ever")\`.
➤ Attended night classes, weekend classes, and sacrificed many social gatherings to finish assignments that started with “scrape this dataset…”
➤ Learned Python, SQL, Machine Learning, and how to cry in .csv.
➤ Built stuff like prediction models, dashboards, and inner peace (still in beta).
➤ Discovered debugging is just adult-level hide-and-seek.
➤ Most-used command during this degree: \`pip install whatever-gets-this-to-run\`.
➤ Currently Googling “How to become an AI Engineer without losing sleep.”
    `,
  },
  {
    year: "2025",
    title: "Zillio Venture",
    subtitle: "Business Intelligence & Efficiency Lead",
    detail: `
➤ Automated the boring stuff so humans could do fun stuff.
➤ Built internal automations using n8n and Google Apps Script so people could stop crying over spreadsheets.
➤ Experimented with AI tools to boost business smarts (and fun).
➤ Recommended efficiency tricks that saved time and looked cool.
➤ Basically: made chaos look organized while sipping coffee ☕
➤ Helped teams move faster, scale smoother, and think smarter.
    `,
  },
  {
    year: "2026",
    title: "V-Work Sdn Bhd",
    subtitle: "AI Engineer",
    detail: `
➤ Built AI-powered vendor search systems that speak multiple languages, tolerate typos, and still find what you’re looking for
➤ Deployed AI services on Azure — scalable, auditable, and mostly behaving in production
➤ Debugged, tested, and negotiated with Claude AI until it finally did what I meant
    `,
  },
];

export default function About() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState<number | null>(null);
  const scrollPositionRef = useRef(0);
  const LINE_OFFSET = 0;

  useEffect(() => {
    const navbar = document.querySelector('nav')?.parentElement?.parentElement?.parentElement;
    
    if (selected !== null) {
      // Store current scroll position
      scrollPositionRef.current = window.scrollY;
      
      // Lock the body at current scroll position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Force black background on html and body
      document.documentElement.style.backgroundColor = '#000000';
      document.body.style.backgroundColor = '#000000';
      
      if (navbar) navbar.style.display = 'none';
    } else {
      // Unlock the body
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Reset html and body background
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      
      if (navbar) navbar.style.display = 'block';
      
      // Restore scroll position after a short delay to ensure styles are cleared
      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 0);
    }
    
    return () => {
      // Cleanup function
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      if (navbar) navbar.style.display = 'block';
    };
  }, [selected]);

  return (
    <section
      id="about me"
      className="relative z-0 px-3 sm:px-4 md:px-6 lg:px-8"
      style={{
        backgroundColor: theme === 'dark' ? '#0C151D' : '#FFFFFF'
      }}
    >
      <div className="border border-lightborder dark:border-darkborder -mt-px">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-14 md:mb-16" 
              style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }}>
            How I Got Here
          </h2>

          <div className="relative">
            <div className="grid grid-cols-7 gap-4 lg:gap-6 relative">
              {milestones.map((m, i) => (
                <div key={`top-${i}`} className="col-span-1 flex items-end justify-center">
                  {i % 2 === 0 ? (
                    <div className="text-center mb-2 md:mb-4 max-w-[200px]">
                      <p className="font-bold text-sm md:text-base mb-1" 
                         style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }}>{m.year}</p>
                      <p className="italic font-semibold text-sm md:text-base" 
                         style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }}>{m.title}</p>
                      <p className="text-xs md:text-sm leading-snug mt-1" 
                         style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }}>{m.subtitle}</p>
                    </div>
                  ) : (
                    <div className="opacity-0 mb-2 md:mb-4 max-w-[200px]">.</div>
                  )}
                </div>
              ))}

              <div className="col-span-7 relative">
                <div
                  className="absolute top-1/2 left-[calc(7.14%+0px)] right-[calc(7.14%+0px)] h-[2px] z-0"
                  style={{
                    backgroundColor: theme === 'dark' ? '#FFFFFF' : '#000000',
                    transform: `translateY(${LINE_OFFSET}px)`
                  }}
                />
                <div className="grid grid-cols-7 gap-4 lg:gap-6">
                  {milestones.map((m, i) => (
                    <div key={`dot-${i}`} className="relative flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        onClick={() => setSelected(i)}
                        className="timeline-dot z-10 w-5 h-5 rounded-full border-2 hover:scale-110 active:scale-95 transition-all duration-200"
                        style={{
                          backgroundColor: theme === 'dark' ? '#FFFFFF' : '#000000',
                          borderColor: theme === 'dark' ? '#FFFFFF' : '#000000'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#FBD144';
                          e.currentTarget.style.borderColor = '#FBD144';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#FFFFFF' : '#000000';
                          e.currentTarget.style.borderColor = theme === 'dark' ? '#FFFFFF' : '#000000';
                        }}
                        aria-label={`Open ${m.title}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {milestones.map((m, i) => (
                <div key={`bottom-${i}`} className="col-span-1 flex items-start justify-center">
                  {i % 2 !== 0 ? (
                    <div className="text-center mt-2 md:mt-4 max-w-[200px]">
                      <p className="font-bold text-sm md:text-base mb-1" 
                         style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }}>{m.year}</p>
                      <p className="italic font-semibold text-sm md:text-base" 
                         style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }}>{m.title}</p>
                      <p className="text-xs md:text-sm leading-snug mt-1" 
                         style={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }}>{m.subtitle}</p>
                    </div>
                  ) : (
                    <div className="opacity-0 mt-2 md:mt-4 max-w-[200px]">.</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-10 text-sm text-lighttextsecondary dark:text-darktextsecondary text-center max-w-5xl mx-auto leading-relaxed">
            <p>Click the dots — it&apos;s where the juicy stuff lives.</p>
          </div>

          {selected !== null && typeof window !== 'undefined' && createPortal(
            <div 
              className="fixed inset-0 w-screen h-screen flex items-center justify-center"
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
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white border border-lightborder rounded-xl px-6 md:px-8 py-5 md:py-6 shadow-2xl max-w-xl text-left relative overflow-y-auto max-h-[90vh] z-[999999999]"
                style={{
                  zIndex: 999999999,
                  position: 'relative'
                }}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-4 text-lg font-bold text-black hover:text-red-500"
                  aria-label="Close"
                >
                  ✕
                </button>

                <h3 className="text-lg font-semibold mb-1 text-black">
                {milestones[selected].year}
                </h3>
                <h3 className="text-lg font-semibold mb-1 text-black">
                {milestones[selected].title}
                </h3>
                <p className="text-sm mb-2 italic text-black">
                {milestones[selected].subtitle}
                </p>

                <div className="prose !text-black prose-headings:text-black prose-p:text-black prose-li:text-black prose-strong:text-black">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({children}) => <p className="text-black">{children}</p>,
                      li: ({children}) => <li className="text-black">{children}</li>,
                      strong: ({children}) => <strong className="text-black">{children}</strong>,
                      h1: ({children}) => <h1 className="text-black">{children}</h1>,
                      h2: ({children}) => <h2 className="text-black">{children}</h2>,
                      h3: ({children}) => <h3 className="text-black">{children}</h3>,
                      h4: ({children}) => <h4 className="text-black">{children}</h4>,
                      h5: ({children}) => <h5 className="text-black">{children}</h5>,
                      h6: ({children}) => <h6 className="text-black">{children}</h6>,
                    }}
                  >
                    {milestones[selected].detail.replace(/\n/g, "  \n")}
                  </ReactMarkdown>
                </div>
              </motion.div>
            </div>,
            document.body
          )}
        </div>
      </div>
    </section>
  );
}