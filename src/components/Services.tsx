"use client";
import { motion } from "framer-motion";

const services = [
  { title: "🤖 AI & Automation Solutions", description: "I build smart tools that do the boring stuff for you — automating workflows, decisions, and chaos (so you don't have to)." },
  { title: "🧠 Data Science & Predictive Insights", description: "From messy data to meaningful patterns, I turn numbers into foresight — no crystal ball required, just good models and better caffeine. ☕📊" },
  { title: "💼 Business & Financial Strategy", description: "Merging business logic with data magic, I craft proposals, forecasts, and financial models that make investors nod approvingly (and sometimes even smile). 💰" },
  { title: "📈 Dashboards & Data Visualization", description: "I design interactive dashboards that make your data look gorgeous — so even your boss will pretend to understand the numbers." },
];

function Card({ title, description, i }: { title: string; description: string; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: i * 0.08 }}
      className="w-full max-w-sm p-6 rounded-xl border border-lightborder dark:border-darkborder bg-lightbox dark:bg-darkbox text-center shadow-sm"
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-base text-lighttextsecondary dark:text-darktextsecondary">{description}</p>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="things I do"
      className="relative z-[1] bg-lightsecondary dark:bg-darksecondary px-3 sm:px-4 md:px-6 lg:px-8"
    >
      <div className="border border-lightborder dark:border-darkborder -mt-px">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            Things I Do So You Don't Have To
          </h2>

          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
            {services.map((s, i) => (
              <Card key={s.title} title={s.title} description={s.description} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
