import { cn } from '@/common/utils/cn';
import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLElement>;

const docCardClass = 'rounded-theme bg-theme-surface shadow-card';

const DocCard = ({ className, ...props }: Props) => {
  return <section className={cn(docCardClass, className)} {...props} />;
};

export default DocCard;
