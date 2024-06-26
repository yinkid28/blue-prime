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

export default function WebberSidebar() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-full flex flex-col h-full gap-2">
      <div className="bg-white rounded p-5 h-full flex flex-col gap-4 ">
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
          className={`md:flex hidden items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == "/weaver/dashboard"
              ? "text-primary"
              : "text-dark-grey"
          }`}
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
            router.asPath == "" ? "text-primary" : "text-dark-grey"
          }`}
        >
          <BsFilePlay />
          <p className="font-semibold">How to Use</p>
        </div>
      </div>
    </div>
  );
}
