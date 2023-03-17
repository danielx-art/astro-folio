import { getCollection } from "astro:content";
const projects = await getCollection("projects");

export const Projects: React.FC<{ basePath: string; lang: string }> = ({
  basePath,
  lang,
}) => {
  return (
    <div className="w-full h-full sm:p-4 text-white">
      {projects.map((project, index) => {
        return (
          <div
            className="p-8 w-full h-fit flex gap-8 flex-col-reverse sm:flex-row justify-center items-center "
            key={project.id}
          >
            <div className="sm:w-3/5 p-4 sm:h-100 flex flex-col justify-center gap-4">
              <h2 className="text-lg font-bold">{project.data.title[lang]}</h2>

              <div className="">{project.data.description[lang]}</div>

              <div className="w-fit flex flex-row gap-6 self-center sm:mt-8">
                {project.data.techs.map((tech, techIndex) => (
                  <div className="group relative">
                    <span
                      className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto"
                    >
                      {tech}
                    </span>
                    <img
                      src={`${basePath}/tech-logos/${tech}.png`}
                      className="w-8 aspect-square object-contain"
                      key={techIndex}
                      alt={tech}
                    ></img>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2 relative outline-dashed outline-2 outline-pallete4c rounded-lg">
              <img
                src={`${basePath}/projects/thumbs/${index + 1}.png`}
                className="w-full aspect-square object-contain m-0 p-0"
              ></img>
              <div className="w-fit bg-blue-500 py-1 px-4 rounded-md absolute right-1/2 translate-x-1/2 -translate-y-1/2">
                <a href={project.data.link}>Visit</a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
