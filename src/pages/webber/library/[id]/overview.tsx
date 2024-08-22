import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbItems, BreadCrumbs, Table } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { UseToastOptions, useToast } from "@chakra-ui/react";
import { getFormattedDate } from "@/helper_utils/helpers";
import APIServices from "@/services/api_services/api_service";

// remember to use static generation here but for now we will use context to get current api
const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

type TableRowProps = {
  name: string;
  calls: string;
  status: string;
  renewDate: string;
};

const toastProps: UseToastOptions = {
  description: "successfully copied",
  status: "success",
  isClosable: true,
  duration: 800,
  position: "bottom-right",
};

export default function ApiOverview() {
  const toast = useToast();
  const { api, setApi } = useApi();
  const router = useRouter();
  const { id } = router.query;
  const { loading, setLoading, setSidebar, setApiErrorMessage } =
    useOnboarding();
  const [copied, setCopied] = useState<boolean>(false);
  useEffect(() => {
    setLoading(false);
    setSidebar("apiProgressWeaver");
  }, []);
  useEffect(() => {
    if (id) {
      getApi(id as string);
    }
  }, [id]);
  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Library",
      breadCrumbPath: "/webber/library",
    },
  ];

  const weaverOverviewTableData = [
    {
      name: "Parse Generator",
      calls: "60000".toLocaleString(),
      status: "Paid",
      renewDate: "27th Feb, 2024",
    },
    {
      name: "Parse Generator",
      calls: "20000".toLocaleString(),
      status: "Failed",
      renewDate: "29th Feb, 2024",
    },
    {
      name: "Parse Generator",
      calls: "26865".toLocaleString(),
      status: "Awaiting Renewal",
      renewDate: "15th Apr, 2024",
    },
  ];
  const getApi = async (aco: string) => {
    try {
      const res = await APIServices.getSingleApiDev(aco);
      console.log(res);
      if (res.statusCode === 200) {
        setApi(res.data);
        // setSandBoxurl(res.data.endpointConfig.sandbox_endpoints.url);
        // setProdurl(res.data.endpointConfig.production_endpoints.url);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };

  function handleCopied() {
    navigator.clipboard
      .writeText("http://www.codehow.com/specs")
      .then(() => {
        setCopied(true);
        toast({ ...toastProps });
        setTimeout(() => setCopied(false), 800);
      })
      .catch((err) => {
        console.error("Error copying text to clipboard");
      });
  }

  return (
    <>
      <WeaverLayout>
        <Navbar title={`${api?.name}`} />
        {/* Fix the breadcrumbs before commiting. Use the commented code in api_manager.tsx as a guide */}
        <BreadCrumbs
          breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.name}-Overview`}
        />
        <div className="border rounded-xl p-4 mx-4 my-6 min-h-[80dvh]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:gap-0 gap-6">
            <div className="flex items-center gap-3 h-[63px]">
              <Image
                src={"/images/api_icons/apiMock.webp"}
                alt="icon"
                width={63}
                height={63}
              />
              <div className="flex">
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm font-semibold">{api?.name}</h1>
                  <p className="text-xs text-blue-dark font-semibold">
                    {api?.monetizationLabel}
                  </p>
                  <div className="flex gap-[20%] sm:gap-20 items-center">
                    <p className="text-xs text-dark-grey whitespace-nowrap">
                      {/* Created: {getFormattedDate(api?.createdTime)} */}
                    </p>
                    <p className="bg-dark-grey-fade whitespace-nowrap text-xs text-blue-dark rounded-full px-2 py-[1.5px]">
                      Version {api?.version}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:gap-6 lg:items-end">
              <div className="flex flex-col items-start sm:flex-row gap-[10px] sm:items-center whitespace-nowrap">
                <p>Base URL</p>
                <div className="flex items-center gap-2">
                  <div className="text-primary">
                    {api?.endpointConfig?.production_endpoints?.url
                      ? api?.endpointConfig?.production_endpoints?.url
                      : api?.endpointConfig?.sandbox_endpoints?.url
                      ? api?.endpointConfig?.sandbox_endpoints?.url
                      : ""}
                  </div>
                  <div onClick={handleCopied} className="cursor-pointer">
                    {copied ? (
                      <Icon icon="mdi-light:check" />
                    ) : (
                      <Icon
                        className="text-[#A4AAB2]"
                        icon="ion:copy-outline"
                      />
                    )}
                  </div>
                </div>
              </div>
              <button className="border border-primaryFade text-sm py-2 px-[22px] rounded-lg font-semibold text-primary w-fit">
                Add New App
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-[#f8f8f8] rounded-lg sm:max-w-[50%] lg:max-w-[30%] p-4 my-6">
            <h3 className=" ">Price per Request</h3>
            <div className="flex justify-between text-dark-grey">
              <p className="text-sm font-semibold">N 0.01</p>
              <p className="text-[10px] font-normal">
                {api?.policies[0]} Requests/ms
              </p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-mid-grey font-semibold">Subscriptions</h3>
            <Table>
              <Table.Header>
                <th className="w-1/5 px-6 py-2 whitespace-nowrap">
                  Application Name
                </th>
                <th className="w-1/5 px-6 py-2 whitespace-nowrap">
                  Request Calls
                </th>
                <th className="w-1/5 px-6 py-2">Status</th>
                <th className="w-1/5 px-6 py-2 whitespace-nowrap">
                  Subscription Renewal Date
                </th>
                <th className="w-[5%] px-6 py-2">Actions</th>
              </Table.Header>
              <Table.Body
                data={weaverOverviewTableData}
                render={(
                  data: TableRowProps,
                  index: Key | null | undefined
                ) => (
                  <TableRow
                    name={data.name}
                    calls={data.calls}
                    status={data.status}
                    renewDate={data.renewDate}
                    key={index}
                  />
                )}
              />
            </Table>
          </div>
        </div>
      </WeaverLayout>
    </>
  );
}

function TableRow({ name, calls, status, renewDate }: TableRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm border-t whitespace-nowrap">{name}</td>
      <td className="px-6 py-4 text-sm border-t">{calls}</td>
      <td className="px-6 py-4 text-sm border-t items-center">
        <p
          className={`rounded-full w-fit px-3  whitespace-nowrap
            ${status === "Paid" && "bg-[#F0FFEB] text-[#298413]"}
            ${status === "Awaiting Renewal" && " bg-[#fffecf] text-[#97930b]"}
            ${status === "Failed" && " bg-[#ffe9e9] text-[#f13636]"}
            `}
        >
          {status}
        </p>
      </td>
      <td className="px-6 py-4 text-sm border-t">{renewDate}</td>
      <td className="px-6 py-4 text-sm border-t">
        <Menu>
          <MenuButton>
            <CiMenuKebab />
          </MenuButton>
          <MenuList minW="0" w={"100px"} minH={"0"} h={"70px"}>
            <MenuItem>
              <p>Block</p>
            </MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
}
