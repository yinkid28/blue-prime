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
import { IActivity, IUser, LogActivityDto } from "@/models/onboarding.model";
import CookieManager from "@/helper_utils/cookie_manager";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import { useToast } from "@chakra-ui/react";
const url = process.env.NEXT_PUBLIC_BASE_URL;

type PageProps = {
  intentions: IActivity[];
  currentUser: IUser;
};
export default function Intensions({ intentions, currentUser }: PageProps) {
  const router = useRouter();
  const { userId } = router.query;
  const [selected, setSelected] = useState<IActivity[]>([]);
  const { setProgress, setStage, setLoading, setApiErrorMessage, setUser } =
    useOnboarding();
  const toast = useToast();
  const proceed = () => {
    setProgress(100);
    setStage(4);
    setLoading(true);
  };
  const reset = () => {
    setLoading(false);
    setProgress(75);
    setStage(3);
  };
  useEffect(() => {
    reset();
    setUser(currentUser);
    if (!intentions && setApiErrorMessage) {
      setApiErrorMessage("Something went wrong", "error");
    }
  }, []);
  const loguserActivities = async () => {
    if (selected.length < 1) {
      toast({
        status: "info",
        position: "bottom-right",
        description: "Kindly select at least one activity",
      });
      return;
    }
    try {
      const activityArr = Array.from(selected, (item) => item.id);

      const data: LogActivityDto = {
        userId: parseInt(userId as string),
        activityIds: activityArr,
      };

      const res = await OnboardingServices.logUserIntentions(data);
      if (res.status === "OK") {
        toast({
          description: "Successfully saved modules",
          position: "bottom-right",
          status: "success",
        });
        router.push({
          pathname: "/onboarding/recommendations",
        });
        proceed();
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
      title="What would you like to do here? Please select as much as possible"
      step={3}
    >
      <div className="flex flex-col gap-5 item-center justify-center w-full">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {intentions?.map((user) => (
            <div
              className={`w-full hover:shadow-md ease-in-out duration-500 cursor-pointer rounded-lg min-h-[150px] bg-white ${
                selected.some((val) => val?.id === user.id)
                  ? "border-blue-600"
                  : "border-light-grey"
              } border-[1px] relative p-3 flex gap-2`}
              onClick={() => {
                const foundmodule = intentions.find(
                  (val) => val?.id === user.id
                );
                console.log(foundmodule);
                if (foundmodule) {
                  if (selected.some((val) => val?.id === foundmodule?.id)) {
                    console.log("removed");
                    setSelected(
                      selected.filter((val) => val?.id !== foundmodule?.id)
                    );
                  } else {
                    console.log("add");
                    setSelected([...selected, foundmodule]);
                  }
                }
              }}
              key={user?.id}
            >
              <Image
                src={org}
                alt="icon"
                width={200}
                height={200}
                className="w-[40px] h-[40px]"
              />
              <div className="flex flex-col gap-2">
                <p className="font-semibold ">
                  Sign Up as an {user?.activityName}
                </p>
                <p className="text-[14px]">
                  Includes up to 10 users, 20GB indiviual data and access to all
                  features.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full  flex justify-center">
          <div className="w-full md:w-[50%]">
            <Button
              text="Confirm"
              type="full"
              onClick={() => {
                // router.push({
                //   pathname: "/onboarding/recommendations",
                // });
                // setTimeout(() => {
                //   setProgress(100);
                //   setStage(4);
                // }, 200);
                loguserActivities();
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
  let intentions = null;
  let id = query.userId;
  let currentUser = null;
  let jwt = context.req.cookies.jwt;
  // console.log(id);
  console.log(context);
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  };
  try {
    const { data } = await axios.get(
      `${url}/onboarding-and-rbac/api/user-activities`,
      { headers }
    );
    const res = await axios.get(
      `${url}/onboarding-and-rbac/api/get_user_by_id/${id}`,
      { headers }
    );

    intentions = data;
    currentUser = res.data.data;
    console.log(currentUser, "currr");
    // console.log(currentUser);
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      intentions,
      currentUser,
    },
  };
};
