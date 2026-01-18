'use client'

import { PrivyProvider } from '@privy-io/react-auth'

export function Providers({ children }: { children: React.ReactNode }) {
  // Construct the Infura RPC URL
  const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_API_KEY
  const RPC_URL = INFURA_ID 
    ? `https://sepolia.infura.io/v3/${INFURA_ID}`
    : 'https://rpc.sepolia.org' // Fallback if key is missing

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#676FFF',
          logo: '/logo.png',
          landingHeader: 'Log in to BlockRides', 
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
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
              http: [RPC_URL], // <--- UPDATED TO USE INFURA
            },
            public: {
              http: [RPC_URL], // <--- UPDATED TO USE INFURA
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
                http: [RPC_URL], // <--- UPDATED TO USE INFURA
              },
              public: {
                http: [RPC_URL], // <--- UPDATED TO USE INFURA
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