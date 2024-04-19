import { SocialMediaNav } from "./SocialMediaNav";
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
      <div className="w-full h-screen absolute flex flex-col justify-center z-10 overflow-hidden sm:grid sm:grid-cols-2">
        <div className="flex flex-0 px-8 sm:self-center sm:-translate-y-[50%] sm:px-0 sm:pl-20">
          <div className="select-none text-black text-opacity-100 mx-auto text-lg font-fira flex flex-row flex-wrap justify-center sm:justify-end mt-auto sm:h-fit sm:pr-2">
            {text[lang][0].split(" ").map((word, index) => (
              <div
                className="border-none w-fit h-fit bg-white bg-opacity-100 px-1 my-1"
                key={"word" + index}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-0 sm:self-center sm:translate-y-[50%] sm:pr-8">
          <div className="flex flex-row flex-wrap mb-4 mt-12 gap-4 justify-center mx-auto select-none sm:h-fit sm:m-0 sm:p-0">
            <a
              className="rounded-sm font-fira sm:text-4xl text-lg select-none hover:select-none text-pallete4a hover:text-pallete4c  bg-pallete4c hover:bg-transparent hover:transition-all hover:outline-dashed hover:outline-2 hover:outline-pallete4c shadow-lg cursor-pointer px-8 py-8 sm:px-12 sm:py-12"
              href={`${basePath}/${lang}/projects`}
            >
              {buttons[lang][0]}
            </a>
          </div>
        </div>
      </div>
      <div className="absolute w-full h-fit bottom-0 flex items-center justify-center p-8 z-10">
        <SocialMediaNav />
      </div>
    </>
  );
};
