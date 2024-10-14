"use client";
import { useOnboarding } from "@/context/OnboardingContext";

import MainSidebar from "./sidebars/mainsidebar";
import ApiProductSidebar from "./sidebars/apiProductSidebar";
import { useApi } from "@/context/ApiDiscoveryContext";
import { IMockApi } from "@/models/apidiscovery.model";
// import WebberSidebar from "./sidebars/weaverSidebar";
import ApiProgressSidebar from "./sidebars/apiProgressSideBar";
// import WeaverProgressSidebar from "./sidebars/webberProgressSidebar";
import { Spinner, UseToastOptions, useToast } from "@chakra-ui/react";
import { Loader, SearchBar } from "../utils";
import { useEffect } from "react";
import { IApi } from "@/models/api.model";
import WeaverProgressSidebar from "./sidebars/weaverProgressSidebar";
import WebberSidebar from "./sidebars/webberSidebar";
import ApiProductClientSidebar from "./sidebars/apiProductClientSidebar";
import AppDetailsWebberSidebar from "./sidebars/appDetailsWebberSidebar";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
  page: string;
};
const toastProps: UseToastOptions = {
  description: "",
  status: "error",
  duration: 3000,
  isClosable: true,
  position: "bottom-right",
};
export default function Layout({ children, page }: LayoutProps) {
  const toast = useToast();
  const { sidebar, loading, setApiErrorMessage, errorMessage, errorStatus } =
    useOnboarding();
  const { api } = useApi();
  useEffect(() => {
    if (errorMessage) {
      const status = errorStatus;
      toast({ ...toastProps, description: errorMessage, status });
    }
    return () => {
      setApiErrorMessage(null);
    };
  }, [errorMessage, errorStatus, setApiErrorMessage, toast]);
  useEffect(() => {
    window.addEventListener("offline", (event) => {
      const status = "warning";
      const message = "No internet connection";
      setApiErrorMessage(message, status);
    });
  }, [setApiErrorMessage, toast]);

  return (
    <>
      <div className="grid grid-cols-1 font-inter h-screen md:grid-cols-[17%_1fr]   gap-2 bg-[#F5F5F5] ">
        <MainSidebar />

        <div className="flex flex-col h-full overflow-scroll pt-5 sm:pt-8 gap-5 w-full">
          <div className="flex items-center px-3 justify-between w-full">
            <p className="font-bold w-full text-[32px]">{page}</p>
            <div className="w-[30%] flex justify-end">
              <SearchBar />
            </div>
          </div>
          <div className="bg-white p-5 rounded-tl-xl h-full ">{children}</div>
        </div>
      </div>
    </>
  );
}
