export const ProjectLinks: React.FC<{ link: string; githubLink: string }> = ({
  link,
  githubLink,
}) => {
  return (
    <div className="bg-pallete4a gap-1 border-pallete4a flex flex-row flex-nowrap border-4 rounded-full overflow-hidden">
      <div className=" bg-pallete4c sm:py-2 py-2 pl-3 pr-2   hover:scale-105 transition-all">
        <a href={link}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="-1 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      </div>

      <div className="bg-pallete4c sm:py-2 py-2 pl-2 pr-3   hover:scale-105 transition-all">
        <a href={githubLink}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="-1 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
