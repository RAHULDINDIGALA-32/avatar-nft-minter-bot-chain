import type { Metadata } from "next";
import "./globals.css";
import App from './App';

export const metadata: Metadata = {
  title: "NFT Minter",
  description: "A Next.js app developed using Viem + Wagmi + RainbowKit to mint NFTs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <App>
           {children}
        </App>
    
      </body>
    </html>
  );
}
