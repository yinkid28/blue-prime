import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";

import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import Image from "next/image";
import { RxCross2, RxDividerVertical } from "react-icons/rx";

import StepOne from "@/components/uploadADP/StepOne";
import StepTwo from "@/components/uploadADP/StepTwo";
import StepThree from "@/components/uploadADP/StepThree";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export default function UploadAdp({ isOpen, onClose }: addEndpointModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);

  const { setApiErrorMessage } = useOnboarding();

  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalOverlay />
      <ModalContent bg={step !== 2 ? "#fafafa" : "#05211340"}>
        {step != 2 ? (
          <ModalHeader className="flex items-center justify-between w-full ">
            <Image
              src={"/icons/logo.svg"}
              alt="logo"
              width={200}
              height={100}
              className="w-[5%] "
            />

            <button
              className="w-fit h-fit flex items-center gap-2 px-5 py-1 rounded-full border-[#757575] border text-[#757575] text-sm"
              onClick={() => {
                onClose();
                setFile(null);
              }}
            >
              <RxCross2 /> Exit
            </button>
          </ModalHeader>
        ) : null}

        <ModalBody className="w-full h-full flex items-center justify-center ">
          {step === 1 ? (
            <StepOne
              setStep={setStep}
              step={step}
              file={file}
              setFile={setFile}
            />
          ) : null}
          {step === 2 ? (
            <StepTwo
              setStep={setStep}
              step={step}
              file={file}
              onClose={onClose}
            />
          ) : null}
          {step === 3 ? (
            <StepThree
              setStep={setStep}
              file={file}
              onClose={onClose}
              setFile={setFile}
            />
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
