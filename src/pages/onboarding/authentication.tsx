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
import { ResetTokenDto, VerifyTokenDto } from "@/models/onboarding.model";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import { useToast } from "@chakra-ui/react";
const OnboardingLayout = dynamic(
  () => import("../../components/onboarding/layout"),
  { ssr: false }
);
type time = {
  minutes: number;
  seconds: number;
};
export default function Authentication() {
  const toast = useToast();
  const [otp, setOtp] = useState<string>("");
  const { progress, setProgress, setStage, setLoading, setApiErrorMessage } =
    useOnboarding();
  const [countdown, setCountdown] = useState<boolean>(true);

  const [time, setTime] = useState<time>({
    minutes: 0,
    seconds: 0,
  });

  const router = useRouter();
  const { userId } = router.query;
  const email = router.query.email as string;
  useEffect(() => {
    setLoading(false);
    setProgress(50);
    setStage(2);
    startCountdown(300);
  }, []);
  function startCountdown(duration: number) {
    let timer = duration,
      minutes,
      seconds;
    setCountdown(true);
    const interval = setInterval(() => {
      // Calculate the minutes and seconds from the remaining time
      let time;
      minutes = Math.floor(timer / 60);
      seconds = timer % 60;
      // Display the result in the format MM:SS
      console.log(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      time = {
        minutes,
        seconds,
      };

      setTime(time);
      // Decrease the timer
      timer--;

      // When the countdown finishes, clear the interval
      if (timer < 0) {
        clearInterval(interval);
        console.log("Countdown finished!");
        setCountdown(false);
      }
    }, 1000);
  }

  const verifyToken = async () => {
    const data: VerifyTokenDto = {
      email,
      token: otp,
    };
    try {
      const res = await OnboardingServices.VerifyToken(data);
      toast({
        status: "success",
        description: "Token successfully Verified",
        position: "bottom-right",
      });
      router.push({
        pathname: "/onboarding/intentions",
        query: {
          email,
          userId,
        },
      });
      setLoading(true);
      setProgress(75);
      setStage(3);
    } catch (error: any) {
      console.log(error);
      // actions.setSubmitting(false);
      setProgress(50);
      setStage(2);
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };
  const resendToken = async () => {
    const data: ResetTokenDto = {
      email,
    };
    try {
      const res = await OnboardingServices.ResetToken(data);
      toast({
        status: "success",
        description: "Token successfully re-sent",
        position: "bottom-left",
      });
      startCountdown(300);
    } catch (error: any) {
      console.log(error);
      // actions.setSubmitting(false);
      setProgress(50);
      setStage(2);
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };

  return (
    <OnboardingLayout title="Authentication" step={2}>
      <div className="flex flex-col gap-5">
        <p className="text-center text-dark-grey">
          We have sent an email to <span className="text-black">{email}</span>
        </p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
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
            verifyToken();
          }}
        />
        <p className="text-center text-dark-grey">
          Yet to recieve code? Resend code in {time.minutes}:
          {time.seconds < 10 && "0"}
          {time.seconds}
        </p>
        {!countdown && (
          <p
            className="font-semibold text-sm text-primary text-center cursor-pointer"
            onClick={resendToken}
          >
            Resend OTP Code
          </p>
        )}
      </div>
    </OnboardingLayout>
  );
}
