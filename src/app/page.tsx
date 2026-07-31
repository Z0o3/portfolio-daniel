import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { FilterProvider } from "@/components/FilterProvider";
import ProjectExplorer from "@/components/ProjectExplorer";
import SectorSection from "@/components/SectorSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import About from "@/components/About";
import Skills from "@/components/Skills";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <FilterProvider>
          <Hero />
          <ProjectExplorer />
          <SectorSection />
        </FilterProvider>
        <ProcessTimeline />
        <About />
        <Skills />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
