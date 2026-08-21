'use client';

import { ScrollContainer } from "@/common/components/ui/ScrollContainer";
import { cn } from "@/common/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { HTMLAttributes } from "react";

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  withScrollFade?: boolean;
}

export const ModalBody = ({ children, className, withScrollFade = false, ...props }: ModalBodyProps) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion ?? false;

  return (
    <ScrollContainer
      className="flex min-h-0 flex-1"
      contentClassName="flex min-h-full flex-col items-center justify-start"
      scrollAreaClassName={cn("flex h-full w-full flex-col items-center justify-start", className)}
      showScrollFade={withScrollFade}
      showScrollToTop
      {...props}
    >
      <motion.div
        className="flex min-h-full w-full flex-col items-center justify-start"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </ScrollContainer>
  );
};
