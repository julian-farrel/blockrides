'use client'

import { PrivyProvider } from '@privy-io/react-auth'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        // 1. BRANDING CONFIGURATION
        appearance: {
          theme: 'dark',
          accentColor: '#676FFF',
          logo: '/logo.png', // <--- Points to public/logo.png
          landingHeader: 'Log in to BlockRides', 
        },
        
        // 2. WALLET CONFIGURATION
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },

        // 3. CHAIN CONFIGURATION (Sepolia)
        defaultChain: {
          id: 11155111,
          name: 'Sepolia',
          network: 'sepolia',
          nativeCurrency: {
            name: 'Sepolia Ether',
            symbol: 'ETH',
            decimals: 18,
          },
          rpcUrls: {
            default: {
              http: ['https://rpc.sepolia.org'],
            },
            public: {
              http: ['https://rpc.sepolia.org'],
            },
          },
          blockExplorers: {
            default: {
              name: 'Etherscan',
              url: 'https://sepolia.etherscan.io',
            },
          },
          testnet: true,
        },
        supportedChains: [
          {
            id: 11155111,
            name: 'Sepolia',
            network: 'sepolia',
            nativeCurrency: {
              name: 'Sepolia Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: {
              default: {
                http: ['https://rpc.sepolia.org'],
              },
              public: {
                http: ['https://rpc.sepolia.org'],
              },
            },
            blockExplorers: {
              default: {
                name: 'Etherscan',
                url: 'https://sepolia.etherscan.io',
              },
            },
            testnet: true,
          }
        ]
      }}
    >
      {children}
    </PrivyProvider>
  )
}