import React, { useState } from "react";
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

  const handleLibraryItem = (view: any) => {
    setLibraryView(view);
    setActiveItem(view);
    router.push(`/webber/library/${view}`);
    isOpen && onClose();
  };

  return (
    <>
      <div className="w-full  flex flex-col h-full gap-2">
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
                      onClick={() => router.push("/webber/library")}
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
                          onClick={() => handleLibraryItem("application")}
                          className={`cursor-pointer ${
                            libraryView == "application"
                              ? "text-primary"
                              : "text-dark-grey"
                          }`}
                        >
                          Application
                        </li>
                        <li
                          onClick={() => {
                            setLibraryView("api-product");
                            isOpen && onClose();
                          }}
                          className={`cursor-pointer 
                                  ${
                                    libraryView == "api-product"
                                      ? "text-primary"
                                      : "text-dark-grey"
                                  }`}
                        >
                          API Product
                        </li>
                        <li
                          onClick={() => {
                            bookmarkedAPIs.length === 0
                              ? null
                              : setLibraryView("saved");
                            isOpen && onClose();
                          }}
                          className={`${
                            !(bookmarkedAPIs.length === 0) && "cursor-pointer"
                          }
                                ${
                                  libraryView == "saved"
                                    ? "text-primary"
                                    : "text-dark-grey"
                                }`}
                        >
                          Saved APIs
                        </li>
                        <li
                          onClick={() => {
                            bookmarkedAPIs.length === 0
                              ? null
                              : setLibraryView("Subscribed");
                            isOpen && onClose();
                          }}
                          className={`${
                            !(bookmarkedAPIs.length === 0) && "cursor-pointer"
                          }
                                ${
                                  libraryView == "Subscribed"
                                    ? "text-primary"
                                    : "text-dark-grey"
                                }`}
                        >
                          Subscribed APIs
                        </li>
                        <li>Subscribed</li>
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
            {/* <MdHomeFilled /> */}
            <p className="font-semibold">Discovery</p>
          </div>
       
          {user !== null && (
            <div
              className={`md:flex hidden items-center p-2 hover:bg-gradient-to-r from-white hover:border-l-[2px] border-primary  to-primaryLightest cursor-pointer rounded-lg ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                router.asPath.startsWith("/webber/library")
                  ? "text-primary border-l-[2px]  bg-gradient-to-r"
                  : "text-dark-grey"
              }`}
              onClick={() => router.push("/webber/library")}
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
                onClick={() => handleLibraryItem("application")}
                className={`cursor-pointer ${
                  libraryView == "application"
                    ? "text-primary"
                    : "text-dark-grey"
                }`}
              >
                Application
              </li>
              <li
                onClick={() => setLibraryView("saved")}
                className={`${"cursor-pointer"}
                ${libraryView == "saved" ? "text-primary" : "text-dark-grey"}`}
              >
                Saved APIs
              </li>
              <li
                onClick={() => setLibraryView("Subscribed")}
                className={`${"cursor-pointer"}
                ${
                  libraryView == "Subscribed"
                    ? "text-primary"
                    : "text-dark-grey"
                }`}
              >
                Subscribed APIs
              </li>
              <li
                onClick={() => setLibraryView("api-product")}
                className={`cursor-pointer
                  ${
                    libraryView == "api-product"
                      ? "text-primary"
                      : "text-dark-grey"
                  }`}
              >
                API Product
              </li>
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
