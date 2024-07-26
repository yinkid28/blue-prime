import { useRouter } from "next/router";
import { BsFilePlay, BsSearch } from "react-icons/bs";
import { MdHomeFilled } from "react-icons/md";
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
import Image from "next/image";

export default function WebberSidebar() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-full flex flex-col h-full gap-2">
      <div className="bg-white rounded p-5 h-full flex flex-col gap-4 ">
        <div className="flex justify-between">
          <Image
            src={"/icons/logo.svg"}
            alt="logo"
            width={200}
            height={100}
            className="w-[80%]"
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
                    router.asPath == "/weaver/dashboard"
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
                  <BsFilePlay />
                  <p className="font-semibold">How to Use</p>
                </div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Show>

        <div
          className={`md:flex hidden items-center p-2 hover:bg-gradient-to-r from-white hover:border-l-[2px] border-primary  to-primaryLightest cursor-pointer rounded-lg ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == "/weaver/dashboard"
              ? "text-primary border-l-[2px]  bg-gradient-to-r"
              : "text-dark-grey"
          }`}
        >
          <MdHomeFilled />
          <p className="font-semibold">Home</p>
        </div>
        {/* <div
          className={`md:flex hidden items-center p-2 hover:bg-gradient-to-r from-white hover:border-l-[2px] border-primary  to-primaryLightest cursor-pointer rounded-lg ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == ""
              ? "text-primary border-l-[2px]  bg-gradient-to-r"
              : "text-dark-grey"
          }`}
        >
          <BsSearch />
          <p className="font-semibold">Search</p>
        </div> */}

        {/* <div
          className={`md:flex hidden items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == "" ? "text-primary" : "text-dark-grey"
          }`}
        >
          <BsFilePlay />
          <p className="font-semibold">How to Use</p>
        </div> */}
      </div>
    </div>
  );
}
