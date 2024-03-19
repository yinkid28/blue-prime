import OnboardingLayout from "@/components/onboarding/layout";
import OnboardingNavbar from "@/components/onboarding/onboardingNavbar";
import UserType from "@/components/onboarding/userTypeCard";
import { Progress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
export default function Onboarding() {
  const [progress, setProgress] = useState<number>(0);

  const router = useRouter();
  return (
    <OnboardingLayout title="Choose your account">
      <UserType />
    </OnboardingLayout>
  );
}
