import type { Metadata } from 'next';
import './globals.css';
import App from './App';

export const metadata: Metadata = {
  title: 'Chainfolk Avatar NFTs',
  description:
    'A Next.js app developed using Viem, Wagmi, and RainbowKit to mint NFTs.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <App>{children}</App>
      </body>
    </html>
  );
}