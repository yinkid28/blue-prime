import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BsFilePlay, BsSearch } from "react-icons/bs";
import { MdFolder, MdHomeFilled, MdPhoneAndroid } from "react-icons/md";
import { FiFolder } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Show,
} from "@chakra-ui/react";
import { FaFolder } from "react-icons/fa";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function MainSidebar() {
  const router = useRouter();
  const cats = [
    { name: "Entertainment" },
    { name: "Gaming" },
    { name: "Banking and Finance" },
    { name: "E-Commerce" },
    { name: "Sports" },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bookmarkedAPIs, libraryView, setLibraryView } = useApi();
  const { user } = useOnboarding();
  const [activeItem, setActiveItem] = useState("saved");

  const apiCode = router.query.apiCode as string;

  useEffect(() => {
    if (!libraryView) {
      setLibraryView("saved");
    }
  }, []);

  const handleLibraryItem = (view: any) => {
    setLibraryView(view);
    setActiveItem(view);
    // router.push(`/webber/library/${view}`);
    // only application should navigate for now
    switch (view) {
      case "application":
        router.push(`/webber/library/${view}`);
        break;
      case "saved":
        router.push(`/webber/library`);
        break;
      default:
        break;
    }

    isOpen && onClose();
  };

  
  const getTextColor = (itemView: any) => {
    if ( itemView === "saved") {
      return "text-primary";
    }
    return libraryView === itemView ? "text-primary" : "text-dark-grey";
  };

  return (
    <>
      <div className="w-full flex flex-col h-full gap-2">
        <div className="bg-white rounded p-2 h-fit flex flex-col gap-4 ">
          <div className="flex justify-center items-center">
            <Image
              src={"/icons/logo.svg"}
              alt="logo"
              width={200}
              height={100}
              className="w-[60%] "
            />
            <IoMenu
              size={23}
              onClick={isOpen ? onClose : onOpen}
              className="flex md:hidden cursor-pointer z-[1600]"
            />
          </div>

          <Show breakpoint="(max-width: 768px)">
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerBody className="space-y-4 mt-16">
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == "/api_discovery"
                        ? "text-primary"
                        : "text-dark-grey"
                    }`}
                    onClick={() => router.push("/api_discovery")}
                  >
                    <MdHomeFilled />
                    <p className="font-semibold">Home</p>
                  </div>
                  {user !== null && (
                    <div
                      className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                        router.asPath.startsWith("/webber/library")
                          ? "text-primary"
                          : "text-dark-grey"
                      }`}
                      onClick={() => {
                        router.push("/webber/library");
                        setLibraryView("saved");
                      }}
                    >
                      <MdFolder size={18} />
                      <p className="font-semibold">Library</p>
                    </div>
                  )}
                  {router.asPath.startsWith("/webber/library") ? (
                    <div className="bg-white h-full pt-6 rounded flex flex-col gap-4">
                      <p className="text-base text-mid-grey font-bold">
                        Library
                      </p>
                      <ul className="space-y-3 text-dark-grey">
                        <li
                          onClick={() => handleLibraryItem("api-product")}
                          className={`cursor-pointer ${getTextColor(
                            "api-product"
                          )}`}
                        >
                          API Product
                        </li>
                        <li
                          onClick={() => handleLibraryItem("application")}
                          className={`cursor-pointer ${getTextColor(
                            "application"
                          )}`}
                        >
                          Application
                        </li>
                        <li
                          onClick={() => handleLibraryItem("saved")}
                          className={`cursor-pointer ${getTextColor("saved")}`}
                        >
                          Saved APIs
                        </li>
                        <li
                          onClick={() => handleLibraryItem("Subscribed")}
                          className={`cursor-pointer ${getTextColor(
                            "Subscribed"
                          )}`}
                        >
                          Subscribed APIs
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="pt-6 h-full rounded flex flex-col gap-4">
                      <p className="text-2xl text-mid-grey font-bold">
                        Categories
                      </p>
                      {cats?.map((cat, index) => (
                        <p
                          className="text-dark-grey cursor-pointer"
                          key={index}
                        >
                          {cat.name}
                        </p>
                      ))}
                    </div>
                  )}
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Show>

          <div
            className={`md:flex hidden items-center p-2 hover:bg-gradient-to-r from-white hover:border-l-[2px] border-primary  to-primaryLightest cursor-pointer rounded-[8px] ease-in-out duration-700 hover:text-primary gap-3 w-full ${
              router.asPath == "/api_discovery"
                ? "text-primary border-l-[2px]  bg-gradient-to-r "
                : "text-dark-grey"
            }`}
            onClick={() => router.push("/api_discovery")}
          >
            <p className="font-semibold">Discovery</p>
          </div>

          {user !== null && (
            <div
              className={`md:flex hidden items-center p-2 hover:bg-gradient-to-r from-white hover:border-l-[2px] border-primary  to-primaryLightest cursor-pointer rounded-lg ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                router.asPath.startsWith("/webber/library")
                  ? "text-primary border-l-[2px]  bg-gradient-to-r"
                  : "text-dark-grey"
              }`}
              onClick={() => {
                router.push("/webber/library");
                setLibraryView("saved");
              }}
            >
              <MdFolder size={18} />
              <p className="font-semibold">Library</p>
            </div>
          )}
        </div>

        {router.asPath.startsWith("/webber/library") ? (
          <div className="bg-white h-full rounded p-5 md:flex hidden flex-col gap-4">
            <p className="text-base text-mid-grey font-bold">Library</p>
            <ul className="space-y-3 text-sm px-3 font-semibold text-dark-grey">
              <li
                onClick={() => handleLibraryItem("saved")}
                className={`cursor-pointer ${getTextColor("saved")}`}
              >
                Saved APIs
              </li>
              <li
                onClick={() => handleLibraryItem("application")}
                className={`cursor-pointer ${getTextColor("application")}`}
              >
                Application
              </li>
              <li
                onClick={() => handleLibraryItem("Subscribed")}
                className={`cursor-pointer ${getTextColor("Subscribed")}`}
              >
                Subscribed APIs
              </li>
              {/* <li
                onClick={() => handleLibraryItem("api-product")}
                className={`cursor-pointer ${getTextColor("api-product")}`}
              >
                API Product
              </li> */}
            </ul>
          </div>
        ) : (
          <div className="bg-white h-full rounded p-5 md:flex hidden flex-col gap-4">
            <p className="text-[18px] text-mid-grey font-bold">Categories</p>
            {cats?.map((cat, index) => (
              <p className="text-dark-grey p-2 cursor-pointer" key={index}>
                {cat.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}













