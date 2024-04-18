import OnboardingNavbar from "@/components/onboarding/onboardingNavbar";
import { Button } from "@/components/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import google from "../../../public/icons/googleIcon.svg";
import github from "../../../public/icons/githubIcon.svg";
import { FaChevronLeft } from "react-icons/fa";
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  return (
    <div className="w-full font-urban flex justify-center">
      <div className="w-[80%] md:w-[95%] flex flex-col gap-3 items-center">
        <OnboardingNavbar />
        <div className="w-full md:w-[50%] lg:w-[40%] flex items-center flex-col gap-3">
          <div className="w-full">
            <div
              className="flex my-2 items-center cursor-pointer flex-row gap-3"
              //   onClick={() => {
              //     router.p;

              //   }}
            >
              <FaChevronLeft />

              <div className="flex flex-col gap-2">
                <p className="font-[14px] font-semibold">Login</p>
              </div>
            </div>
          </div>
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
            }}
          />
          <p className="text-dark-grey text-sm text-center ">or</p>
          <div className="flex flex-col w-full items-center md:flex-row gap-3">
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
            Don&apos;t have an account?{" "}
            <span
              className="text-primary cursor-pointer font-semibold"
              onClick={() => {
                router.push("/onboarding/sign-up-organization");
              }}
            >
              Sign Up{" "}
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
