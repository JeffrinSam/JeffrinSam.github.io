import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Publications } from "./components/Publications";
import { Talks } from "./components/Talks";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./hooks/useTheme";
import { ParticleField } from "./components/ParticleField";

function App() {
  return (
    <ThemeProvider>
      <ParticleField />
      <div className="relative z-10 min-h-svh">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Publications />
          <Talks />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
