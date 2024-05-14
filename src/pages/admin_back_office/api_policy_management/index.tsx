import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import { BreadCrumbs, Button, toTitleCase } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { FaEllipsisV, FaRegClock, FaRegEye, FaRegStar } from "react-icons/fa";
import { useRouter } from "next/router";

import icon1 from "../../../../public/images/api_icons/icon1.jpg";
import icon2 from "../../../../public/images/api_icons/icon2.png";
import icon3 from "../../../../public/images/api_icons/icon3.png";
import { useDisclosure } from "@chakra-ui/react";
import ImportAPi from "@/components/modals/importApi";
import AddAPi from "@/components/modals/addApi";
import CreatePolicy from "@/components/modals/createPolicy";

const AdminLayout = dynamic(() => import("@/components/Layout/adminLayout"), {
  ssr: false,
});
export default function ApiPolicyManager() {
  const router = useRouter();
  const { setSidebar, loading, setLoading, setApiErrorMessage } =
    useOnboarding();
  const [searchedText, setSearchedText] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [view, setView] = useState<string>("advanced");
  useEffect(() => {
    setSidebar("backOffice");
    setLoading(false);
  }, []);

  type apiProductsData = {
    img: StaticImageData;
    title: string;
    description: string;
    category: string;
  };

  const apis = [
    {
      name: "10k per min",
      quotaPolicy: "Request Count",
      quota: 10000,
      unitTime: "1 min",
    },
    {
      name: "10k per min",
      quotaPolicy: "Request Count",
      quota: 10000,
      unitTime: "1 min",
    },
    {
      name: "10k per min",
      quotaPolicy: "Request Count",
      quota: 10000,
      unitTime: "1 min",
    },
    {
      name: "10k per min",
      quotaPolicy: "Request Count",
      quota: 10000,
      unitTime: "1 min",
    },
  ];

  return (
    <AdminLayout>
      <AdminNavbar title="API Product Management" />
      <BreadCrumbs breadCrumbActiveItem="API Product Management" />

      <div className="p-5">
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <div
              className={`px-4 py-2 border ${
                view === "advanced"
                  ? "border-primary text-primary"
                  : "text-mid-grey"
              }  rounded-lg cursor-pointer`}
              onClick={() => setView("advanced")}
            >
              <p>Advanced Policies</p>
            </div>
            <div
              className={`px-4 py-2 border ${
                view === "application"
                  ? "border-primary text-primary"
                  : "text-mid-grey"
              }  rounded-lg cursor-pointer`}
              onClick={() => setView("application")}
            >
              <p>Application Policies</p>
            </div>
            <div
              className={`px-4 py-2 border ${
                view === "subscription"
                  ? "border-primary text-primary"
                  : "text-mid-grey"
              }  rounded-lg cursor-pointer`}
              onClick={() => setView("subscription")}
            >
              <p>Subscription Policies</p>
            </div>
          </div>

          <Button
            type="fit"
            text={
              view === "advanced"
                ? "Add New Advanced Policy"
                : view === "application"
                ? "Add New Application Policy"
                : "Add New Subscription Policy"
            }
            onClick={() => {
              //   if (view === "advanced") {
              //     router.push(
              //       "/admin_back_office/api_product_management/new_api_product"
              //     );
              //   } else {
              //     onOpen();
              //   }

              onOpen();
            }}
          />
          {/* <ImportAPi isOpen={isOpen} onClose={onClose} /> */}
          <CreatePolicy isOpen={isOpen} onClose={onClose} />
        </div>

        <div className="flex justify-between my-6">
          <div className="flex items-center border rounded-lg w-[50%] py-2 px-2 sm:px-4 gap-1">
            <Icon
              icon="lets-icons:search-alt-light"
              className="text-mid-grey text-2xl"
            />
            <input
              type="search"
              placeholder="Search"
              className="font-medium text-sm md:text-base focus:outline-none w-full text-dark-txt"
            />
          </div>

          <div className="flex border p-2 rounded-lg items-center gap-2">
            <Icon icon="lets-icons:filter-big" className="text-mid-grey" />
            <p>Filter</p>
          </div>
        </div>
        {view === "advanced" && (
          <div className="rounded-lg border overflow-scroll my-5 w-full">
            <table className="min-w-full">
              <thead className="bg-[#f8f8f8] text-mid-grey">
                <tr className="text-left text-sm">
                  <th className="w-1/3 px-6 py-2 whitespace-nowrap">NAME</th>
                  <th className="w-1/3 px-6 py-2 whitespace-nowrap">
                    QUOTA POLICY
                  </th>
                  <th className="w-1/3 px-6 py-2 whitespace-nowrap">QUOTA</th>
                  <th className="w-1/3 px-6 py-2 whitespace-nowrap">
                    UNIT TIME
                  </th>
                  <th className="w-1/3 px-6 py-2 whitespace-nowrap">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {apis.filter((item) =>
                  searchedText.length > 0
                    ? item.name.includes(searchedText)
                    : item
                ).length > 0 ? (
                  apis
                    .filter((item) =>
                      searchedText.length > 0
                        ? item.name.includes(searchedText)
                        : item
                    )
                    .map((item, index) => <TableRow key={index} api={item} />)
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-dark-txt">
                      &quot;{searchedText}&quot; doesn&apos;t match any
                      consumption rate!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function TableRow({ api }: any) {
  const router = useRouter();

  return (
    <tr
      className="text-dark-txt hover:bg-light-grey cursor-pointer"
      onClick={() => {
        // router.push(
        //   `/admin_back_office/api_management/${toTitleCase(
        //     api.title,
        //     true
        //   )}/overview`
        // );
      }}
    >
      <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
        <p>{api.name}</p>
      </td>

      <td className="px-6 py-4 text-sm border-t">
        <p className="">{api.quotaPolicy}</p>
      </td>
      <td className="px-6 py-4 text-sm border-t">{api.quota}</td>
      <td className="px-6 py-4 text-sm border-t">{api.unitTime}</td>
      <td className="px-6 py-4 text-sm border-t">
        <FaEllipsisV />
      </td>
    </tr>
  );
}
