import { SocialMediaNav } from "./SocialMediaNav";

type HeroContent = {
  title: string;
  subtitle: string;
  text: string;
  buttonText: string;
};

type HeroProps = {
  lang: string;
  basePath: string;
};

const content: Record<string, HeroContent> = {
  br: {
    title: "Daniel",
    subtitle: "Desenvolvedor Fullstack",
    text: "Oi! Gosto de criar coisas legais, interessantes, desafiadoras e bonitas, seja bem vinde. Aqui você vai encontrar alguns projetos que misturam tecnologia, educação e arte — e um pouco sobre mim.",
    buttonText: "Vem dar uma olhada!",
  },
  en: {
    title: "Daniel",
    subtitle: "Fullstack developer",
    text: "Hi! I like to create cool, interesting, challenging and beautifull stuff, be welcome. Here you'll find projects that blend tech, education and some art — and a little about me.",
    buttonText: "Take a look!",
  },
};

export const Hero: React.FC<HeroProps> = ({ lang, basePath }) => {
  const currentContent = content[lang] || content.en;

  return (
    <>
      <div className="absolute my-auto p-2 inset-0 sm:inset-[10%] lg:inset-x-[20%] flex flex-col items-center h-fit max-h-screen z-10 overflow-show sm:grid sm:grid-cols-2 sm:grid-rows-[auto] gap-4">
        <div className="flex flex-col px-16 sm:self-center sm:pl-0 sm:pr-0 sm:col-span-2 sm:row-start-1 select-none text-white font-fira">
          <span className="font-bold text-2xl">{currentContent.title}</span>
          <span className="font-bold text-lg">{currentContent.subtitle}</span>
          <span className="flex flex-wrap font-normal pt-4 text-justify">
            {currentContent.text}
          </span>
          {/* {currentContent.text.split(" ").map((word, index) => (
              <span
                className="bg-black bg-opacity-[.05] px-1 my-1"
                key={`word-${index}`}
              >
                {word}
              </span>
            ))} */}
        </div>
        <div className="flex sm:justify-end sm:col-span-2 sm:row-start-2 justify-center">
          <a
            className="flex flex-nowrap px-4 py-2 rounded-sm font-fira font-bold text-lg hover:select-none text-pallete4a hover:text-pallete4c bg-pallete4c hover:bg-transparent hover:transition-all hover:outline-dashed hover:outline-2 hover:outline-pallete4c shadow-lg cursor-pointer"
            href={`${basePath}/${lang}/projects`}
            aria-label={currentContent.buttonText}
          >
            {currentContent.buttonText}
          </a>
        </div>
        <div className="sm:row-start-3 sm:col-span-2 w-1/2 flex place-self-center justify-center z-10 pt-4 border-t-2 border-pallete4c border-opacity-[.05] gap-4">
          <SocialMediaNav />
        </div>
      </div>
    </>
  );
};
