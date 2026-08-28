import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Certifications } from "@/components/sections/Certifications";
import { Process } from "@/components/sections/Process";
import { Calculator } from "@/components/sections/Calculator";
import { Story } from "@/components/sections/Story";
import { Team } from "@/components/sections/Team";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Certifications />
      <Process />
      <Calculator />
      <Story />
      <Team />
      <Reviews />
      <Faq />
      <Contact />
    </>
  );
}
