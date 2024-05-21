"use client";
import { useOnboarding } from "@/context/OnboardingContext";

import ApiProductSidebar from "./sidebars/apiProductSidebar";
import { useApi } from "@/context/ApiDiscoveryContext";
import { IMockApi } from "@/models/apidiscovery.model";
import WebberSidebar from "./sidebars/webberSidebar";
import ApiProgressSidebar from "./sidebars/apiProgressSideBar";
import WeaverProgressSidebar from "./sidebars/weaverProgressSidebar";
import { Spinner, UseToastOptions, useToast } from "@chakra-ui/react";
import { Loader } from "../utils";
import { useEffect } from "react";
import BackOfficeSidebar from "./sidebars/backOfficeSidebar";
import CategoryDetailSidebar from "./sidebars/categoryDetailSidebar";
import BusinessSolutionSidebar from "./sidebars/businessSolutionSidebar";
import APIProductDetailsSidebar from "./sidebars/businessSolutionSidebar";

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
  const {
    sidebar,
    loading,
    setApiErrorMessage,
    errorMessage,
    errorStatus,
    apiCategory,
  } = useOnboarding();
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
    case "backOffice":
      return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[19%_1fr]  gap-2 bg-light-grey p-2">
              <div className="">
                <BackOfficeSidebar />
              </div>

              <div className="bg-white rounded-t overflow-y-scroll">
                {children}
              </div>
            </div>
          )}
        </>
      );
    case "categoryDetails":
      return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[19%_1fr]  gap-2 bg-light-grey p-2">
              <div className="">
                <CategoryDetailSidebar category={apiCategory} />
              </div>

              <div className="bg-white rounded-t overflow-y-scroll">
                {children}
              </div>
            </div>
          )}
        </>
      );
    case "ApiProductDetails":
      return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[19%_1fr]  gap-2 bg-light-grey p-2">
              <div className="">
                <APIProductDetailsSidebar />
              </div>

              <div className="bg-white rounded-t overflow-y-scroll">
                {children}
              </div>
            </div>
          )}
        </>
      );
    case "backOfficeApi":
      return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[23%_1fr]  gap-2 bg-light-grey p-2">
              <div className="">
                <ApiProductSidebar api={api as IMockApi} />
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
