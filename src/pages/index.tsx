import Head from "next/head";
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
  return (
    <>
      <Head>
        <title>Emmi Yeo | Portfolio</title>
        <meta name="description" content="Business Consultant | AI Engineer (In Training)" />
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
      </main>
    </>
  );
}
