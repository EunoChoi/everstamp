'use client';

import { cn } from "@/common/utils/cn";
import { HTMLAttributes, ReactNode, forwardRef, useImperativeHandle, useState } from "react";
import { MdArrowUpward } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import { ScrollEdgeFade } from "./ScrollEdgeFade";

interface ScrollContainerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className'> {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  fadeSizeClassName?: string;
  scrollAreaClassName?: string;
  showScrollFade?: boolean;
  showScrollToTop?: boolean;
}

const scrollToTopButtonClass =
  "absolute right-[4dvw] z-[91] flex h-10 w-10 items-center justify-center rounded-full bg-theme-surface/80 text-xl text-theme-accent shadow-[0_1px_6px_rgb(var(--theme-shadow-color)/0.06)] backdrop-blur-xl max-tablet:bottom-[calc(var(--mobileNav)+20px)] tablet:max-desktop:bottom-8 desktop:bottom-12";

export const ScrollContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(
  ({
    children,
    className,
    contentClassName,
    fadeSizeClassName = "h-12",
    scrollAreaClassName,
    showScrollFade = false,
    showScrollToTop = false,
    ...props
  }, ref) => {
    const [scrollArea, setScrollArea] = useState<HTMLDivElement | null>(null);
    const shouldObserve = showScrollFade || showScrollToTop;
    const { ref: topBoundaryRef, inView: isTopBoundaryVisible } = useInView({
      initialInView: true,
      root: scrollArea,
      skip: !shouldObserve,
    });
    const { ref: bottomBoundaryRef, inView: isBottomBoundaryVisible } = useInView({
      initialInView: true,
      root: scrollArea,
      skip: !shouldObserve,
    });

    useImperativeHandle(ref, () => scrollArea!, [scrollArea]);

    const scrollToTop = () => {
      scrollArea?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <div className={cn("relative min-h-0 w-full overflow-hidden", className)}>
        <div
          ref={setScrollArea}
          className={cn("h-full w-full overflow-y-auto", scrollAreaClassName)}
          {...props}
        >
          <div className={cn("relative min-h-full w-full shrink-0", contentClassName)}>
            <div
              ref={topBoundaryRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
            />
            {children}
            <div
              ref={bottomBoundaryRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
            />
          </div>
        </div>
        {showScrollFade && (
          <>
            <ScrollEdgeFade
              edge="top"
              visible={isTopBoundaryVisible}
              className={cn("absolute inset-x-0 top-0 z-[90]", fadeSizeClassName)}
            />
            <ScrollEdgeFade
              edge="bottom"
              visible={isBottomBoundaryVisible}
              className={cn("absolute inset-x-0 bottom-0 z-[90]", fadeSizeClassName)}
            />
          </>
        )}
        {showScrollToTop && !isTopBoundaryVisible && (
          <button
            aria-label="맨 위로 이동"
            className={scrollToTopButtonClass}
            onClick={scrollToTop}
            type="button"
          >
            <MdArrowUpward />
          </button>
        )}
      </div>
    );
  },
);

ScrollContainer.displayName = 'ScrollContainer';
