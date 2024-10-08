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


  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const getItemStyle = (path: string) => {
    const isActive = router.asPath === path;
    return `md:flex hidden items-center cursor-pointer hover:text-primary gap-3 w-full ${
      isActive
        ? "text-primary"
        : "text-dark-grey"
    }`;
  };

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

      <div        
      >
      <p className="font-semibold">{currentApplication!.name}</p>
      </div>

      <div
        className={getItemStyle("")}
       
      >
        <p className="font-semibold">OAuth API Keys</p>
      </div>
      <div
        className={getItemStyle("webber/library")}
        onClick={() => handleNavigation("/webber/library/${api.apiCode}/subscriptions")}
      >
        <p className="font-semibold">Subscriptions</p>
      </div>
    </div>
  );
}
