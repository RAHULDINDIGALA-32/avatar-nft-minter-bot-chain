'use client';
import WagmiProviderWrapper from './WagmiContextProvider';

const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <WagmiProviderWrapper>
            {children}
        </WagmiProviderWrapper>
    );
};



export default App;

