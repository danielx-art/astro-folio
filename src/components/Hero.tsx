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
      <div className="w-full h-full absolute flex flex-col justify-center sm:items-center px-12 z-10">
        <div className="select-none text-black text-opacity-100 mx-auto w-full sm:w-1/3 text-lg font-fira flex flex-row flex-wrap justify-center sm:justify-end mt-auto sm:h-fit sm:-translate-x-1/2 sm:pr-2">
          {text[lang][0].split(" ").map((word, index) => (
            <div className="border-none w-fit h-fit bg-white bg-opacity-100 px-1 my-1" key={'word'+index}>
              {word}
            </div>
          ))}
        </div>
        <div className=" flex flex-row flex-wrap mb-4 mt-12 gap-4 justify-center w-fit mx-auto select-none sm:h-fit sm:translate-x-1/2 sm:pl-2">
          <a
            className=" rounded-sm font-fira sm:text-4xl text-lg flex flex-col justify-center items-center select-none hover:select-none text-pallete4a hover:text-pallete4c  bg-pallete4c hover:bg-transparent hover:transition-all outline-2 outline-dashed hover:outline-2 hover:outline-pallete4c shadow-none cursor-pointer min-w-max px-8 py-8 sm:px-12 sm:py-12"
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
