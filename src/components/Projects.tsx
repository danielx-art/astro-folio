import { getCollection } from "astro:content";
const projects = await getCollection("projects");

export const Projects: React.FC = () => {
  return (
    <div className="w-full h-full p-4 text-white">
      {projects.map((project, index) => {
        return (
          <div
            className="p-8 w-full h-fit flex flex-row justify-start bg-slate-700"
            key={project.id}
          >
            <div className="w-3/5 p-4 h-100 flex flex-col justify-center gap-4">
              <h2 className="text-lg">{project.data.title}</h2>

              <div className="">{project.data.description}</div>

              <div className="w-fit flex flex-row gap-6">
                {project.data.techs.map((tech, techIndex) => (
                  <img
                    src={`/tech-logos/${tech}.png`}
                    className="w-8 aspect-square object-contain"
                    key={techIndex}
                  ></img>
                ))}
              </div>
            </div>
            <div className="w-1/2 relative">
              <img
                src={`/projects/thumbs/${index + 1}.png`}
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
