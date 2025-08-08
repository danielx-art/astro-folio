import { ThemeToggle } from "./ThemeToggle";

type NavMenuProps = {
  areWeHome: boolean;
  homePath: string;
  changeLangPath: string;
  lang: "br" | "en";
};

export const NavMenu: React.FC<NavMenuProps> = ({
  areWeHome,
  homePath,
  changeLangPath,
  lang,
}) => {
  return (
    <nav
      className="absolute left-1 top-0 m-0 p-1 w-fit flex flex-row items-center 
                 gap-2 font-fira cursor-pointer select-none z-[999] text-text dark:text-text-dark"
    >
      <ThemeToggle />
      <a
        id="langBtn"
        href={changeLangPath}
        className="h-8 text-sm no-underline bg-transparent
                 rounded-md p-2 cursor-pointer 
                 transition-all duration-300 
                 backdrop-blur-sm
                 flex items-center justify-center 
                 text-text/60
                 hover:text-text/100"
      >
        <span className={lang === "br" ? "opacity-90" : "opacity-30"}>BR</span>
        <span className="px-1">{"|"}</span>
        <span className={lang === "en" ? "opacity-90" : "opacity-30"}>EN</span>
      </a>
      {!areWeHome && (
        <a
          id="homeBtn"
          href={homePath}
          className="text-sm no-underline bg-transparent
                 rounded-md p-2 cursor-pointer 
                 transition-all duration-300 
                 backdrop-blur-sm
                 flex items-center justify-center 
                 text-text/60
                 hover:text-text/100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </a>
      )}
    </nav>
  );
};
