import {
  ApiInformation,
  ApiUpload,
} from "@/components/Webber/CreateAPI/createApiComponent";
import OnboardingNavbar from "@/components/onboarding/onboardingNavbar";
import { Progress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function CreateApi() {
  const router = useRouter();
  const [progress, setProgress] = useState<number>(50);
  const [title, setTitle] = useState<string>("Build API");
  const [step, setStep] = useState<number>(1);

  return (
    <>
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
                  if (step === 1) {
                    router.back();
                  } else {
                    setStep(1);
                  }
                }}
              >
                <FaChevronLeft />

                <div className="flex flex-col gap-2">
                  {step && <p className="text-dark-grey">Step {step} of 2</p>}
                  <p className="font-[14px] font-semibold">{title}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-[70%]">
              {step === 1 ? (
                <ApiInformation
                  setProgress={setProgress}
                  setStep={setStep}
                  setTitle={setTitle}
                />
              ) : (
                <ApiUpload
                  setProgress={setProgress}
                  setStep={setStep}
                  setTitle={setTitle}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
