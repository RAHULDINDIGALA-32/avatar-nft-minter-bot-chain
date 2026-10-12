import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
export const botTestnet = defineChain({ id: 968, name: 'BOT Chain Testnet', nativeCurrency: { name: 'BOT', symbol: 'BOT', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.bohr.life'] } }, blockExplorers: { default: { name: 'BOTScan', url: 'https://scan.bohr.life' } } });
export const botMainnet = defineChain({ id: 677, name: 'BOT Chain', nativeCurrency: { name: 'BOT', symbol: 'BOT', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.botchain.ai'] } }, blockExplorers: { default: { name: 'BOTScan', url: 'https://scan.botchain.ai' } } });

const config = getDefaultConfig({
  appName: 'BOT Avatar NFT',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '00000000000000000000000000000000',
  chains: [botTestnet, botMainnet],
  ssr: true,
});

const queryClient = new QueryClient();

const WagmiProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="wide"
          theme={darkTheme()}
          initialChain={botTestnet}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiProviderWrapper;
