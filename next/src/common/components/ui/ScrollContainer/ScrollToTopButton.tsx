import { MdArrowUpward } from "react-icons/md";

interface Props {
  onClick: () => void;
}

const scrollToTopButtonClass =
  "absolute right-[4dvw] z-[91] flex h-10 w-10 items-center justify-center rounded-full bg-theme-surface/80 text-xl text-theme-accent shadow-[0_1px_6px_rgb(var(--theme-shadow-color)/0.06)] backdrop-blur-xl max-tablet:bottom-[calc(var(--mobileNav)+20px)] tablet:max-desktop:bottom-8 desktop:bottom-12";

export const ScrollToTopButton = ({ onClick }: Props) => {
  return (
    <button
      aria-label="맨 위로 이동"
      className={scrollToTopButtonClass}
      onClick={onClick}
      type="button"
    >
      <MdArrowUpward />
    </button>
  );
};
