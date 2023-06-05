import { getCollection } from "astro:content";
import { ProjectLinks } from "../components/ProjectLinks";
import { ProjectTechs } from "../components/ProjectTechs";
const projects = await getCollection("projects");

export const ProjectsPage: React.FC<{ basePath: string; lang: string }> = ({
  basePath,
  lang,
}) => {
  return (
    <div className="bg-pallete4a w-full min-h-full sm:p-4 text-white sm:mt-12">
      <div className="flex flex-wrap gap-8 justify-items-center items-center">
        {projects.map((project, index) => {
          return (
            <div
              key={project.id}
              className="w-4/5 mx-auto sm:max-w-md flex flex-nowrap flex-col justify-center items-center"
            >
              <div className="relative my-4 mx-auto sm:max-w-sm outline-double outline-1 outline-pallete4c rounded-lg overflow-hidden">
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
              <div className="my-4 text-2xl font-bold text-pallete4c">
                {project.data.title[lang]}
              </div>
              <div className="my-4 text-md text-center">
                {project.data.description[lang]}
              </div>
              <ProjectTechs techs={project.data.techs} basePath={basePath} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
