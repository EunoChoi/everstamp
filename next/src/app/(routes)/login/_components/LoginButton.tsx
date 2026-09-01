import SocialLoginButton from '@/common/components/ui/SocialLoginButton';
import { LOGIN_PROVIDERS, type LoginProviderId } from '@/common/constants/loginProviders';
import { signIn } from 'next-auth/react';

interface LoginButtonProps {
  provider: LoginProviderId;
}

const LoginButton = ({ provider }: LoginButtonProps) => {
  const providerConfig = LOGIN_PROVIDERS[provider];
  const options = { callbackUrl: '/login' };

  return (
    <SocialLoginButton
      onClick={() => signIn(
        providerConfig.id,
        options,
        providerConfig.signInOptions,
      )}
      provider={provider}
    />
  );
};

export default LoginButton;
