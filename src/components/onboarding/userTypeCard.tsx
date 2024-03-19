import Image from "next/image";
import org from "../../../public/icons/orgIconReg.svg";
import ind from "../../../public/icons/indIconReg.svg";

import { useEffect, useState } from "react";
import { Button } from "../utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "next/router";

type User = {
  name: string;
  id: number;
};
export default function UserType() {
  const router = useRouter();
  const [selected, setSelected] = useState<User>();
  const { progress, setProgress, setStage } = useOnboarding();
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  const users = [
    { name: "Organization", id: 1 },
    { name: "Individual", id: 2 },
  ];
  return (
    <div className="flex flex-col gap-2">
      {users?.map((user) => (
        <div
          className={`w-full hover:shadow-md ease-in-out duration-500 cursor-pointer rounded-lg min-h-[150px] bg-white ${
            user.id === selected?.id ? "border-blue-600" : "border-light-grey"
          } border-[1px] relative p-3 flex gap-2`}
          onClick={() => setSelected(user)}
          key={user?.id}
        >
          <Image
            src={user?.name === "Organization" ? org : ind}
            alt="icon"
            width={200}
            height={200}
            className="w-[40px] h-[40px]"
          />
          <div className="flex flex-col gap-2">
            <p className="font-semibold ">Sign Up as an {user?.name}</p>
            <p className="text-[14px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </p>
          </div>
        </div>
      ))}

      {selected ? (
        <div className="flex justify-end ease-in-out duration-500 w-full">
          <Button
            type="fit"
            text="Next"
            onClick={() => {
              if (selected.name === "Organization") {
                router.push("/onboarding/sign-up-organization");
              } else {
                router.push("/onboarding/sign-up-individual");
              }
              setTimeout(() => {
                setProgress(25);
                setStage(1);
              }, 200);

              //   router.push("/");
            }}
          />
        </div>
      ) : null}
      <p className="text-center text-dark-grey">
        Already have an account?{" "}
        <span
          className="text-primary cursor-pointer font-semibold"
          onClick={() => {
            router.push("/onboarding/login");
          }}
        >
          Log in{" "}
        </span>{" "}
      </p>
    </div>
  );
}
