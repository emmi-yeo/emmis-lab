import { motion } from "framer-motion";
import { useTheme } from "next-themes";

type Testimonial = {
  text: string;
  author: string;
  col: 1 | 2 | 3 ;   // which column on large screens
  order: number;    // order inside that column (1 = top)
};

const testimonials: Testimonial[] = [
  {
    text:
      "Emmi, at a very young age, has consistently demonstrated intellectual brilliance, exceptional professionalism, and a rare ability to adapt, especially impressive for someone in their first full-time role. She's been a rock-solid executioner, surpassing all expectations with heart and intellect. With her character, knowledge, network, and resourcefulness, I have no doubt she’ll continue to shine.",
    author: "Ex boss",
    col: 1,
    order: 1,
  },
  {
    text:
      "Emmi has a sharp eye for processes that can be improved and consistently provides practical, effective solutions.",
    author: "Ex boss",
    col: 2,
    order: 1,
  },
  { text: "Ability to adapt and learn.",
      author: "Colleagues & Friends", col: 3, order: 2 },
  { text: "Strong working ability.",
      author: "Clients", col: 2, order: 2 },
  //{
  //  text: "Very nice presentation and beautifully designed PowerPoint slides.",
  //  author: "Universities’ lecturers",
  //  col: 2,
  //  order: 3,
  //},
  { text: "I really admire her attention to detail.",
      author: "Colleagues & Friends", col: 2, order: 3 },
  { text: "Reliable, focused, and efficient.",
      author: "Colleagues & Friends", col: 1, order: 2 },
  {
    text:
      "Emmi has been an incredible addition to our team, sharp, reliable, and full of initiative. Her growth in n8n automation, problem-solving, and analytics has been impressive, and her ability to turn complex workflows into clear, efficient systems really stood out. We truly appreciate her dedication, energy, and positive attitude. Emmi is a rising talent in automation and data analytics, and we’d be delighted to work with her again in future projects.",
    author: "Ex boss",
    col: 3,
    order: 1,
  },
];

/** Speech bubble card with triangular tail (adapts to light/dark) */
function Bubble({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  return (
    <div
      className="relative rounded-[24px] border border-lightborder dark:border-darkborder bg-lightbox dark:bg-darkbox p-5 md:p-6"
      style={{
        position: 'relative'
      }}
    >
      {/* Tail border (behind) */}
      <div 
        style={{
          content: '',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '-12px',
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderTopWidth: '12px',
          borderLeftWidth: '12px',
          borderRightWidth: '12px',
          borderBottomWidth: '0',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: theme === 'dark' ? '#FFFFFF' : '#000000',
          borderBottomColor: 'transparent'
        }}
      />
      {/* Tail fill (front) */}
      <div 
        style={{
          content: '',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '-10px',
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderTopWidth: '10px',
          borderLeftWidth: '10px',
          borderRightWidth: '10px',
          borderBottomWidth: '0',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: theme === 'dark' ? '#000000' : '#FFFFFF',
          borderBottomColor: 'transparent'
        }}
      />
      {children}
    </div>
  );
}

export default function Testimonials() {
  // group by column and sort by order
  const col1 = testimonials.filter(t => t.col === 1).sort((a, b) => a.order - b.order);
  const col2 = testimonials.filter(t => t.col === 2).sort((a, b) => a.order - b.order);
  const col3 = testimonials.filter(t => t.col === 3).sort((a, b) => a.order - b.order);

  const columns = [col1, col2, col3];

  return (
    <section
      id="what people say"
      className="relative z-0 bg-lightsecondary dark:bg-darksecondary px-3 sm:px-4 md:px-6 lg:px-8"
    >
      <div className="border border-lightborder dark:border-darkborder -mt-px">
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-14 md:mb-16">
            They Said It, Not Me
          </h2>

          {/* Grid of columns: 1 on mobile, 2 on md, 3 on lg */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-6 md:gap-7">
                {col.map((t, i) => (
                  <motion.div
                    key={`${t.author}-${t.order}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
                  >
                    <Bubble>
                      <p className="leading-relaxed">{t.text}</p>
                      <div className="mt-3 font-semibold">– {t.author}</div>
                    </Bubble>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
