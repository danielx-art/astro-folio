import { SocialMediaBar } from "./SocialMediaBar";
export type langData = {
  [lang: string]: string[];
};

const text: langData = {
  br: [
    "Oi! Eu sou o Daniel e seja bem vinde a minha página! Eu ensino física e matemática, faço uns visuais e crio websites interessantes.",
  ],
  en: [
    "Hi! I'm Daniel and welcome to my homepage! I teach physics and math, make some visuals and build interesting websites.",
  ],
};
const buttons: langData = {
  br: ["Vem dar uma olhada", "Fale comigo"],
  en: ["Take a look", "Talk to me"],
};

export const Hero: React.FC<{ lang: string; basePath: string }> = ({
  lang,
  basePath,
}) => {
  return (
    <>
      <div className="w-full h-full absolute flex flex-col justify-center px-12 z-10">
        <div className="select-none text-black text-opacity-100 text-justify mx-auto w-full sm:w-1/2 text-lg font-fira flex flex-row flex-wrap justify-center">
          {text[lang][0].split(" ").map((word) => (
            <div className="border-none w-fit h-fit bg-white bg-opacity-100 px-1 my-1">
              {word}
            </div>
          ))}
        </div>
        <div className="flex flex-row flex-wrap my-4 gap-4 justify-center text-lg font-fira mx-auto">
          <a
            className="text-white hover:text-pallete4c outline-2 outline-dashed outline-white hover:outline-2 hover:outline-pallete4c  inline-block shadow-none cursor-pointer px-4 py-3 rounded-full"
            href={`${basePath}/${lang}/projects`}
          >
            {buttons[lang][0]}
          </a>
          {/* <a className="bg-transparent text-pallete4b outline-2 outline-dashed outline-pallete4b hover:bg-pallete4b inline-block shadow-none hover:text-white cursor-pointer px-4 py-3 rounded-full">
              {buttons[lang][1]}
            </a> */}
        </div>
        <SocialMediaBar />
      </div>
    </>
  );
};
