import dynamic from "next/dynamic";
const OnboardingLayout = dynamic(
  () => import("../../components/onboarding/layout"),
  { ssr: false }
);
import OnboardingNavbar from "@/components/onboarding/onboardingNavbar";
import UserType from "@/components/onboarding/userTypeCard";
import { Progress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useOnboarding } from "@/context/OnboardingContext";
export default function Onboarding() {
  const { setLoading, setProgress, setStage } = useOnboarding();

  const router = useRouter();
  useEffect(() => {
    setLoading(false);
    console.log("first");
    setProgress(0);
    setStage(0);
  }, []);
  return (
    <OnboardingLayout title="Choose your account">
      <UserType />
    </OnboardingLayout>
  );
}
