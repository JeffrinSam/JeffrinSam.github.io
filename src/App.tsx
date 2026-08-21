import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Publications } from "./components/Publications";
import { Talks } from "./components/Talks";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./hooks/useTheme";
import { RobotProvider } from "./context/RobotContext";
import { ParticleField } from "./components/ParticleField";
import { RobotBackground } from "./components/RobotBackground";

function App() {
  return (
    <ThemeProvider>
      <RobotProvider>
        <ParticleField />
        <RobotBackground />
        <div className="relative z-10 min-h-svh">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Publications />
            <Talks />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </RobotProvider>
    </ThemeProvider>
  );
}

export default App;
