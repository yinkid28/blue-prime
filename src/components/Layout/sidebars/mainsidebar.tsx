import React, { useState } from "react";
import { useRouter } from "next/router";
import { BsFilePlay, BsSearch } from "react-icons/bs";
import { MdFolder, MdHomeFilled } from "react-icons/md";
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

export default function MainSidebar() {
  const router = useRouter();
  const cats = [
    { name: "Entertainment" },
    { name: "Gaming" },
    { name: "Banking and Finance" },
    { name: " e" },
    { name: "E-Commerce" },
    { name: "Sports" },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* <div className="w-full  flex flex-col h-full> - This was how I met it*/}
      <div className="w-full  flex flex-col h-full gap-2">
        <div className="bg-white rounded p-5 h-fit flex flex-col gap-4 ">
          <div className="flex justify-between">
            <p className="text-2xl">Logo</p>
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
                {/* <DrawerHeader borderBottomWidth="1px"></DrawerHeader> */}
                <DrawerBody className="space-y-4 mt-16">
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == "/api_discovery"
                        ? "text-primary"
                        : "text-dark-grey"
                    }`}
                  >
                    <MdHomeFilled />
                    <p className="font-semibold">Home</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == "" ? "text-primary" : "text-dark-grey"
                    }`}
                  >
                    <BsSearch />
                    <p className="font-semibold">Search</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == "" ? "text-primary" : "text-dark-grey"
                    }`}
                  >
                    <FiFolder />
                    <p className="font-semibold">Library</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == "" ? "text-primary" : "text-dark-grey"
                    }`}
                  >
                    <BsFilePlay />
                    <p className="font-semibold">How to Use</p>
                  </div>
                  <div className="pt-6 h-full rounded flex flex-col gap-4">
                    <p className="text-2xl text-mid-grey font-bold">
                      Categories
                    </p>
                    {cats?.map((cat, index) => (
                      <p className="text-dark-grey cursor-pointer" key={index}>
                        {cat.name}
                      </p>
                    ))}
                  </div>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Show>

          <div
            className={`md:flex hidden items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
              router.asPath == "/api_discovery"
                ? "text-primary"
                : "text-dark-grey"
            }`}
            onClick={() => router.push("/api_discovery")}
          >
            <MdHomeFilled />
            <p className="font-semibold">Home</p>
          </div>
          <div
            className={`md:flex hidden items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
              router.asPath == "" ? "text-primary" : "text-dark-grey"
            }`}
          >
            <BsSearch />
            <p className="font-semibold">Search</p>
          </div>
          <div
            className={`md:flex hidden items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
              router.asPath == "/api_discovery/library"
                ? "text-primary"
                : "text-dark-grey"
            }`}
            onClick={() => router.push("/api_discovery/library")}
          >
            {router.asPath == "/api_discovery/library" ? (
              <MdFolder size={18} />
            ) : (
              <FiFolder />
            )}
            <p className="font-semibold">Library</p>
          </div>
          <div
            className={`md:flex hidden items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
              router.asPath == "" ? "text-primary" : "text-dark-grey"
            }`}
          >
            <BsFilePlay />
            <p className="font-semibold">How to Use</p>
          </div>
        </div>

        {router.asPath == "/api_discovery/library" ? (
          <div className="bg-white h-full rounded p-5 md:flex hidden flex-col gap-4">
            <p className="text-base text-mid-grey font-bold">Library</p>
            {/* Since it is not much, may not abstract it into an array */}
            <ul className="space-y-3 text-dark-grey">
              <li>API Product</li>
              <li>Saved </li>
              <li>Subscribed</li>
            </ul>
          </div>
        ) : (
          <div className="bg-white h-full rounded p-5 md:flex hidden flex-col gap-4">
            <p className="text-2xl text-mid-grey font-bold">Categories</p>
            {cats?.map((cat, index) => (
              <p className="text-dark-grey cursor-pointer" key={index}>
                {cat.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
