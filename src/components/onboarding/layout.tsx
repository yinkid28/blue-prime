import { Progress } from "@chakra-ui/react";
import OnboardingNavbar from "./onboardingNavbar";
import { useOnboarding } from "@/context/OnboardingContext";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
  step?: number;
  title: string;
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
  console.log(typeof progress);
  return (
    <div className="w-full font-urban flex justify-center">
      <div className="w-[80%] md:w-[95%] flex flex-col gap-3 items-center">
        <OnboardingNavbar />

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
                if (progress !== 0) {
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
                {step && <p className="text-dark-grey">Step {step} of 4</p>}
                <p className="font-[14px] font-semibold">{title}</p>
              </div>
            </div>
          </div>
          <div className={handleStyling()}>{children}</div>
        </div>
      </div>
    </div>
  );
}
