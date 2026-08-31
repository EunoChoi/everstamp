import { ReactNode } from 'react';

const infoCardClass = "grid grid-cols-[32px_1fr] gap-x-3 gap-y-1 rounded-2xl bg-theme-surface p-4 shadow-card desktop:min-h-[150px] desktop:grid-cols-1 desktop:grid-rows-[32px_auto_1fr] desktop:gap-y-2";

interface Props {
  icon: ReactNode;
  text: string;
  title: string;
}

const IntroInfoCard = ({ icon, text, title }: Props) => (
  <div className={infoCardClass}>
    <span className="row-span-2 inline-flex h-7 w-7 text-2xl text-theme-accent desktop:row-span-1">{icon}</span>
    <strong className="text-base text-theme-text-primary desktop:text-lg">{title}</strong>
    <span className="text-sm leading-normal text-theme-text-tertiary desktop:text-base">{text}</span>
  </div>
);

export default IntroInfoCard;
