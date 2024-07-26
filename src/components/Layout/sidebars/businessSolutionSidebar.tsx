import { toTitleCase } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { IMockApi } from "@/models/apidiscovery.model";
import { Badge } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
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
import icon3 from "../../../../public/images/api_icons/icon3.png";
import { useApi } from "@/context/ApiDiscoveryContext";

export default function APIProductDetailsSidebar() {
  const router = useRouter();
  const { setSidebar } = useOnboarding();
  const { apiProduct } = useApi();

  useEffect(() => {
    console.log(router.asPath);
  }, [router]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-full flex flex-col h-full gap-2">
      <div className="bg-white w-full rounded p-5 h-fit  flex flex-row items-center md:items-start md:flex-col justify-between md:justify-normal gap-4">
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
                      router.push("/weaver/dashboard");
                      setSidebar("webber");
                    }}
                  >
                    <FaChevronLeft className="text-xs text-dark-grey" />
                    <p className="text-mid-grey">Back</p>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className="w-[10px] h-[10px] rounded bg-mid-grey overflow-hidden">
                        <Image
                          src={icon3}
                          alt="icon"
                          width={200}
                          height={200}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="">
                        <p className="font-semibold truncate">
                          API Product Business Solution
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white h-[72%] rounded p-5 flex flex-col gap-4">
                  <div
                    className={`flex items-center h-fit cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath ==
                      `/admin_back_office/api_product_management`
                        ? "text-primary"
                        : "text-dark-grey"
                    }`}
                    // I am going to hard code the route to be pushed to for a brief while!
                    onClick={() => {
                      router.push(`/admin_back_office/api_product_management`);
                    }}
                  >
                    <Icon icon="lets-icons:widget-light" />

                    <p>Overview</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == `somePath`
                        ? "text-primary"
                        : "text-dark-grey"
                    }`}
                    // onClick={() => {
                    //   router.push(
                    //     `somePath`
                    //   );
                    // }}
                  >
                    <Icon icon="material-symbols-light:list-alt-outline" />

                    <p>API Information</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == `somePath`
                        ? "text-primary"
                        : "text-dark-grey"
                    }`}
                    // onClick={() => {
                    //   router.push(
                    //     `somePath`
                    //   );
                    // }}
                  >
                    <Icon icon="material-symbols-light:deployed-code-outline-sharp" />

                    <p>Subscriptions</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == `somePath`
                        ? "text-primary"
                        : "text-dark-grey"
                    }`}
                  >
                    <Icon icon="solar:library-linear" className="text-sm" />

                    <p>API Manager</p>
                  </div>
                </div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Show>

        <div
          className="hidden md:flex items-center gap-2 cursor-pointer"
          onClick={() => {
            router.push("/weaver/dashboard");
            setSidebar("webber");
          }}
        >
          <FaChevronLeft className="text-xs text-dark-grey" />
          <p className="text-mid-grey">Back</p>
        </div>

        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-[20px] h-[20px] rounded bg-mid-grey overflow-hidden">
              <Image
                src={apiProduct?.img as StaticImageData}
                alt="icon"
                width={200}
                height={200}
                className="w-full h-full"
              />
            </div>
            <div className="">
              <p className="font-semibold text-sm truncate text-ellipsis">
                {apiProduct?.title}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white h-full rounded p-5 hidden md:flex flex-col gap-4">
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath.includes(
              `/admin_back_office/api_product_management/apiProductDetails`
            )
              ? "text-primary"
              : "text-dark-grey"
          }`}
          // I am going to hard code the route to be pushed to for a brief while!
          onClick={() => {
            router.push(
              `/admin_back_office/api_product_management/apiProductDetails-${apiProduct?.title}`
            );
          }}
        >
          <Icon icon="lets-icons:widget-light" className="text-xl" />

          <p>Product Content</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `somePath` ? "text-primary" : "text-dark-grey"
          }`}
          // onClick={() => {
          //   router.push(
          //     `somePath`
          //   );
          // }}
        >
          <Icon
            icon="material-symbols-light:list-alt-outline"
            className="text-xl"
          />

          <p>API Information</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `somePath` ? "text-primary" : "text-dark-grey"
          }`}
          // onClick={() => {
          //   router.push(
          //     `somePath`
          //   );
          // }}
        >
          <Icon
            icon="material-symbols-light:deployed-code-outline-sharp"
            className="text-xl"
          />

          <p>Deploy</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-4 w-full ${
            router.asPath == `somePath` ? "text-primary" : "text-dark-grey"
          }`}
          // onClick={() => {
          //   router.push(
          //     `somePath`
          //   );
          // }}
        >
          <Icon icon="solar:library-linear" />

          <p>API Manager</p>
        </div>
      </div>
    </div>
  );
}