import "@/styles/globals.css";
import "@/styles/fonts/fonts.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { OnboardingProvider } from "@/context/OnboardingContext";
import { OnApiProvider } from "@/context/ApiDiscoveryContext";
import { UserProvider } from "@/context/userContext";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserProvider>
        <OnApiProvider>
          <OnboardingProvider>
            <Component {...pageProps} />
          </OnboardingProvider>
        </OnApiProvider>
      </UserProvider>
    </ChakraProvider>
  );
}
