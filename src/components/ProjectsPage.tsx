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
    <div className="bg-pallete4a w-full min-h-full sm:p-4 text-white sm:mt-12">
      <div className="flex flex-wrap gap-4 items-center sm:px-[10%]">
        {content.map((project, index) => {
          return (
            <div
              key={`${project.id} ${index}`}
              className="w-4/5 mx-auto sm:max-w-md flex flex-nowrap flex-col justify-center items-center sm:bg-transparent bg-[rgba(255,255,255,0.02)] my-4 pb-8 rounded-lg"
            >
              <div className="relative mb-4 mx-auto sm:max-w-sm outline-double outline-1 outline-pallete4c rounded-lg overflow-hidden">
                <a href={project.data.link ? project.data.link : undefined}>
                  <img
                    src={`${basePath}/projects/thumbs/${index + 1}.png`}
                    className="w-full aspect-auto object-contain m-0 p-0 motion-safe:hover:animate-zinzout"
                  ></img>
                </a>
              </div>
              {project.data.link && project.data.github && (
                <ProjectLinks
                  link={project.data.link}
                  githubLink={project.data.github}
                />
              )}
              <div className="my-4 text-2xl font-bold text-pallete4c sm:self-start sm:ml-8 px-4">
                {project.data.title}
              </div>
              <div className="mb-4 text-md text-center sm:text-end sm:px-8 px-4">
                {project.data.description}
              </div>
              <ProjectTechs techs={project.data.techs} basePath={basePath} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
