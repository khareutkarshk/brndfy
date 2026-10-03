import Hero from "./components/Hero";
import About from "./components/About";
import Numbers from "./components/Numbers";
import Work from "./components/Work";
import Creators from "./components/Creators";
import Services from "./components/Services";
import Clients from "./components/Clients";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Preloader from "./components/fx/Preloader";

/**
 * The home page reads as one story: promise, belief, proof, work,
 * the people, the method, the brands, their words, questions, the ask.
 */
export default function Home() {
  return (
    <main className="relative bg-ink text-paper">
      <Preloader />
      <Hero />
      <About />
      <Numbers />
      <Work />
      <Creators />
      <Services />
      <Clients />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
