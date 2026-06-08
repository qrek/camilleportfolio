import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { getProjects } from "@/lib/getProjects";

export async function Projects() {
  const projects = await getProjects();

  return (
    <section id="work" className="w-full px-3 py-12">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={(i % 2) * 90}
            className={project.featured ? "md:col-span-2" : undefined}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
