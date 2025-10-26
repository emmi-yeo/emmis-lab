import { motion } from "framer-motion";

const steps = [
  { title: "Discovery Chat", description: "We’ll chat about your goals, ideas, and pain points — no tech jargon, just real talk." },
  { title: "Proposal & Game Plan", description: "You’ll get a clear plan with timelines, pricing, and zero surprises." },
  { title: "Build Phase", description: "I’ll start creating, and you’ll get regular updates and previews." },
  { title: "Feedback & Polish", description: "You share honest feedback, I make it better — simple as that." },
  { title: "Launch Time", description: "We go live with a polished project that’s ready to impress." },
  { title: "Support & Growth", description: "Need tweaks or upgrades later? I’ve got your back." },
];

export default function WorkProcess() {
  return (
    <section id="process" className="relative z-0 bg-lightsecondary dark:bg-darksecondary px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="border border-lightborder dark:border-darkborder -mt-px">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Here's How We'll Work Together</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="p-6 rounded-xl border border-lightborder dark:border-darkborder bg-lightbox dark:bg-darkbox shadow-sm"
              >
                <div className="text-lg font-bold mb-2">Step {i + 1}: {step.title}</div>
                <p className="text-sm text-lighttextsecondary dark:text-darktextsecondary">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
