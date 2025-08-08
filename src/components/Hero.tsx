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
    buttonText: "> Vem ver",
  },
  en: {
    title: "Daniel",
    subtitle: "Fullstack developer",
    text: "Hi! I like to create cool, interesting, challenging and beautifull stuff, be welcome. Here you'll find projects that blend tech, education and some art — and a little about me.",
    buttonText: "> Take a look!",
  },
};

export const Hero: React.FC<HeroProps> = ({ lang, basePath }) => {
  const currentContent = content[lang] || content.en;

  return (
    <>
      <div className="absolute my-auto p-2 inset-0 sm:inset-[10%] lg:inset-x-[20%] flex flex-col items-center justify-center h-fit max-h-screen z-10 overflow-show gap-4">
        <div className="flex flex-col px-16 sm:px-0 sm:self-center select-none text-text font-fira">
          <span className="font-bold text-3xl">{currentContent.title}</span>
          <span className="font-bold text-xl">{currentContent.subtitle}</span>
          <span className="flex flex-wrap font-normal pt-4 sm:text-justify">
            {currentContent.text}
          </span>
        </div>
        <div className="flex justify-center sm:w-full select-none">
          <a
            className="flex flex-nowrap px-4 py-2 rounded-sm font-fira font-bold text-lg  text-background hover:text-primary bg-primary hover:bg-transparent hover:outline-primary outline-dashed outline-2 outline-transparent hover:transition-all shadow-lg cursor-pointer focus:outline-offset-2 focus:outline focus:outline-1 focus:outline-text     "
            href={`${basePath}/${lang}/projects`}
            aria-label={currentContent.buttonText}
          >
            {currentContent.buttonText}
          </a>
        </div>
        <div className="w-1/2 flex justify-center pt-4 border-t-2 border-primary/[0.05] gap-4">
          <SocialMediaNav />
        </div>
      </div>
    </>
  );
};