import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function AppDetailsWebberSidebar() {
  const router = useRouter();
  const { setSidebar } = useOnboarding();
  const { currentApplication } = useApi();
  const [activeItem, setActiveItem] = useState("oauth");

  const handleNavigation = (path: string, item: string) => {
    router.push(path);
    setActiveItem(item);
  };

  const getItemStyle = (item: string) => {
    const isActive = activeItem === item;
    return `md:flex items-center cursor-pointer hover:text-primary gap-3 w-full ${
      isActive ? "text-primary" : "text-dark-grey"
    }`;
  };

  return (
    <div className="bg-white rounded p-5 h-full flex flex-col gap-4 ">
      <Image
        src="/icons/logo.svg"
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

      {currentApplication && (
        <div
          className={getItemStyle("oauth")}
          onClick={() => handleNavigation(`/webber/library/application/${currentApplication.name}`, "oauth")}
        >
          <p className="font-semibold">OAuth API Keys</p>
        </div>
      )}

      <div
        className={getItemStyle("subscriptions")}
        onClick={() => handleNavigation(`/webber/library/${currentApplication?.apiCode}/subscriptions`, "subscriptions")}
      >
        <p className="font-semibold">Subscriptions</p>
      </div>
    </div>
  );
}