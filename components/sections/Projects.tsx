import { ProjectCard } from "@/components/ui/ProjectCard";
import { getProjects } from "@/lib/getProjects";

export async function Projects() {
  const projects = await getProjects();

  return (
    <section id="work" className="w-full px-3 py-12">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
