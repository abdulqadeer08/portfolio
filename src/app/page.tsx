import { awards, testimonials } from "@/data/portfolio";
import { About } from "@/components/sections/about";
import { Awards } from "@/components/sections/awards";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Toolkit } from "@/components/sections/toolkit";
import { Work } from "@/components/sections/work";
import { pad } from "@/lib/utils";

export default function Home() {
  // Sections 01–06 are always shown; the optional ones are numbered after them.
  let next = 7;
  const testimonialsIndex = testimonials.length > 0 ? pad(next++) : undefined;
  const awardsIndex = awards.length > 0 ? pad(next++) : undefined;
  const contactIndex = pad(next);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Work />
      <Experience />
      <Toolkit />
      <Process />
      <Testimonials index={testimonialsIndex} />
      <Awards index={awardsIndex} />
      <Contact index={contactIndex} />
    </>
  );
}
