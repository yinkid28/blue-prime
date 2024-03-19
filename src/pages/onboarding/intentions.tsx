import Image from "next/image";
import { useState } from "react";
import org from "../../../public/icons/orgIconReg.svg";
import ind from "../../../public/icons/indIconReg.svg";
import OnboardingLayout from "@/components/onboarding/layout";
import { Button } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "next/router";
export default function Intensions() {
  const router = useRouter();
  const [selected, setSelected] = useState<any>();
  const { progress, setProgress, setStage } = useOnboarding();

  const users = [
    { name: "I want to build API’s ", id: 1 },
    { name: "I want to source for API’s lorem ", id: 2 },
    { name: "I want to source for API’s lorem ", id: 3 },
    { name: "I want to source for API’s lorem ", id: 4 },
  ];
  return (
    <OnboardingLayout
      title="What would you like to do here? Please select as much as possible"
      step={3}
    >
      <div className="flex flex-col gap-5 item-center justify-center w-full">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {users?.map((user) => (
            <div
              className={`w-full hover:shadow-md ease-in-out duration-500 cursor-pointer rounded-lg min-h-[150px] bg-white ${
                user.id === selected?.id
                  ? "border-blue-600"
                  : "border-light-grey"
              } border-[1px] relative p-3 flex gap-2`}
              onClick={() => setSelected(user)}
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
                <p className="font-semibold ">Sign Up as an {user?.name}</p>
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
                router.push({
                  pathname: "/onboarding/recommendations",
                });
                setTimeout(() => {
                  setProgress(100);
                  setStage(4);
                }, 200);
              }}
            />
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
