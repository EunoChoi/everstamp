import { cn } from "@/common/utils/cn";

interface Props {
  className?: string;
  edge: 'top' | 'bottom';
  visible: boolean;
}

const gradientClass = {
  top: "bg-scroll-fade-top",
  bottom: "bg-scroll-fade-bottom",
} as const;

export const ScrollEdgeFade = ({ className, edge, visible }: Props) => {
  return (
    <div
      className={cn(
        "pointer-events-none transition-opacity duration-200 ease-in-out",
        visible ? "opacity-0" : "opacity-100",
        gradientClass[edge],
        className,
      )}
    />
  );
};
