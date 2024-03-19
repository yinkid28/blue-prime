import { Button } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import Image from "next/image";

// logout function
// auth config
// http  & services config
// protected routes implementation

export default function Home() {
  const { progress } = useOnboarding();
  return (
    <div className="flex items-center h-screen justify-center">
      <p className="text-5xl">{progress}</p>
      <Button
        type="full"
        text="Hello"
        onClick={() => {
          console.log("first");
        }}
      />
    </div>
  );
}
