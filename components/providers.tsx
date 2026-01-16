'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { sepolia } from 'viem/chains';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'cmkgkw9p803tyjo0c6ke9iqhw'}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#FFFFFF', // Pure White Accent
          showWalletLoginFirst: true,
          logo: 'https://your-logo-url.com/logo.png',
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets',
          },
        },
        defaultChain: sepolia,
        supportedChains: [sepolia],
      }}
    >
      {children}
    </PrivyProvider>
  );
}