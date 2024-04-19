import type { CollectionEntry } from "astro:content";
import { ProjectLinks } from "../components/ProjectLinks";
import { ProjectTechs } from "../components/ProjectTechs";

export type TProjectsPage = {
  basePath: string;
  content: CollectionEntry<"projects">[];
};

export const ProjectsPage: React.FC<TProjectsPage> = ({
  basePath,
  content,
}) => {
  return (
    <div className="w-full min-h-full h-fit md:p-0 text-white pt-20 md:pt-20 bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0)]">
      <div className="flex flex-col gap-4 md:gap-0 items-center md:px-4">
        {content.map((project, index) => {
          return (
            <div
              key={`${project.id} ${index}`}
              className="w-4/5 mx-auto md:max-w-full md:min-w-full lg:w-4/5 lg:min-w-0 flex flex-nowrap flex-col md:flex-row gap-0 md:gap-4 justify-evenly items-center bg-[rgba(255,255,255,0.02)] my-4 pb-8 md:p-2 rounded-lg overflow-visible"
            >
              <div className="md:min-w-[30.33%] md:w-[33.33%] flex flex-col gap-4 md:flex-row md:flex-nowrap">
                <div className="ring-2 ring-pallete4c rounded-lg overflow-hidden">
                  <a href={project.data.link ? project.data.link : undefined}>
                    <img
                      src={`${basePath}/projects/thumbs/${index + 1}.png`}
                      className="w-full aspect-auto object-contain m-0 p-0 motion-safe:hover:animate-zinzout"
                    ></img>
                  </a>
                </div>
                <div className="self-center md:w-0 md:overflow-visible md:-translate-x-20">
                  {project.data.link && project.data.github && (
                    <ProjectLinks
                      link={project.data.link}
                      githubLink={project.data.github}
                    />
                  )}
                </div>
              </div>
              <div className="mb-4 px-4 flex flex-col gap-4 flex-1">
                <div className="my-4 text-2xl md:text-lg font-bold line-clamp-2 text-pallete4c md:self-start lg:self-center">
                  {project.data.title}
                </div>
                <div className="text-md text-center md:text-start lg:text-center lg:w-fit lg:px-8 self-center">
                  {project.data.description}
                </div>
                <div className="self-center">
                  <ProjectTechs
                    techs={project.data.techs}
                    basePath={basePath}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
