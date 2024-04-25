import { toTitleCase } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { IMockApi } from "@/models/apidiscovery.model";
import { Badge } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaChevronLeft, FaRegClock, FaRegEye, FaRegStar } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { MdGridView, MdHomeFilled } from "react-icons/md";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Show,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";

type sideBarProps = {
  api: IMockApi;
};
export default function WeaverProgressSidebar({ api }: sideBarProps) {
  const router = useRouter();
  const { setSidebar } = useOnboarding();

  useEffect(() => {
    console.log(router.asPath);
  }, [router]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-full flex flex-col h-full gap-2">
      <div className="bg-white rounded p-5 h-fit flex flex-row items-center md:items-start md:flex-col justify-between md:justify-normal gap-4 ">
        <p className="text-2xl">Logo</p>
        <IoMenu
          size={23}
          onClick={isOpen ? onClose : onOpen}
          className="flex md:hidden cursor-pointer z-[1600]"
        />

        <Show breakpoint="(max-width: 768px)">
          <Drawer
            placement="right"
            onClose={onClose}
            isOpen={isOpen}
            size={"md"}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerBody className="space-y-4 mt-20 bg-light-grey p-2">
                <div className="bg-white mt-2 p-4 rounded space-y-2">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      router.back();
                      // setSidebar("webber");
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

                <div className="bg-white h-[72%] rounded p-5 flex flex-col gap-4">
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath ==
                      `/weaver/library/${toTitleCase(api.title, true)}/overview`
                        ? "text-primary font-semibold"
                        : "text-dark-grey"
                    }`}
                    // I am going to hard code the route to be pushed to for a brief while!
                    onClick={() => {
                      router.push(
                        `/weaver/library/${toTitleCase(
                          api.title,
                          true
                        )}/overview`
                      );
                    }}
                  >
                    <Icon icon="lets-icons:widget-light" className="text-xl" />

                    <p>Overview</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath ==
                      `/weaver/library/${toTitleCase(
                        api.title,
                        true
                      )}/api_information`
                        ? "text-primary font-semibold"
                        : "text-dark-grey"
                    }`}
                    // I am going to hard code the route to be pushed to for a brief while!
                    onClick={() => {
                      router.push(
                        `/weaver/library/${toTitleCase(
                          api.title,
                          true
                        )}/api_information`
                      );
                    }}
                  >
                    <Icon
                      icon="material-symbols-light:list-alt-outline"
                      className="text-xl"
                    />

                    <p>API Information</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath ==
                      `/weaver/library/${toTitleCase(
                        api.title,
                        true
                      )}/consumption_rate`
                        ? "text-primary font-semibold"
                        : "text-dark-grey"
                    }`}
                    // I am going to hard code the route to be pushed to for a brief while!
                    onClick={() => {
                      router.push(
                        `/weaver/library/${toTitleCase(
                          api.title,
                          true
                        )}/consumption_rate`
                      );
                    }}
                  >
                    <Icon
                      icon="lets-icons:link-alt-light"
                      className="text-xl"
                    />

                    <p>Consumption Rate</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath ==
                      `/weaver/library/${toTitleCase(api.title, true)}/test`
                        ? "text-primary font-semibold"
                        : "text-dark-grey"
                    }`}
                    // I am going to hard code the route to be pushed to for a brief while!
                    onClick={() => {
                      router.push(
                        `/weaver/library/${toTitleCase(api.title, true)}/test`
                      );
                    }}
                  >
                    <Icon icon="lets-icons:edit-light" className="text-xl" />

                    <p>Test</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath ==
                      `/weaver/library/${toTitleCase(
                        api.title,
                        true
                      )}/subscriptions`
                        ? "text-primary font-semibold"
                        : "text-dark-grey"
                    }`}
                    // I am going to hard code the route to be pushed to for a brief while!
                    onClick={() => {
                      router.push(
                        `/weaver/library/${toTitleCase(
                          api.title,
                          true
                        )}/subscriptions`
                      );
                    }}
                  >
                    <Icon
                      icon="material-symbols-light:deployed-code-outline-sharp"
                      className="text-xl"
                    />

                    <p>Subscriptions</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath ==
                      `/weaver/library/${toTitleCase(api.title, true)}/feedback`
                        ? "text-primary font-semibold"
                        : "text-dark-grey"
                    }`}
                    // I am going to hard code the route to be pushed to for a brief while!
                    onClick={() => {
                      router.push(
                        `/weaver/library/${toTitleCase(
                          api.title,
                          true
                        )}/feedback`
                      );
                    }}
                  >
                    <Icon icon="solar:library-linear" />

                    <p>Feedback</p>
                  </div>
                </div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Show>

        <div
          className="hidden md:flex items-center gap-2 cursor-pointer"
          onClick={() => {
            router.back();
            // setSidebar("webber");
          }}
        >
          <FaChevronLeft className="text-xs text-dark-grey" />
          <p className="text-mid-grey">Back</p>
        </div>

        <div className="hidden md:flex items-center justify-between w-full">
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
      <div className="bg-white h-full rounded p-5 hidden md:flex flex-col gap-4">
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath ==
            `/weaver/library/${toTitleCase(api.title, true)}/overview`
              ? "text-primary font-semibold"
              : "text-dark-grey"
          }`}
          // I am going to hard code the route to be pushed to for a brief while!
          onClick={() => {
            router.push(
              `/weaver/library/${toTitleCase(api.title, true)}/overview`
            );
          }}
        >
          <Icon icon="lets-icons:widget-light" className="text-xl" />

          <p>Overview</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath ==
            `/weaver/library/${toTitleCase(api.title, true)}/api_information`
              ? "text-primary font-semibold"
              : "text-dark-grey"
          }`}
          // I am going to hard code the route to be pushed to for a brief while!
          onClick={() => {
            router.push(
              `/weaver/library/${toTitleCase(api.title, true)}/api_information`
            );
          }}
        >
          <Icon
            icon="material-symbols-light:list-alt-outline"
            className="text-xl"
          />

          <p>API Information</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath ==
            `/weaver/library/${toTitleCase(api.title, true)}/consumption_rate`
              ? "text-primary font-semibold"
              : "text-dark-grey"
          }`}
          // I am going to hard code the route to be pushed to for a brief while!
          onClick={() => {
            router.push(
              `/weaver/library/${toTitleCase(api.title, true)}/consumption_rate`
            );
          }}
        >
          <Icon icon="lets-icons:link-alt-light" className="text-xl" />

          <p>Consumption Rate</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath ==
            `/weaver/library/${toTitleCase(api.title, true)}/test`
              ? "text-primary font-semibold"
              : "text-dark-grey"
          }`}
          // I am going to hard code the route to be pushed to for a brief while!
          onClick={() => {
            router.push(`/weaver/library/${toTitleCase(api.title, true)}/test`);
          }}
        >
          <Icon icon="lets-icons:edit-light" className="text-xl" />

          <p>Test</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath ==
            `/weaver/library/${toTitleCase(api.title, true)}/subscriptions`
              ? "text-primary font-semibold"
              : "text-dark-grey"
          }`}
          // I am going to hard code the route to be pushed to for a brief while!
          onClick={() => {
            router.push(
              `/weaver/library/${toTitleCase(api.title, true)}/subscriptions`
            );
          }}
        >
          <Icon
            icon="material-symbols-light:deployed-code-outline-sharp"
            className="text-xl"
          />

          <p>Subscriptions</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath ==
            `/weaver/library/${toTitleCase(api.title, true)}/feedback`
              ? "text-primary font-semibold"
              : "text-dark-grey"
          }`}
          // I am going to hard code the route to be pushed to for a brief while!
          onClick={() => {
            router.push(
              `/weaver/library/${toTitleCase(api.title, true)}/feedback`
            );
          }}
        >
          <Icon icon="solar:library-linear" />

          <p>Feedback</p>
        </div>
      </div>
    </div>
  );
}
