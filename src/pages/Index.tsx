import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import SoftSkills from "@/components/sections/SoftSkills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Particles from "@/components/effects/Particles";
import CustomCursor from "@/components/effects/CustomCursor";
const Index = () => {

  return (
    <>
      <Helmet>
        <title>Francisco Douglas | Desenvolvedor Front-End & Full Stack</title>
        <meta 
          name="description" 
          content="Portfólio de Francisco Douglas de Sousa Beserra - Desenvolvedor Front-End, Full Stack, Líder Educacional. Especialista em React, TypeScript e criação de experiências digitais." 
        />
        <meta name="keywords" content="desenvolvedor front-end, full stack, react, typescript, portfolio, educação, gestão escolar" />
        <meta property="og:title" content="Francisco Douglas | Desenvolvedor Front-End & Full Stack" />
        <meta property="og:description" content="Transformando ideias em experiências digitais. Desenvolvedor apaixonado por tecnologia, educação e impacto social." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://franciscodouglas.dev" />
      </Helmet>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Particles Background */}
      <Particles count={40} />

      {/* Grain Overlay */}
      <div className="grain" />

      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <SoftSkills />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default Index;
