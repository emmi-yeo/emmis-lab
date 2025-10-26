"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function Hero() {
  const { theme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  return (
    <section
      id="hero"
      className="relative z-0 bg-lightsecondary dark:bg-darksecondary px-3 sm:px-4 md:px-6 lg:px-8"
    >
      <div className="border border-lightborder dark:border-darkborder -mt-px">
        <div className="max-w-5xl mx-auto px-6 pt-12 md:pt-16 lg:pt-20 pb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-8 sm:gap-12">
            {/* LEFT — Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex-shrink-0 relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Image
                src={isHovering ? "/painting-mona.gif" : "/mona-lisa-laptop.jpg"}
                alt="Portrait of Emmi Yeo"
                width={140}
                height={180}
                unoptimized
                className="rounded-md border border-lightborder dark:border-darkborder object-cover"
              />
            </motion.div>

            {/* RIGHT — Text + Button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-center sm:text-left space-y-2"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
                Hi, I'm Emmi Yeo
              </h1>
              <p className="text-xl font-semibold text-lighttextsecondary dark:text-darktextsecondary italic">
                AI Enthusiast
              </p>

              {/* Location */}
              <div className="flex justify-center sm:justify-start items-center gap-2">
                <FaMapMarkerAlt className="text-lighttextprimary dark:text-darktextprimary" />
                <span className="text-xl md:text-xl text-lighttextsecondary dark:text-darktextsecondary">Kuala Lumpur, Malaysia</span>
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className="mt-6 inline-flex items-center justify-center px-4 py-2 rounded-full transition-all duration-200 active:scale-95"
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
                Deploy Me to Your Team
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
