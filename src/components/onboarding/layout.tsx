import { Progress, UseToastOptions, useToast } from "@chakra-ui/react";
import OnboardingNavbar from "./onboardingNavbar";
import { useOnboarding } from "@/context/OnboardingContext";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "../utils";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
  step?: number;
  title?: string;
};
const toastProps: UseToastOptions = {
  description: "",
  status: "error",
  duration: 3000,
  isClosable: true,
  position: "bottom-right",
};
export default function OnboardingLayout({
  children,
  step,
  title,
}: LayoutProps) {
  const { progress, stage, setProgress, setStage } = useOnboarding();
  const router = useRouter();
  const [prog, setProg] = useState<number>(progress);

  useEffect(() => {
    setProg(progress);
  }, [progress]);
  const toast = useToast();
  const {
    sidebar,
    loading,
    setApiErrorMessage,
    errorMessage,
    errorStatus,
    setLoading,
  } = useOnboarding();
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
  const handleStyling = () => {
    switch (stage) {
      case 0:
        return "flex flex-col gap-3 w-full md:w-[70%]";
      case 1:
        return "flex flex-col gap-3 w-full md:w-[90%]";
      case 3:
        return "flex flex-col gap-3 w-full md:w-[120%]";
      case 4:
        return "flex flex-col gap-3 w-full md:w-[120%]";
      default:
        return "";
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full font-urban flex justify-center">
          <div className="w-[80%] md:w-[95%] flex flex-col gap-3 items-center">
            <OnboardingNavbar />
            {router.asPath !== "/onboarding/login" ? (
              <div className="w-full md:w-[60%] lg:w-[40%] flex items-center flex-col gap-3">
                <div className="w-full">
                  <Progress
                    size={"sm"}
                    colorScheme="blue"
                    value={progress}
                    borderRadius={8}
                  />
                  <div
                    className="flex my-2 items-center cursor-pointer flex-row gap-3"
                    onClick={() => {
                      setLoading(true);
                      if (progress > 25) {
                        router.back();
                        const newProgress = (progress as number) - 25;
                        const newStage = (stage as number) - 1;
                        setStage(newStage);
                        setProgress(newProgress);
                      } else {
                        setStage(0);
                        setProgress(0);
                        router.push("/onboarding/login");
                      }
                    }}
                  >
                    <FaChevronLeft />

                    <div className="flex flex-col gap-2">
                      {step && (
                        <p className="text-dark-grey">Step {step} of 4</p>
                      )}
                      <p className="font-[14px] font-semibold">{title}</p>
                    </div>
                  </div>
                </div>
                <div className={handleStyling()}>{children}</div>
              </div>
            ) : (
              <div className="w-full md:w-[50%] lg:w-[40%] flex items-center flex-col gap-3">
                {children}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
