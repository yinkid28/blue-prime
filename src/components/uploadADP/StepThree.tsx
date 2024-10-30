import { useToast, Input } from "@chakra-ui/react";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import { RxDividerVertical } from "react-icons/rx";
import { MdCancel } from "react-icons/md";
import { Button } from "@/components/utils";
import { handleLastModified } from "@/helper_utils/helpers";
import { useRouter } from "next/router";
import { useOnboarding } from "@/context/OnboardingContext";
import ADPServices from "@/services/adp_services/adp_services";
type steponeProps = {
  setStep: Dispatch<SetStateAction<number>>;
  setFile: Dispatch<SetStateAction<File | null>>;

  file: File | null;
  onClose: () => void;
};
export default function StepThree({
  setStep,
  setFile,
  file,
  onClose,
}: steponeProps) {
  const router = useRouter();
  const templateId = router.query.templateId as string;
  const { setApiErrorMessage } = useOnboarding();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const saveExcelRecords = async (id: number) => {
    setLoading(true);
    try {
      const res = await ADPServices.SaveTemplateById(id);
      if (res.template.id) {
        toast({
          description:
            "You have successfully submitted your document for review",
          duration: 3000,
          position: "bottom-right",
          status: "success",
        });
        setLoading(false);
        setStep(1);
        onClose();
        setFile(null);
        router.push(
          {
            pathname: router.pathname, // Keep the current path
            query: {}, // Set an empty query object to remove all query parameters
          },
          undefined,
          { shallow: true }
        );
      }
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };
  return (
    <div className="rounded-xl shadow-md bg-white w-[50%] p-5 flex-col flex gap-5">
      <p className="text-2xl font-semibold text-[#052113]">Import ADP</p>
      {/* <p className="  text-[#052113]">
        Import your ADP file to start your annual delivery plan{" "}
      </p> */}
      <div className="p-2 bg-success-bg flex items-center gap-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.659 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
            fill="#007A3D"
          />
        </svg>
        <p className="text-[#353535]">ADP File imported Successfull</p>
      </div>
      <div className="flex flex-col h-[200px] w-full gap-3 items-center">
        <div className="border w-full flex rounded-lg p-3 items-center justify-between">
          <div className="flex items-center  gap-2 w-fit">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="10" fill="#F5F5F5" />
              <g clipPath="url(#clip0_129_1435)">
                <path
                  d="M10.859 10.877L23.429 9.08197C23.5 9.07179 23.5723 9.07699 23.641 9.0972C23.7098 9.11741 23.7734 9.15216 23.8275 9.1991C23.8817 9.24605 23.9251 9.30408 23.9549 9.36928C23.9846 9.43447 24 9.5053 24 9.57697V30.423C24 30.4945 23.9846 30.5653 23.9549 30.6304C23.9252 30.6955 23.8819 30.7535 23.8279 30.8004C23.7738 30.8473 23.7103 30.8821 23.6417 30.9024C23.5731 30.9227 23.5009 30.928 23.43 30.918L10.858 29.123C10.6196 29.089 10.4015 28.9702 10.2437 28.7883C10.0859 28.6065 9.99903 28.3738 9.99902 28.133V11.867C9.99903 11.6262 10.0859 11.3935 10.2437 11.2116C10.4015 11.0297 10.6196 10.9109 10.858 10.877H10.859ZM12 12.735V27.265L22 28.694V11.306L12 12.735ZM25 27H28V13H25V11H29C29.2652 11 29.5196 11.1053 29.7071 11.2929C29.8947 11.4804 30 11.7348 30 12V28C30 28.2652 29.8947 28.5195 29.7071 28.7071C29.5196 28.8946 29.2652 29 29 29H25V27ZM18.2 20L21 24H18.6L17 21.714L15.4 24H13L15.8 20L13 16H15.4L17 18.286L18.6 16H21L18.2 20Z"
                  fill="#007A3D"
                />
              </g>
              <defs>
                <clipPath id="clip0_129_1435">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(8 8)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div className="flex flex-col">
              <p className="font-[500]">{file?.name}</p>
              <p className="font-[500] text-xs text-[#757575]">
                last updated {handleLastModified(file as File)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="fit"
          text="OK"
          loading={loading}
          onClick={() => {
            saveExcelRecords(parseInt(templateId));
          }}
          className="font-semibold"
        />
      </div>
    </div>
  );
}
