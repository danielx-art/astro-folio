import { getCollection } from "astro:content";
const projects = await getCollection("projects");

export const Projects: React.FC<{ basePath: string; lang: string }> = ({
  basePath,
  lang,
}) => {
  return (
    <div className="bg-pallete4a w-full min-h-full sm:p-4 text-white sm:mt-12">
      {projects.map((project, index) => {
        return (
          <>
            <div
              className="px-8 pt-8 pb-16 w-full h-fit flex gap-4 sm:gap-8 flex-col sm:flex-row justify-center items-center"
              key={project.id}
            >
              <div className="sm:w-3/5 p-4 sm:h-100 flex flex-col justify-center gap-4">
                <h2 className="text-lg font-fira rounded-full w-fit sm:mx-0 mx-auto text-pallete4b">
                  {project.data.title[lang]}
                </h2>

                <div className="text-left font-fira text-sm">
                  {project.data.description[lang]}
                </div>

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
              <div className="w-4/5 sm:w-1/2 relative outline-dashed outline-2 outline-pallete4c rounded-lg overflow-visible">
                <img
                  src={`${basePath}/projects/thumbs/${index + 1}.png`}
                  className="w-full aspect-square object-contain m-0 p-0"
                ></img>
                <div className="bg-pallete4a gap-1 border-pallete4a absolute right-1/2 translate-x-1/2 -translate-y-1/2 flex flex-row flex-nowrap border-4 rounded-full overflow-hidden">
                  {project.data.link && (
                    <div className=" bg-pallete4c sm:py-2 py-2 pl-3 pr-2   hover:scale-105 transition-all">
                      <a href={project.data.link}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="-1 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </a>
                    </div>
                  )}
                  {project.data.github && (
                    <div className="bg-pallete4c sm:py-2 py-2 pl-2 pr-3   hover:scale-105 transition-all">
                      <a href={project.data.github}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="-1 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                          />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="border-b-2 border-b-pallete4c opacity-20 w-2/3 sm:w-full mx-auto"></div>
          </>
        );
      })}
    </div>
  );
};
