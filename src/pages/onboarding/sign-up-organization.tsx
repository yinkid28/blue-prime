import OnboardingLayout from "@/components/onboarding/layout";

import { Button } from "@/components/utils";

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import google from "../../../public/icons/googleIcon.svg";
import github from "../../../public/icons/githubIcon.svg";
import { useOnboarding } from "@/context/OnboardingContext";

export default function SignUpOrganization() {
  const { progress, setProgress, setStage } = useOnboarding();

  const [email, setEmail] = useState<string>("");

  const router = useRouter();
  return (
    <OnboardingLayout title="Finish creating your account" step={1}>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Company Name</p>
        <input
          type="text"
          name="companyName"
          placeholder="AZY Corporation"
          className="outline-none bg-transparent"
        />
      </div>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Email Address</p>
        <input
          type="text"
          name="email"
          placeholder="ayz@corp.com"
          className="outline-none bg-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Password</p>
        <input
          type="password"
          name="password"
          placeholder="*********"
          className="outline-none bg-transparent"
        />
      </div>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Confirm Password</p>
        <input
          type="password"
          name="Cpassword"
          placeholder="*********"
          className="outline-none bg-transparent"
        />
      </div>
      <div className="flex flex-row gap-2">
        <input
          type="checkbox"
          name="tandc"
          className="outline-none bg-transparent"
        />
        <p className="text-dark-grey">
          By signing up, I agree to the{" "}
          <span className="text-primary">Terms</span> and{" "}
          <span className="text-primary">Privacy Policy</span>{" "}
        </p>
      </div>
      <Button
        text="Create Account"
        type="full"
        onClick={() => {
          router.push({
            pathname: "/onboarding/authentication",
            query: {
              email,
            },
          });
          setTimeout(() => {
            setProgress(50);
            setStage(2);
          }, 200);
        }}
      />
      <p className="text-dark-grey text-sm text-center ">or</p>
      <div className="flex flex-col items-center md:flex-row gap-3">
        <button className="flex gap-2 w-full bg-[#C0E0FF] rounded-full items-center p-2">
          <Image
            src={google}
            alt="icon"
            width={200}
            height={200}
            className="w-[30px] h-[30px]"
          />
          <p className="text-dark-grey text-sm">Sign in with Google</p>
        </button>
        <button className="flex gap-2 w-full bg-white border-[1px] border-black rounded-full items-center p-2">
          <Image
            src={github}
            alt="icon"
            width={200}
            height={200}
            className="w-[30px] h-[30px]"
          />
          <p className="text-dark-grey text-sm">Sign in with Github</p>
        </button>
      </div>
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
    </OnboardingLayout>
  );
}
