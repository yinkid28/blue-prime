import Navbar from "@/components/Layout/Nav/navbar";
import { toTitleCase } from "@/components/utils";
import { BreadCrumbs } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";

// remember to use static generation here but for now we will use context to get current api
const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

type TableRowProps = {
  name: string;
  version: string;
  approvedStatus: string;
};

export default function Deploy() {
  const { api } = useApi();
  const router = useRouter();
  const { loading, setLoading } = useOnboarding();
  useEffect(() => {
    setLoading(false);
  }, []);

  const deployTableData = [
    { name: "Text Generator", version: "V1", approvedStatus: "Approved" },
    { name: "Text Generator", version: "V1", approvedStatus: "Denied" },
  ];

  return (
    <>
      <WebberLayout>
        <Navbar title={`${api?.title}`} />
        <BreadCrumbs
          // breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.title}-Deploy`}
        />
        <div className="flex flex-col-reverse md:flex-row md:justify-between p-5 h-[80dvh] md:h-fit -translate-y-60 md:-translate-y-0">
          <div className="rounded-lg border overflow-scroll w-full md:w-[75%] gap-2">
            <table className="w-full ">
              <thead className="bg-[#f8f8f8] text-mid-grey rounded-lg">
                <tr className="text-left text-sm">
                  <th className="w-1/4 px-6 py-2">Name</th>
                  <th className="w-1/4 px-6 py-2">Version</th>
                  <th className="w-1/4 px-6 py-2 whitespace-nowrap">
                    Approved Status
                  </th>
                  <th className="w-[5%] px-6 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {deployTableData.map((data, index) => (
                  <TableRow
                    key={index}
                    name={data.name}
                    version={data.version}
                    approvedStatus={data.approvedStatus}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full md:w-[25%] flex justify-end mb-3 md:mb-0">
            <button
              className="flex gap-2 items-center rounded-lg text-primary h-fit border-2 w-[25%] md:w-[80%] border-light-grey py-2 justify-center"
              onClick={() => {
                router.push(
                  `/webber/api_details/${toTitleCase(
                    api?.title as string,
                    true
                  )}/publish`
                );
              }}
            >
              <p className="text-sm font-semibold tracking-normal">Deploy</p>
            </button>
          </div>
        </div>
      </WebberLayout>
    </>
  );
}

// creating the table component in here for now!
function TableRow({ name, version, approvedStatus }: TableRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm border-t whitespace-nowrap sm:whitespace-pre-wrap">
        {name}
      </td>
      <td className="px-6 py-4 text-sm border-t">{version}</td>
      <td className="px-6 py-4 text-sm border-t items-center">
        <p
          className={`rounded-full w-fit px-3  whitespace-nowrap
              ${approvedStatus === "Approved" && "bg-[#F0FFEB] text-[#298413]"}
              ${approvedStatus === "Denied" && " bg-[#ffe9e9] text-[#f13636]"}
              `}
        >
          {approvedStatus}
        </p>
      </td>
      <td className="px-6 py-4 text-sm border-t">
        <Menu>
          <MenuButton>
            <CiMenuKebab />
          </MenuButton>
          <MenuList minW="0" w={"128px"} className="space-y-3 text-sm">
            <MenuItem>Undeploy</MenuItem>
            <MenuItem>Publish</MenuItem>
            <MenuItem>Restore</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
}
