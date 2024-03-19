import "@/styles/globals.css";
import "@/styles/fonts/fonts.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { OnboardingProvider } from "@/context/OnboardingContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <OnboardingProvider>
        <Component {...pageProps} />
      </OnboardingProvider>
    </ChakraProvider>
  );
}
