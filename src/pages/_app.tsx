import "@/styles/globals.css";
import "@/styles/fonts/fonts.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { OnboardingProvider } from "@/context/OnboardingContext";
import { registerLicense } from "@syncfusion/ej2-base";

const key = process.env.NEXT_PUBLIC_SYNC_KEY;
registerLicense(key as string);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <OnboardingProvider>
        <Component {...pageProps} />
      </OnboardingProvider>
    </ChakraProvider>
  );
}
