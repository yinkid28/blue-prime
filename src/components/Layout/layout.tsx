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
import { Loader } from "../utils";
import { useEffect } from "react";
import { IApi } from "@/models/api.model";
import WeaverProgressSidebar from "./sidebars/weaverProgressSidebar";
import WebberSidebar from "./sidebars/webberSidebar";
import ApiProductClientSidebar from "./sidebars/apiProductClientSidebar";
import AppDetailsWebberSidebar from "./sidebars/appDetailsWebberSidebar";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};
const toastProps: UseToastOptions = {
  description: "",
  status: "error",
  duration: 3000,
  isClosable: true,
  position: "bottom-right",
};
export default function ApiLayout({ children }: LayoutProps) {
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
  switch (sidebar) {
    case "":
      return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[17%_1fr]  gap-2 bg-light-grey p-2">
              <div className="">
                <MainSidebar />
              </div>

              <div className="bg-white rounded-t overflow-y-scroll">
                {children}
              </div>
            </div>
          )}
        </>
      );
    case "appDetails":
      return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[23%_1fr]  gap-2 bg-light-grey p-2">
              <div className="">
                <AppDetailsWebberSidebar />
              </div>

              <div className="bg-white rounded-t overflow-y-scroll">
                {children}
              </div>
            </div>
          )}
        </>
      );
    case "api":
      return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[23%_1fr]  gap-2 bg-light-grey p-2">
              <div className="">
                <ApiProductSidebar api={api as IApi} />
              </div>

              <div className="bg-white rounded-t overflow-y-scroll">
                {children}
              </div>
            </div>
          )}
        </>
      );
    case "apiProgress":
      return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[17%_1fr]  gap-2 bg-lightest-grey p-2">
              <div className="">
                <ApiProgressSidebar api={api as IApi} />
              </div>

              <div className="bg-white rounded-t overflow-y-scroll">
                {children}
              </div>
            </div>
          )}
        </>
      );
    case "apiProgressWeaver":
      return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[17%_1fr]  gap-2 bg-light-grey p-2">
              <div className="">
                <WeaverProgressSidebar api={api as IApi} />
              </div>

              <div className="bg-white rounded-t overflow-y-scroll">
                {children}
              </div>
            </div>
          )}
        </>
      );
    case "weaver":
      return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[17%_1fr]  gap-2 bg-light-grey p-2">
              <div className="">
                <WebberSidebar />
              </div>

              <div className="bg-white rounded-t overflow-y-scroll">
                {children}
              </div>
            </div>
          )}
        </>
      );

    default:
      break;
  }
}
