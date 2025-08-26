import Clients from "../components/Clients";
import Slider from "../components/Slider";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Services from "../components/home/Services";
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Features />
    </div>
  );
}
