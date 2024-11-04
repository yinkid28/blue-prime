import Layout from "@/components/Layout/layout";
import { Goback, StepIconCustom } from "@/components/utils";
import { GrFilter } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";

import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import { useEffect, useRef, useState } from "react";
import ADPServices from "@/services/adp_services/adp_services";
import { useOnboarding } from "@/context/OnboardingContext";
import { useSteps } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function DeliveryPlanDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState<boolean>(false);

  const { setApiErrorMessage, user } = useOnboarding();
  const steps = [
    { title: "First", description: "Contact Info" },
    { title: "Second", description: "Date & Time" },
    { title: "Third", description: "Select Rooms" },
  ];
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });
  useEffect(() => {
    if (id) {
    }
  }, [id]);

  return (
    <Layout
      page={`ADP Summary: `}
      subPageText={
        <span className="text-[#757575] font-[400]">Activities </span>
      }
    >
      <div className="flex flex-col gap-8 w-full">
        <Goback />

        <div className="relative timeline">
          {/* Map over data here to render a list of activities  */}
          <div className="p-5">
            <StepIconCustom />
            <div className="flex gap-2 w-full">
              <div className="bg-secondaryBg w-[30px] h-[30px] flex items-center justify-center  text-secondary p-3 font-semibold rounded-lg">
                A
              </div>
              <div className="flex flex-col min-w-[40%] gap-2">
                <div className="flex flex-col">
                  <p className="text-xs text-[#959595]">01/02/2022 09:23 am</p>
                  <p className="text-[#353535]">Amos Adamu</p>
                </div>
                <div className="bg-[#F5F5F5] rounded-xl p-5  flex flex-col ">
                  <p className="font-thin text-sm">
                    You submitted the ADP24_LNG for review
                  </p>
                  <div className="bg-white w-full flex rounded-lg p-3 items-center justify-between">
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
                        <p className="font-[500]">file name</p>
                        <p className="font-[500] text-xs text-[#757575]">
                          last updated
                          {/* {handleLastModified(file as File)} */}
                        </p>
                      </div>
                    </div>
                    <button className="w-fit h-fit rounded-xl bg-secondaryBg px-4 py-2 font-semibold">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
