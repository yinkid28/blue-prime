import { useOnboarding } from "@/context/OnboardingContext";
import { IApi } from "@/models/api.model";
import { IMockApi } from "@/models/apidiscovery.model";
import { Badge } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaChevronLeft, FaRegClock, FaRegEye, FaRegStar } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdHomeFilled } from "react-icons/md";

type sideBarProps = {
  api: IApi;
};
export default function ApiProductSidebar({ api }: sideBarProps) {
  const router = useRouter();
  const { setSidebar } = useOnboarding();
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
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="w-[50px] h-[50px] rounded bg-mid-grey overflow-hidden">
            <Image
              src={"/images/api_icons/apiMock.webp"}
              alt="icon"
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
          <div className="">
            <p className="font-semibold">{api.name}</p>
            <div className="flex items-center gap-2">
              <div className="w-[10px] h-[10px] rounded-full bg-mid-grey overflow-hidden">
                <Image
                  src={"/images/api_icons/apiMock.webp"}
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
        <p className="font-semibold text-primary text-sm">
          {api.categories.length > 0 ? api.categories[0] : "API"}
        </p>
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
    </div>
  );
}
