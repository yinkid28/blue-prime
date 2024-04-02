// import OnboardingLayout from "@/components/onboarding/layout";

import { Button } from "@/components/utils";

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import google from "../../../public/icons/googleIcon.svg";
import github from "../../../public/icons/githubIcon.svg";
import OTPInput from "react-otp-input";
import { BsDot } from "react-icons/bs";
import { useOnboarding } from "@/context/OnboardingContext";
import dynamic from "next/dynamic";
const OnboardingLayout = dynamic(
  () => import("../../components/onboarding/layout"),
  { ssr: false }
);
export default function Authentication() {
  const [otp, setOtp] = useState("");
  const { progress, setProgress, setStage } = useOnboarding();

  const router = useRouter();
  const email = router.query.email as string;
  return (
    <OnboardingLayout title="Authentication" step={2}>
      <div className="flex flex-col gap-5">
        <p className="text-center text-dark-grey">
          We have sent an email to <span className="text-black">{email}</span>
        </p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          containerStyle={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginTop: "10px",
          }}
          renderSeparator={
            <span className="mx-3">
              <BsDot />
            </span>
          }
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: 50,
              }}
              className="border-[1px] border-light-grey w-[70px] h-[50px] rounded p-4 "
            />
          )}
        />
        <Button
          text="Confirm"
          type="full"
          onClick={() => {
            router.push({
              pathname: "/onboarding/intentions",
              query: {
                email,
              },
            });
            setTimeout(() => {
              setProgress(75);
              setStage(3);
            }, 200);
          }}
        />
        <p className="text-center text-dark-grey">
          Yet to recieve code? Resend code in 30s
        </p>
      </div>
    </OnboardingLayout>
  );
}
