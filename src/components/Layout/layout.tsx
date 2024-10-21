"use client";
import { useOnboarding } from "@/context/OnboardingContext";

import MainSidebar from "./sidebars/mainsidebar";
import { UseToastOptions, useToast } from "@chakra-ui/react";
import { SearchBar } from "../utils";
import { useEffect } from "react";
import { useRouter } from "next/router";
import OnboardingLayout from "./onboardingLayout";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
  page: string;
  secondaryElement?: React.ReactNode | React.ReactNode[];
};
const toastProps: UseToastOptions = {
  description: "",
  status: "error",
  duration: 3000,
  isClosable: true,
  position: "bottom-right",
};
export default function Layout({
  children,
  page,
  secondaryElement,
}: LayoutProps) {
  const toast = useToast();
  const router = useRouter();
  const { setApiErrorMessage, errorMessage, errorStatus, layout } =
    useOnboarding();

  useEffect(() => {
    if (errorMessage) {
      const status = errorStatus;
      toast({ ...toastProps, description: errorMessage, status });
    }
    return () => {
      setApiErrorMessage(null);
    };
  }, [errorMessage, errorStatus, setApiErrorMessage, toast]);
  // useEffect(() => {
  //   const handleOffline = (event: any) => {
  //     const status = "warning";
  //     const message = "No internet connection";
  //     setApiErrorMessage(message, status);
  //   };
  //   window.addEventListener("offline", handleOffline);

  //   return () => {
  //     window.removeEventListener("offline", handleOffline);
  //   };
  // }, [setApiErrorMessage]);
  return (
    <>
      <div className="grid grid-cols-1 font-inter h-screen md:grid-cols-[17%_1fr]   gap-2 bg-[#F5F5F5] ">
        <MainSidebar />

        <div className="flex flex-col h-full overflow-scroll pt-5 sm:pt-8 gap-5 w-full">
          <div className="flex items-center px-3 justify-between w-full">
            <p className="font-bold w-full text-[32px]">{page}</p>
            <div className="w-full flex justify-end gap-3">
              <SearchBar />
              {secondaryElement ? secondaryElement : null}
            </div>
          </div>
          <div className="bg-white p-5 rounded-tl-xl flex shadow-lg flex-grow flex-col">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
