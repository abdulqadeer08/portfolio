import { sections } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceList } from "./service-list";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-10 border-y border-line bg-bg-elevated py-28 sm:py-40">
      <div className="container-luxe">
        <SectionHeading
          index="02"
          label="Services"
          title={sections.services.title}
          accent={sections.services.accent}
          description={sections.services.description}
        />
        <ServiceList />
      </div>
    </section>
  );
}
