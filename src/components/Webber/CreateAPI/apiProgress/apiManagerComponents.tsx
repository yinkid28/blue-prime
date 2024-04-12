import React from "react";
import { HiOutlineStar } from "react-icons/hi";
import { CiMenuKebab } from "react-icons/ci";
import { Icon } from "@iconify/react";
import {
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Show,
} from "@chakra-ui/react";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  ResponsiveContainer,
} from "recharts";
import FeedbackView from "@/components/apiDiscovery/feedbackView";
import { Button } from "@/components/utils";

type TopCardsProps = {
  cardOneTitle: string;
  cardTwoTitle: string;
  cardThreeTitle: string;
  cardOneValue: React.ReactNode;
  cardTwoValue: string;
  children: React.ReactNode;
};

type TableRowProps = {
  appName: string;
  status: string;
};

// All the views
export function OverviewView() {
  return (
    <div className="border rounded-xl p-4 pb-10">
      <div className="grid lg:grid-rows-[1fr_350px] gap-5">
        <TopCards
          cardOneTitle="Total Subscribers"
          cardTwoTitle="Revenue Generated"
          cardThreeTitle="API Ratings"
          cardOneValue="24"
          cardTwoValue="$120.95"
        >
          <div className="flex gap-2">
            <p>4.8</p>
            <ul className="flex items-center gap-1 text-yellow-400">
              <li>
                <HiOutlineStar />
              </li>
              <li>
                <HiOutlineStar />
              </li>
              <li>
                <HiOutlineStar />
              </li>
              <li>
                <HiOutlineStar />
              </li>
              <li>
                <HiOutlineStar />
              </li>
            </ul>
          </div>
        </TopCards>
        <OverviewCharts />
      </div>
    </div>
  );
}

export function SubHistoryView() {
  const tableData = [
    { id: 1, appName: "Parse Generator", status: "Paid" },
    { id: 2, appName: "Parse Generator", status: "Awaiting Renewal" },
    { id: 3, appName: "Parse Generator", status: "Paid" },
    { id: 4, appName: "Parse Generator", status: "Paid" },
    { id: 5, appName: "Parse Generator", status: "Failed" },
    { id: 6, appName: "Parse Generator", status: "Paid" },
    { id: 7, appName: "Parse Generator", status: "Failed" },
  ];

  return (
    <div className="border rounded-xl p-4">
      <div className="grid lg:grid-rows-[1fr_fit] gap-5">
        <TopCards
          cardOneTitle="Revenue Generated"
          cardTwoTitle="Total Subscribers"
          cardThreeTitle="Price per request call"
          cardOneValue={
            <p>
              $120.95<span className="font-light text-mid-grey/75"> YTD</span>
            </p>
          }
          cardTwoValue="25"
        >
          3$
        </TopCards>
        <div className="rounded-lg border overflow-scroll">
          <table className="min-w-full">
            <thead className="bg-[#f8f8f8] text-mid-grey rounded-lg">
              <tr className="text-left">
                <th className="w-1/3 px-6 py-2 whitespace-nowrap">
                  Application Name
                </th>
                <th className="w-1/3 px-6 py-2">Status</th>
                <th className="w-[5%] px-6 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data) => (
                <TableRow
                  key={data.id}
                  appName={data.appName}
                  status={data.status}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function FeedbackManagementView() {
  return (
    <div className="border rounded-xl p-4">
      {/* FEEDBACK VIEW IS USED HERE SINCE THEY ARE SO SIMILAR. */}
      <FeedbackView commentButtonDisplay={false} />
    </div>
  );
}
export function OwnershipManagementView() {
  return (
    <div className="border rounded-xl p-4">
      <div className="w-full md:w-[58%] 2xl:w-[50%]">
        <div className="space-y-4 text-sm leading-normal mb-32">
          <h3 className="font-semibold text-mid-grey">Transfer Ownership</h3>
          <p>Transfer ownership of API to a client on Anasee Marketplace.</p>
          <form action="#" className="space-y-6">
            <div className="flex items-center border rounded-lg w-full py-2 px-4 gap-1">
              <Icon
                icon="lets-icons:search-alt-light"
                className="text-mid-grey text-2xl"
              />
              <input
                type="search"
                placeholder="Search Client"
                className="text-base font-semibold focus:outline-none"
              />
            </div>
            <button className="rounded-lg border border-primary py-2 px-4 text-primary hover:bg-primary hover:text-white duration-300 text-xs font-semibold">
              Transfer Ownership
            </button>
          </form>
        </div>

        <div className="space-y-4 text-sm leading-normal mb-16">
          <h3 className="font-semibold text-mid-grey">Delete API</h3>
          <p>
            This action will cause this API to be deleted permanently, It will
            be removed from Anansee’s gateway and your projects data from
            requests, testing and descriptions will be destroyed. This action is
            not reversible.
          </p>
          <button className="rounded-lg border border-[rgba(255, 154, 158, 0.30)] py-2 px-4 text-error hover:bg-error hover:border-error hover:text-white duration-300 text-xs font-semibold">
            Delete API
          </button>
        </div>
      </div>
    </div>
  );
}

/* OVERVIEW VIEW SUB-COMPONENTS */
export function TopCards({
  cardOneTitle,
  cardTwoTitle,
  cardThreeTitle,
  cardOneValue,
  cardTwoValue,
  children,
}: TopCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div className="p-4 border rounded-lg flex flex-col gap-3 font-semibold">
        <h3 className="text-mid-grey/75">{cardOneTitle}</h3>
        <p>{cardOneValue}</p>
      </div>
      <div className="p-4 font-semibold border rounded-lg flex flex-col gap-3">
        <h3 className="text-mid-grey/75">{cardTwoTitle}</h3>
        <p>{cardTwoValue}</p>
      </div>
      <div className="p-4 border rounded-lg flex flex-col gap-3 font-semibold">
        <h3 className="text-mid-grey/75">{cardThreeTitle}</h3>
        {children}
      </div>
    </div>
  );
}

function OverviewCharts() {
  const data = [
    { name: "01:00", uv: 200, pv: 2400, amt: 2400 },
    { name: "05:00", uv: 345, pv: 1398, amt: 2210 },
    { name: "10:00", uv: 215, pv: 9800, amt: 2290 },
    { name: "15:00", uv: 768, pv: 3908, amt: 2000 },
    { name: "20:00", uv: 425, pv: 4800, amt: 2181 },
    { name: "25:00", uv: 565, pv: 3800, amt: 2500 },
    { name: "35:00", uv: 230, pv: 4300, amt: 2100 },
  ];

  const barChartData = [
    { name: "01:00", uv: 400, pv: 760, amt: 2400 },
    { name: "05:00", uv: 700, pv: 500, amt: 2210 },
    { name: "10:00", uv: 400, pv: 700, amt: 2290 },
    { name: "15:00", uv: 470, pv: 690, amt: 2000 },
    { name: "20:00", uv: 400, pv: 760, amt: 2181 },
    { name: "25:00", uv: 400, pv: 760, amt: 2500 },
    { name: "35:00", uv: 380, pv: 810, amt: 2100 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="border rounded-lg p-4">
        <div className="tableHeading flex justify-between items-center mb-3">
          <h3 className="text-mid-grey/75 font-semibold">
            Average Request Calls
          </h3>
          <select className="border px-3 py-1 rounded-lg outline-none text-mid-grey/75 bg-slate-100">
            <option value="minute"> Minute</option>
            <option value="hours"> Hours</option>
            <option value="days"> Days</option>
          </select>
        </div>
        <p className="font-semibold mb-4">2,560</p>

        <div className="w-full h-[240px]">
          <ResponsiveContainer>
            <LineChart
              width={500}
              height={240}
              data={data}
              className="text-center"
            >
              <Line type="monotone" dataKey="uv" stroke="#424CF9" />
              <CartesianGrid x={1} y={0} stroke="rgba(228, 228, 228, 0.20)" />
              <XAxis axisLine={false} dataKey="name" />
              <YAxis
                axisLine={false}
                tick={({ x, y, payload }) => (
                  <text x={x - 50} y={y} textAnchor="start">
                    {payload.value}
                  </text>
                )}
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="border rounded-lg p-4">
        <h3 className="text-mid-grey/75 font-semibold mb-14">
          API Connection Activity
        </h3>
        <div className="w-full h-[240px]">
          <ResponsiveContainer>
            <BarChart
              width={500}
              height={240}
              data={barChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid x={1} y={0} stroke="rgba(228, 228, 228, 0.20)" />
              <XAxis axisLine={false} dataKey="name" />
              <YAxis axisLine={false} />
              <Tooltip />
              <Bar
                dataKey="uv"
                radius={[6, 6, 0, 0]}
                barSize={10}
                fill="#9BA6FA"
              />
              <Bar
                dataKey="pv"
                radius={[6, 6, 0, 0]}
                barSize={10}
                fill="#6979F8"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* SUBSCRIPTION HISTORY */
// -> Top cards component was also used here

// -> Tables component
function TableRow({ appName, status }: TableRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
        {appName}
      </td>
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
