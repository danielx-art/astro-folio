export const ProjectTechs: React.FC<{ techs: string[]; basePath: string }> = ({
  techs,
  basePath,
}) => {
  return (
    <div className="w-fit flex flex-row gap-6 self-center my-2">
      {techs.map((tech, techIndex) => (
        <div className="group relative">
          <span
            className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto"
          >
            {tech}
          </span>
          <img
            src={`${basePath}/tech-logos/${tech}.png`}
            className="w-5 aspect-square object-contain"
            key={techIndex}
            alt={tech}
          ></img>
        </div>
      ))}
    </div>
  );
};
