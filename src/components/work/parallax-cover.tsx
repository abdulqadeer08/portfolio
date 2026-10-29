"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { CoverVariant, Project } from "@/data/portfolio";
import { ProjectCover } from "@/components/ui/project-cover";
import { cn } from "@/lib/utils";

/** A project cover that drifts slightly slower than the page. */
export function ParallaxCover({
  project,
  variant,
  className,
  priority,
}: {
  project: Project;
  variant?: CoverVariant;
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden rounded-[2rem] border border-line", className)}>
      <motion.div className="absolute inset-[-8%_0]" style={{ y }}>
        <ProjectCover
          project={project}
          variant={variant}
          priority={priority}
          className="size-full"
          sizes="100vw"
        />
      </motion.div>
    </div>
  );
}
