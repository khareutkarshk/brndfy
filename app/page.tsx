import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Clients from "./components/Clients";
import Collaborators from "./components/Collaborators";
import Testimonials from "./components/Testimonials";
import Numbers from "./components/Numbers";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <div className="bg-white p-3 rounded-2xl flex flex-col gap-3">
      <Hero />
      <About />
      <Numbers />
      <Work />
      <Services />
      <Clients />
      <Collaborators />
      <Testimonials />
      <FAQ />
    </div>
  );
}
