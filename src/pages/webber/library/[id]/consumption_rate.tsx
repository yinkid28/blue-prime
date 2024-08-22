import Navbar from "@/components/Layout/Nav/navbar";
import {
  BreadCrumbItems,
  BreadCrumbs,
  ProgressBar,
  Table,
} from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { Progress } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// remember to use static generation here but for now we will use context to get current api
const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

const breadCrumbs: BreadCrumbItems[] = [
  {
    breadCrumbText: "Library",
    breadCrumbPath: "/webber/library",
  },
];

interface rateTypes {
  [x: string]: any;
  date: string;
  calls: string;
  price: string;
}

export default function ConsumptionRate() {
  const { api } = useApi();
  const { setLoading, setSidebar } = useOnboarding();

  const consumptionRateTableData: rateTypes[] = [
    { date: "12th Jan 2024", calls: (400).toLocaleString(), price: "$2.90" },
    { date: "13th Jan 2024", calls: (300).toLocaleString(), price: "$2.90" },
    { date: "14th Jan 2024", calls: (675).toLocaleString(), price: "$2.90" },
    { date: "15th Jan 2024", calls: (836).toLocaleString(), price: "$2.90" },
    { date: "16th Jan 2024", calls: (1920).toLocaleString(), price: "$2.90" },
    { date: "17th Jan 2024", calls: (895).toLocaleString(), price: "$2.90" },
  ];

  const [searchedText, setSearchedText] = useState<string>("");
  useEffect(() => {
    setLoading(false);
    setSidebar("apiProgressWeaver");
  }, []);

  return (
    <>
      <WeaverLayout>
        <Navbar title={`${api?.name}`} />
        <BreadCrumbs
          breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.name}-Consumption Rate`}
        />
        {/* CONTENT */}
        <div className="mx-4 my-6">
          {/* VIEW CONTROLLERS - I would make the view controllers dummy for now*/}
          <div className="flex gap-2 rounded mb-4">
            <div
              className={`border py-2 px-4 text-sm rounded-lg text-mid-grey cursor-pointer`}
            >
              Application Name 1
            </div>
            <div
              className={`border py-2 px-4 text-sm rounded-lg text-mid-grey cursor-pointer`}
            >
              Application Name 2
            </div>
            <div
              className={`border py-2 px-4 text-sm rounded-lg text-mid-grey cursor-pointer`}
            >
              Application Name 3
            </div>
          </div>
          {/* API TOP CARDS */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <RequestCard title="Price per Request">
              <div className="flex flex-col items-start space-y-2">
                <h3 className="font-semibold">N0.1</h3>
                <p className="text-xs">2,000 Requests/ms</p>
              </div>
            </RequestCard>
            <RequestCard title="Request Calls Count">
              <div className="flex flex-col items-start space-y-2 w-full">
                <ProgressBar
                  trailBg="#F2F2F2"
                  pathBg="gradient-to-r from-[#2548A0] to-[#424CF9]"
                  value="40"
                  height="18px"
                />

                <p className="text-xs">{(18750).toLocaleString()} Requests</p>
              </div>
            </RequestCard>
            <RequestCard title="Average Requests per Day">16500</RequestCard>
            <RequestCard title="Renewal Date">12th Feb 2024</RequestCard>
          </div>

          {/* The search section and the table */}
          {/* SEARCH & FILTER*/}
          <div className="flex justify-between my-4 items-center">
            <div className="flex items-center gap-2 md:gap-4 w-[80%]">
              <div className="text-dark-txt flex gap-1 border px-4 py-3 md:py-2 rounded-lg items-center">
                <Icon icon="lets-icons:filter-big" />
                <p className="hidden md:flex">Jan 2024</p>
              </div>
              <div className="flex items-center border rounded-lg w-[50%] py-2 px-2 sm:px-4 gap-1">
                <Icon
                  icon="lets-icons:search-alt-light"
                  className="text-mid-grey text-2xl"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="font-medium text-sm md:text-base focus:outline-none w-full text-dark-txt"
                  value={searchedText}
                  onChange={(e) => setSearchedText(e.target.value)}
                />
              </div>
            </div>

            <button className="border rounded-xl text-primary py-2 px-[22px] font-semibold text-xs whitespace-nowrap">
              Set Stop Limit
            </button>
          </div>

          {/* TABLE - I had to say goodbye to the search functionality for now. */}
          {/* <div className="rounded-lg border overflow-scroll w-full">
            <table className="min-w-full">
              <thead className="bg-[#f8f8f8] text-mid-grey">
                <tr className="text-left text-sm">
                  <th className="w-1/3 px-6 py-2 whitespace-nowrap">Date</th>
                  <th className="w-1/3 px-6 py-2 whitespace-nowrap">
                    Request Calls
                  </th>
                  <th className="w-1/3 px-6 py-2 whitespace-nowrap">Price</th>
                </tr>
              </thead>
              <tbody>
                {consumptionRateTableData.filter((item) =>
                  searchedText.length > 0
                    ? item.date.includes(searchedText) ||
                      item.calls.includes(searchedText)
                    : item
                ).length > 0 ? (
                  consumptionRateTableData
                    .filter((item) =>
                      searchedText.length > 0
                        ? item.date.includes(searchedText) ||
                          item.calls.includes(searchedText)
                        : item
                    )
                    .map((item, index) => (
                      <TableRow
                        key={index}
                        date={item.date}
                        calls={item.calls}
                        price={item.price}
                      />
                    ))
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
          </div> */}

          <Table>
            <Table.Header>
              <Table.Heading>Date</Table.Heading>
              <Table.Heading>Request Calls</Table.Heading>
              <Table.Heading>Price</Table.Heading>
            </Table.Header>
            <Table.Body
              data={consumptionRateTableData}
              render={(item: rateTypes, index: number) => (
                <TableRow
                  key={index}
                  date={item.date}
                  calls={item.calls}
                  price={item.price}
                />
              )}
            />
          </Table>
        </div>
      </WeaverLayout>
    </>
  );
}
type RequestCardProps = {
  title: string;
  children: React.ReactNode;
};

function RequestCard({ title, children }: RequestCardProps) {
  return (
    <div className="flex flex-col items-start p-4 border rounded-lg gap-4 w-full">
      <h1 className="text-base text-mid-grey font-semibold">{title}</h1>
      <div className="text-dark-txt w-full">{children}</div>
    </div>
  );
}

function TableRow({ date, calls, price }: rateTypes) {
  return (
    <tr className="text-dark-txt">
      <td className="px-6 py-4 text-sm border-t whitespace-nowrap">{date}</td>
      <td className="px-6 py-4 text-sm border-t">{calls}</td>
      <td className="px-6 py-4 text-sm border-t">{price}</td>
    </tr>
  );
}
