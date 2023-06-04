import type { langData } from "../page-components/Hero";

const buttons: langData = {
  br: ["Fale comigo"],
  en: ["Talk to me"],
};

export const Footer: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <a
      className="bg-transparent text-pallete4b outline-2 outline-dashed outline-pallete4b hover:bg-pallete4b inline-block shadow-none hover:text-white cursor-pointer px-4 py-3 mt-12 mb-4 rounded-full"
      href="mailto:daniel.rangel.guedes@gmail.com"
    >
      {buttons[lang]}
    </a>
  );
};
