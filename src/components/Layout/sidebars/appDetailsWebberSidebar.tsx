import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function AppDetailsWebberSidebar() {
  const router = useRouter();
  const { setSidebar } = useOnboarding();
  const { currentApplication } = useApi();

  return (
    <div className="bg-white rounded p-5 h-full flex flex-col gap-4 ">
      <Image
        src={"/icons/logo.svg"}
        alt="logo"
        width={200}
        height={100}
        className="w-[80%]"
      />
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          router.back();
          setSidebar("");
        }}
      >
        <FaChevronLeft className="text-xs text-dark-grey" />
        <p className="text-mid-grey">Back</p>
      </div>

      <p className="font-semibold">{currentApplication!.name}</p>
    </div>
  );
}
