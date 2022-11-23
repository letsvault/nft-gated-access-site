import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Polygon;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
      desiredChainId={activeChainId}
      authConfig={{
        authUrl: 'api/auth',
        domain: 'example.org',
        loginRedirect: '/',
      }}
    
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
