import Image from "next/image";
import { useEffect, useState } from "react";
import org from "../../../public/icons/orgIconReg.svg";
import ind from "../../../public/icons/indIconReg.svg";
import dynamic from "next/dynamic";
const OnboardingLayout = dynamic(
  () => import("../../components/onboarding/layout"),
  { ssr: false }
);
import { Button } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import { IIndustry, IUser, LogIndustryDto } from "@/models/onboarding.model";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import { useToast } from "@chakra-ui/react";
import CookieManager from "@/helper_utils/cookie_manager";
const url = process.env.NEXT_PUBLIC_BASE_URL;
type PageProps = {
  industries: IIndustry[];
  currentUser: IUser;
};
export default function Recommendations({
  industries,
  currentUser,
}: PageProps) {
  const fixedLength = 10;
  const initVals = industries.slice(0, fixedLength); // More concise and clear
  const router = useRouter();
  const { setProgress, setStage, setLoading, setApiErrorMessage, setUser } =
    useOnboarding();
  const toast = useToast();
  const [selected, setSelected] = useState<IIndustry[]>([]);
  const [renderedOptions, setRenderedOptions] = useState<IIndustry[]>(initVals);
  const proceed = () => {
    setProgress(0);
    setStage(0);
    setLoading(true);
  };
  const reset = () => {
    setLoading(false);
    setProgress(100);
    setStage(4);
  };

  useEffect(() => {
    reset();
    setUser(currentUser);
  }, []);
  useEffect(() => {
    // This might need adjustment based on deselection handling
    const filteredOptions = renderedOptions.filter(
      (item) => !selected.includes(item)
    );
    setRenderedOptions(filteredOptions);
    console.log(selected);
  }, [selected]);

  useEffect(() => {
    updateRenderedOptions();
  }, [renderedOptions, selected]); // Added selected as a dependency to handle deselection

  const updateRenderedOptions = () => {
    const currentLength = renderedOptions.length;
    const availableSpace = fixedLength - currentLength;
    if (availableSpace <= 0) return;

    const startIndex = industries.findIndex(
      (option) =>
        !renderedOptions.includes(option) && !selected.includes(option)
    );
    if (startIndex === -1) return; // All options are either selected or rendered

    const endIndex = Math.min(startIndex + availableSpace, industries.length);
    const newOptions = industries.slice(startIndex, endIndex);

    setRenderedOptions([...renderedOptions, ...newOptions]);
  };
  const loguserIndustries = async () => {
    try {
      const dataArray: LogIndustryDto[] = Array.from(selected, (item) => {
        return {
          industryId: item.industryId,
          userId: 4,
        };
      });

      // TO BE REFACTORED WHEN NEW ENDPOINT COMES IN
      const promises = dataArray.map((data: LogIndustryDto) => {
        OnboardingServices.logUserIndustries(data).then((res) => {
          if (res.status === "OK" || res.message === "success") {
            return res.message;
          } else {
            return null; // or handle the error differently
          }
        });
      });

      const moduleResponse = await Promise.all(promises);
      const filteredResponses = moduleResponse.filter(
        (response) => response !== null
      );

      if (filteredResponses.includes(undefined)) {
        toast({
          description: "Welcome!!",
          position: "bottom-right",
          status: "success",
        });
        router.push({
          pathname: "/onboarding/recommendations",
        });
        proceed();
      } else {
        reset();
        setApiErrorMessage("Something went wrong", "error");
      }
    } catch (error: any) {
      reset();
      console.log(error);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  return (
    <OnboardingLayout
      title="API Industry, Please select as much as possible"
      step={4}
    >
      <div className="flex flex-col gap-5 item-center justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          {renderedOptions?.map((item, index) => (
            <div
              className={`w-full hover:shadow-md ease-in-out duration-500 slideInRight cursor-pointer rounded-lg h-fit bg-white border-[1px] relative p-3 flex gap-2`}
              onClick={() => {
                if (selected.includes(item)) {
                  setSelected(
                    selected.filter((mod) => mod.industryId !== item.industryId)
                  );
                } else {
                  const updatedArr = [...selected];
                  updatedArr.push(item);
                  setSelected(updatedArr);
                }
              }}
              key={index}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="w-full  flex justify-center">
          <div className="w-full md:w-[50%]">
            <Button
              text="Confirm"
              type="full"
              onClick={() => {
                loguserIndustries();
                router.push({
                  pathname: "/api_discovery",
                });
              }}
            />
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  let industries = null;
  let id = query.userId;
  let currentUser = null;
  let jwt = context.req.cookies.jwt;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  };
  try {
    const { data } = await axios.get(
      `${url}/onboarding-and-rbac/api/industries`,
      { headers }
    );
    // const res = await axios.get(
    //   `${url}/onboarding-and-rbac/api/get_user_by_id/${id}`,
    //   { headers }
    // );

    industries = data;
    // currentUser = res.data;
    console.log(currentUser);
    // console.log(currentUser);
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      industries,
      // currentUser,
    },
  };
};
