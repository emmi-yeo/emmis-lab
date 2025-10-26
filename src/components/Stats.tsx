import { motion } from "framer-motion";

const stats = [
  { label: "Projects Completed", value: "10+" },
  { label: "Happy Clients", value: "10+" },
  { label: "Years of Experience", value: "3+" },
];

export default function Stats() {
  return (
    <section id="stats" className="relative z-0 bg-lightsecondary dark:bg-darksecondary px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="border border-lightborder dark:border-darkborder -mt-px">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">A Few Numbers I’m Proud Of</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="border border-lightborder dark:border-darkborder p-6 rounded-xl"
              >
                <div className="text-4xl font-bold mb-2">{s.value}</div>
                <div className="text-md">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
