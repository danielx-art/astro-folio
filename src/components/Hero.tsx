import { SocialMediaBar } from "../components/SocialMediaBar";
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
  br: ["Vem dar uma olhada"],
  en: ["Take a look"],
};

export const Hero: React.FC<{ lang: string; basePath: string }> = ({
  lang,
  basePath,
}) => {
  return (
    <>
      <div className="w-full h-full absolute flex flex-col justify-center px-12 z-10">
        <div className="select-none text-black text-opacity-100 mx-auto sm:ml-[10%] sm:mr-auto w-full sm:w-1/3 text-lg font-fira flex flex-row flex-wrap justify-center sm:justify-start mt-auto">
          {text[lang][0].split(" ").map((word, index) => (
            <div className="border-none w-fit h-fit bg-white bg-opacity-100 px-1 my-1" key={'word'+index}>
              {word}
            </div>
          ))}
        </div>
        <div className="flex flex-row flex-wrap my-4 gap-4 justify-center text-lg font-fira mx-auto select-none">
          <a
            className="text-xl flex flex-col justify-center items-center select-none hover:select-none text-white hover:text-pallete4c outline-2 outline-dashed outline-white hover:outline-2 hover:outline-pallete4c shadow-none cursor-pointer min-w-max px-20 py-16 rounded-full"
            href={`${basePath}/${lang}/projects`}
          >
            {/* <div className="text-8xl">
              {">"}
            </div> */}
            {buttons[lang][0]}
          </a>
        </div>
        <SocialMediaBar />
      </div>
    </>
  );
};
