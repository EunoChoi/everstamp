import { LOGIN_PROVIDERS, type LoginProviderId } from '@/common/constants/loginProviders';
import { cn } from '@/common/utils/cn';
import Image from 'next/image';
import type { ReactNode } from 'react';

interface Props {
  disabled?: boolean;
  label?: ReactNode;
  onClick: () => void;
  provider: LoginProviderId;
}

const buttonClass = 'flex h-12 w-60 items-center justify-between gap-4 rounded-full border-2 border-theme-border px-4 disabled:cursor-not-allowed disabled:opacity-50';

const SocialLoginButton = ({ disabled = false, label, onClick, provider }: Props) => {
  const providerConfig = LOGIN_PROVIDERS[provider];

  return (
    <button
      className={cn(
        buttonClass,
        providerConfig.bgColor,
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Image
        src={providerConfig.icon}
        width={24}
        height={24}
        alt={providerConfig.id}
      />
      <span className={cn('mr-1 text-base', providerConfig.textColor)}>
        {label ?? providerConfig.content}
      </span>
      <span />
    </button>
  );
};

export default SocialLoginButton;
