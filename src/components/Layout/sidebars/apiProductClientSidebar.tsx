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
export default function ApiProductClientSidebar({ api }: sideBarProps) {
  const router = useRouter();
  const { setSidebar } = useOnboarding();

  useEffect(() => {
    console.log(router.asPath);
  }, [router]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="bg-white rounded p-5 h-full flex flex-col gap-4 ">
      <p className="text-2xl">Logo</p>
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
            <div className="flex items-center gap-2">
              <div className="w-[10px] h-[10px] rounded-full bg-mid-grey overflow-hidden">
                <Image
                  src={api.img}
                  alt="icon"
                  width={200}
                  height={200}
                  className="w-full h-full"
                />
              </div>
              <p className="font-thin text-sm text-dar-grey">Mr Majek Fashek</p>
            </div>
          </div>
        </div>
        <IoBookmarkOutline className="hover:text-primary cursor-pointer" />
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-mid-grey font-thin text-sm">Created 12th Dec 2024</p>

        <div className="bg-light-grey w-fit h-fit px-3 py-1 rounded-full text-sm text-primary">
          {" "}
          <p>Version 1</p>{" "}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-primary text-sm">{api.category}</p>
        <p className="text-sm text-dark-grey">{api.description}</p>
      </div>

      <div className="flex items-center text-xs justify-between">
        <div className="flex items-center gap-1">
          <FaRegEye className=" text-mid-grey" />
          <p className="font-thin text-mid-grey">10k</p>
        </div>
        <div className="flex items-center gap-1">
          <FaRegStar className=" text-mid-grey" />
          <p className="font-thin text-mid-grey">4.0/5</p>
        </div>
        <div className="flex items-center gap-1">
          <FaRegClock className=" text-mid-grey" />
          <p className="font-thin text-mid-grey">100ms</p>
        </div>
      </div>
      <div className="w-full bg-light-grey rounded p-3 flex flex-col gap-2">
        <p className="font-semibold text-sm">Price per Request</p>
        <div className="flex w-full items-center justify-between">
          <p className="font-bold">N 0.01</p>
          <p className="text-xs text-mid-grey">2,000 Requests/ms</p>
        </div>
      </div>
      <button className="w-full p-2 border border-primary rounded-lg text-primary">
        Subscribe to Full Product
      </button>
    </div>
  );
}
