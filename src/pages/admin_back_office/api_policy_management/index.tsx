import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import { BreadCrumbs, Button, Table, toTitleCase } from "@/components/utils";
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
import SubscriptionPolicy from "@/components/modals/subscriptionPolicy";

import {
  Hide,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Show,
} from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";

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
    name: string;
    quotaPolicy: string;
    quota: number;
    unitTime: string;
  };
  const apis: apiProductsData[] = [
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

  const applicationPolicies = [
    {
      name: "10k per min",
      quota: 1000,
      unitTime: "1 min",
    },
    {
      name: "12.5k per hour",
      quota: 12500,
      unitTime: "1 min",
    },
    {
      name: "20k per week",
      quota: 20000,
      unitTime: "1 min",
    },
    {
      name: "12k per min",
      quota: 50000,
      unitTime: "1 min",
    },
    {
      name: "50k per hour",
      quota: 30000,
      unitTime: "1 min",
    },
    {
      name: "30k per second",
      quota: 1234567890,
      unitTime: "1 min",
    },
  ];

  const subscriptionPolicies = [
    {
      name: "Gold",
      quotaPolicy: "Request Count",
      quota: 1000,
      unitTime: "1 min",
      rateLimit: "--",
      timeUnit: "--",
    },
    {
      name: "Gold",
      quotaPolicy: "Request Count",
      quota: 1000,
      unitTime: "1 min",
      rateLimit: "--",
      timeUnit: "--",
    },
    {
      name: "Gold",
      quotaPolicy: "Request Count",
      quota: 1000,
      unitTime: "1 min",
      rateLimit: "--",
      timeUnit: "--",
    },
    {
      name: "Gold",
      quotaPolicy: "Request Count",
      quota: 1000,
      unitTime: "1 min",
      rateLimit: "--",
      timeUnit: "--",
    },
    {
      name: "Gold",
      quotaPolicy: "Request Count",
      quota: 1000,
      unitTime: "1 min",
      rateLimit: "--",
      timeUnit: "--",
    },
    {
      name: "Gold",
      quotaPolicy: "Request Count",
      quota: 1000,
      unitTime: "1 min",
      rateLimit: "--",
      timeUnit: "--",
    },
    {
      name: "Gold",
      quotaPolicy: "Request Count",
      quota: 1000,
      unitTime: "1 min",
      rateLimit: "--",
      timeUnit: "--",
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
          {view !== "subscription" && (
            <CreatePolicy isOpen={isOpen} onClose={onClose} />
          )}
          {view === "subscription" && (
            <SubscriptionPolicy isOpen={isOpen} onClose={onClose} />
          )}
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
            <Table>
              <Table.Header>
                <Table.Heading>Name</Table.Heading>
                <Table.Heading>Quota policy</Table.Heading>
                <Table.Heading>Quota</Table.Heading>
                <Table.Heading>Unit time</Table.Heading>
                <Table.Heading>Action</Table.Heading>
              </Table.Header>
              <Table.Body
                data={apis}
                render={(item: apiProductsData, index: number) => (
                  <TableRow key={index} api={item} />
                )}
              />
            </Table>
          </div>
        )}
        {view === "application" && (
          <div className="rounded-lg border overflow-scroll my-5 w-full">
            <Table>
              <Table.Header>
                <Table.Heading>Name</Table.Heading>
                <Table.Heading>Quota policy</Table.Heading>
                <Table.Heading>Unit time</Table.Heading>
                <Table.Heading>Action</Table.Heading>
              </Table.Header>
              <Table.Body
                data={applicationPolicies}
                render={(item: any, index: number) => (
                  <TableRow2 key={index} api={item} />
                )}
              />
            </Table>
          </div>
        )}
        {view === "subscription" && (
          <div className="rounded-lg border overflow-scroll my-5 w-full">
            <Table>
              <Table.Header>
                <Table.Heading>Name</Table.Heading>
                <Table.Heading>Quota policy</Table.Heading>
                <Table.Heading>Quota</Table.Heading>
                <Table.Heading>Unit time</Table.Heading>
                <Table.Heading>Rate Limit</Table.Heading>
                <Table.Heading>Time Unit</Table.Heading>
                <Table.Heading>Action</Table.Heading>
              </Table.Header>
              <Table.Body
                data={subscriptionPolicies}
                render={(item: any, index: number) => (
                  <TableRow3 key={index} api={item} />
                )}
              />
            </Table>
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
        <Menu>
          <MenuButton>
            <CiMenuKebab />
          </MenuButton>
          <MenuList minW="0" w={"100px"}>
            <MenuItem>
              <p>Edit</p>
            </MenuItem>
            <MenuItem>
              <p>Delete</p>
            </MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
}

function TableRow2({ api }: any) {
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
      <td className="px-6 py-4 text-sm border-t">{api.quota}</td>
      <td className="px-6 py-4 text-sm border-t">{api.unitTime}</td>
      <td className="px-6 py-4 text-sm border-t">
        <Menu>
          <MenuButton>
            <CiMenuKebab />
          </MenuButton>
          <MenuList minW="0" w={"100px"}>
            <MenuItem>
              <p>Edit</p>
            </MenuItem>
            <MenuItem>
              <p>Delete</p>
            </MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
}

function TableRow3({ api }: any) {
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
      <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
        <p>{api.quotaPolicy}</p>
      </td>
      <td className="px-6 py-4 text-sm border-t">{api.quota}</td>
      <td className="px-6 py-4 text-sm border-t">{api.unitTime}</td>
      <td className="px-6 py-4 text-sm border-t">{api.rateLimit}</td>
      <td className="px-6 py-4 text-sm border-t">{api.timeUnit}</td>
      <td className="px-6 py-4 text-sm border-t">
        <Menu>
          <MenuButton>
            <CiMenuKebab />
          </MenuButton>
          <MenuList minW="0" w={"100px"}>
            <MenuItem>
              <p>Edit</p>
            </MenuItem>
            <MenuItem>
              <p>Delete</p>
            </MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
}
