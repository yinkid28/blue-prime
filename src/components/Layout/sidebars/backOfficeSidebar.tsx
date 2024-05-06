import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import React from "react";

export default function BackOfficeSidebar() {
  const router = useRouter();
  return (
    // <p>Hey, there</p>
    <div className="w-full h-full rounded bg-white text-dark-txt p-6">
      <div className="flex flex-col gap-6">
        <p className="text-2xl font-semibold mt-2">Logo</p>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `somePath` ? "text-primary" : "text-dark-grey"
          }`}
        >
          <Icon icon="lets-icons:widget-light" className="text-xl" />

          <p>Overview</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `somePath` ? "text-primary" : "text-dark-grey"
          }`}
        >
          <Icon icon="lets-icons:widget-alt-light" className="text-xl" />

          <p>Category Management</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `somePath` ? "text-primary" : "text-dark-grey"
          }`}
        >
          <Icon icon="material-symbols-light:deployed-code-outline-sharp" />

          <p>API Management</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `somePath` ? "text-primary" : "text-dark-grey"
          }`}
        >
          <Icon icon="carbon:api-1" className="text-xl" />

          <p>API Product Management</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `somePath` ? "text-primary" : "text-dark-grey"
          }`}
        >
          <Icon icon="solar:users-group-rounded-broken" className="text-xl" />

          <p>User Management</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `somePath` ? "text-primary" : "text-dark-grey"
          }`}
        >
          <Icon icon="fluent:learning-app-20-regular" className="text-xl" />

          <p>Tutorial Management</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == `somePath` ? "text-primary" : "text-dark-grey"
          }`}
        >
          <Icon icon="lets-icons:file-dock-search-light" />

          <p>Audit Trial</p>
        </div>
      </div>
    </div>
  );
}
