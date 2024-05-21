import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Show,
} from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";

export default function BackOfficeSidebar() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    // <p>Hey, there</p>
    <div className="w-full h-full rounded text-[14px] bg-white text-dark-txt p-5 md:p-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold md:mt-2">Logo</p>
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
              <DrawerBody className=" mt-20 pt-6 p-2">
                <div className="rounded p-4 bg-white space-y-7">
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == `somePath`
                        ? "text-primary font-semibold"
                        : "text-dark-grey"
                    }`}
                  >
                    <Icon icon="lets-icons:widget-light" className="text-xl" />

                    <p>Overview</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == `/admin_back_office/category_management`
                        ? "text-primary font-semibold"
                        : "text-dark-grey"
                    }`}
                    onClick={() => {
                      router.push("/admin_back_office/category_management");
                    }}
                  >
                    <Icon
                      icon="lets-icons:widget-alt-light"
                      className="text-2xl"
                    />

                    <p>Category Management</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == `/admin_back_office/api_management`
                        ? "text-primary font-semibold"
                        : "text-dark-grey"
                    }`}
                    onClick={() =>
                      router.push("/admin_back_office/api_management")
                    }
                  >
                    <Icon
                      icon="material-symbols-light:deployed-code-outline-sharp"
                      className="text-xl"
                    />

                    <p>API Management</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath ==
                      `/admin_back_office/api_product_management`
                        ? "text-primary font-semibold"
                        : "text-dark-grey"
                    }`}
                    onClick={() =>
                      router.push("/admin_back_office/api_product_management")
                    }
                  >
                    <Icon icon="carbon:api-1" className="text-xl" />

                    <p>API Product Management</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == `somePath`
                        ? "text-primary font-semibold"
                        : "text-dark-grey"
                    }`}
                  >
                    <Icon
                      icon="solar:users-group-rounded-broken"
                      className="text-xl"
                    />

                    <p>User Management</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == `somePath`
                        ? "text-primary font-semibold"
                        : "text-dark-grey"
                    }`}
                  >
                    <Icon
                      icon="fluent:learning-app-20-regular"
                      className="text-xl"
                    />

                    <p>Tutorial Management</p>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
                      router.asPath == `somePath`
                        ? "text-primary font-semibold"
                        : "text-dark-grey"
                    }`}
                  >
                    <Icon
                      icon="lets-icons:file-dock-search-light"
                      className="text-xl"
                    />

                    <p>Audit Trial</p>
                  </div>
                </div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Show>

        <div
          className={`md:flex hidden items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `somePath`
              ? "text-primary font-semibold"
              : "text-dark-grey"
          }`}
        >
          <Icon icon="lets-icons:widget-light" className="text-xl" />

          <p>Overview</p>
        </div>
        <div
          className={`md:flex hidden items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `/admin_back_office/category_management`
              ? "text-primary font-semibold"
              : "text-dark-grey"
          }`}
          onClick={() => {
            router.push("/admin_back_office/category_management");
          }}
        >
          <Icon icon="lets-icons:widget-alt-light" className="text-2xl" />

          <p>Category Management</p>
        </div>
        <div
          className={`md:flex hidden items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `/admin_back_office/api_management`
              ? "text-primary font-semibold"
              : "text-dark-grey"
          }`}
          onClick={() => router.push("/admin_back_office/api_management")}
        >
          <Icon
            icon="material-symbols-light:deployed-code-outline-sharp"
            className="text-xl"
          />

          <p>API Management</p>
        </div>
        <div
          className={`md:flex hidden items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `/admin_back_office/api_product_management`
              ? "text-primary font-semibold"
              : "text-dark-grey"
          }`}
          onClick={() =>
            router.push("/admin_back_office/api_product_management")
          }
        >
          <Icon icon="carbon:api-1" className="text-xl" />

          <p>API Product Management</p>
        </div>
        <div
          className={`md:flex hidden items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `/admin_back_office/api_policy_management`
              ? "text-primary font-semibold"
              : "text-dark-grey"
          }`}
          onClick={() =>
            router.push("/admin_back_office/api_policy_management")
          }
        >
          <Icon icon="lets-icons:filter-big" className="text-xl" />

          <p>API Policy Management</p>
        </div>
        <div
          className={`hidden md:flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `/admin_back_office/user_management`
              ? "text-primary"
              : "text-dark-grey"
          }`}
          onClick={() => router.push("/admin_back_office/user_management")}
        >
          <Icon icon="solar:users-group-rounded-broken" className="text-xl" />

          <p>User Management</p>
        </div>
        <div
          className={`md:flex hidden items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `somePath`
              ? "text-primary font-semibold"
              : "text-dark-grey"
          }`}
        >
          <Icon icon="fluent:learning-app-20-regular" className="text-xl" />

          <p>Tutorial Management</p>
        </div>
        <div
          className={`md:flex hidden items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `somePath`
              ? "text-primary font-semibold"
              : "text-dark-grey"
          }`}
        >
          <Icon icon="lets-icons:file-dock-search-light" className="text-xl" />

          <p>Audit Trial</p>
        </div>
      </div>
    </div>
  );
}
