"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import WorkProcess from "@/components/WorkProcess";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);

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

  // Jump to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Emmi Yeo | Portfolio</title>
        <meta name="description" content="That AI Girl Who Gets Stuff Done" />
      </Head>
      <Navbar />
      {/* Let body control text color; main only handles bg (optional) */}
      <main className="bg-lightsecondary dark:bg-darksecondary scroll-smooth transition-colors duration-300 relative z-0 pt-20">
        <Hero />
        <About />
        <Services />
       {/* <Stats /> */}
        <Projects />
        <TechStack />
        <Testimonials />
        <WorkProcess />
        <Contact />

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
      </main>
    </>
  );
}
