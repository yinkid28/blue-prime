import { toTitleCase } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { IMockApi } from "@/models/apidiscovery.model";
import { Badge } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaChevronLeft, FaRegClock, FaRegEye, FaRegStar } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdGridView, MdHomeFilled } from "react-icons/md";

type sideBarProps = {
  api: IMockApi;
};
export default function ApiProgressSidebar({ api }: sideBarProps) {
  const router = useRouter();
  const { setSidebar } = useOnboarding();
  return (
    <div className="w-full  flex flex-col h-full gap-2">
      <div className="bg-white rounded p-5 h-fit flex flex-col gap-4 ">
        <p className="text-2xl">Logo</p>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            router.push("/webber/dashboard");
            setSidebar("webber");
          }}
        >
          <FaChevronLeft className="text-xs text-dark-grey" />
          <p className="text-mid-grey">Back</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-[50px] h-[50px] rounded bg-mid-grey overflow-hidden">
              <Image
                src={api.img}
                alt="icon"
                width={200}
                height={200}
                className="w-full h-full"
              />
            </div>
            <div className="">
              <p className="font-semibold">{api.title}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white h-full rounded p-5 flex flex-col gap-4">
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath ==
            `/webber/api_details/${toTitleCase(api.title, true)}/overview`
              ? "text-primary"
              : "text-dark-grey"
          }`}
          onClick={() => {
            router.push(
              `/webber/api_details/${toTitleCase(api.title, true)}/overview`
            );
            // setSidebar("webber");
          }}
        >
          <MdGridView />

          <p>Overview</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath ==
            `/webber/api_details/${toTitleCase(
              api.title,
              true
            )}/api_information`
              ? "text-primary"
              : "text-dark-grey"
          }`}
          onClick={() => {
            router.push(
              `/webber/api_details/${toTitleCase(
                api.title,
                true
              )}/api_information`
            );
            // setSidebar("webber");
          }}
        >
          <MdGridView />

          <p>API Information</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath ==
            `/webber/api_details/${toTitleCase(api.title, true)}/runtime`
              ? "text-primary"
              : "text-dark-grey"
          }`}
          onClick={() => {
            router.push(
              `/webber/api_details/${toTitleCase(api.title, true)}/runtime`
            );
            // setSidebar("webber");
          }}
        >
          <MdGridView />

          <p>Runtime</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath ==
            `/webber/api_details/${toTitleCase(api.title, true)}/endpoints`
              ? "text-primary"
              : "text-dark-grey"
          }`}
          onClick={() => {
            router.push(
              `/webber/api_details/${toTitleCase(api.title, true)}/endpoints`
            );
            // setSidebar("webber");
          }}
        >
          <MdGridView />

          <p>Endpoints</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `/webber/${api.title}/overview`
              ? "text-primary"
              : "text-dark-grey"
          }`}
          onClick={() => {
            // router.push("/webber/dashboard");
            // setSidebar("webber");
          }}
        >
          <MdGridView />

          <p>Modules</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath ==
            `/webber/api_details/${toTitleCase(api.title, true)}/api_definition`
              ? "text-primary"
              : "text-dark-grey"
          }`}
          onClick={() => {
            router.push(
              `/webber/api_details/${toTitleCase(
                api.title,
                true
              )}/api_definition`
            );
            // setSidebar("webber");
          }}
        >
          <MdGridView />

          <p>API definition</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `/webber/${api.title}/overview`
              ? "text-primary"
              : "text-dark-grey"
          }`}
          onClick={() => {
            // router.push("/webber/dashboard");
            // setSidebar("webber");
          }}
        >
          <MdGridView />

          <p>Test</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `/webber/${api.title}/overview`
              ? "text-primary"
              : "text-dark-grey"
          }`}
          onClick={() => {
            // router.push("/webber/dashboard");
            // setSidebar("webber");
          }}
        >
          <MdGridView />

          <p>Deploy</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `/webber/${api.title}/overview`
              ? "text-primary"
              : "text-dark-grey"
          }`}
          onClick={() => {
            // router.push("/webber/dashboard");
            // setSidebar("webber");
          }}
        >
          <MdGridView />

          <p>API Manager</p>
        </div>
      </div>
    </div>
  );
}
