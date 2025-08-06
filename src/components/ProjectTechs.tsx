import { Tooltip } from "./base/Toottip";

export const ProjectTechs: React.FC<{ techs: string[]; basePath: string }> = ({
  techs,
  basePath,
}) => {
  return (
    <div className="w-fit flex flex-row gap-6 self-center">
      {techs.map((tech, techIndex) => (
        <Tooltip text={tech} key={tech + techIndex}>
          <img
            src={`${basePath}/tech-logos/${tech}.png`}
            className="w-5 aspect-square object-contain"
            alt={tech}
          />
        </Tooltip>
      ))}
    </div>
  );
};