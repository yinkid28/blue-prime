import React, { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbItems, BreadCrumbs, SearchBar } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import dynamic from "next/dynamic";
import { FaEllipsisV } from "react-icons/fa";
import { Table } from "@/components/utils";
import { SubscribedApp, tableTypes } from "@/models/webber.model";
import APIServices from "@/services/api_services/api_service";

const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

const breadCrumbs: BreadCrumbItems[] = [
  {
    breadCrumbText: "Library",
    breadCrumbPath: "/webber/library",
  },
];

export default function WaverSubscriptions() {
  const { api } = useApi();
  const { setLoading, setApiErrorMessage, setSidebar } = useOnboarding();
  const [apps, setApps] = useState<SubscribedApp[]>([]);
  const [tableData, setTableData] = useState<tableTypes[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    if (!api) {
      setError("API configuration is missing");
      setIsLoading(false);
      return;
    }

    try {
      const response = await APIServices.getSubcribedAppsbyApiCode(api.apiCode);

      if (response?.data?.list) {
        const transformedApps: SubscribedApp[] = response.data.list.map(
          (app: any) => ({
            id: app.id || 0,
            name: app.name || "",
            amount: app.amount || 0,
            req: app.requests || 0,
            date: app.date ? new Date(app.date).toLocaleDateString() : "",
          })
        );

        const transformedTableData: tableTypes[] = response.data.list.map(
          (sub: any) => ({
            date: sub.date ? new Date(sub.date).toLocaleDateString() : "",
            appName: sub.name || "",
            plan: sub.plan || "",
            price: (sub.price || 0).toFixed(2),
            paymentMethod: sub.paymentMethod || "",
            paymentStatus: sub.paymentStatus || "",
          })
        );

        setApps(transformedApps);
        setTableData(transformedTableData);
      } else {
        setError("Unexpected data structure in API response");
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSidebar("apiProgressWeaver");
    fetchData();
  }, [setSidebar, api]);

  return (
    <WeaverLayout>
      <Navbar title={`${api?.name}`} />
      <BreadCrumbs
        breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={`${api?.name}-Subscriptions`}
      />

      <div className="flex flex-col gap-4 p-5">
        <div className="text-mid-grey flex w-full justify-between items-center">
          <p className="font-semibold">Billing Cycle</p>
          <FaEllipsisV />
        </div>

        <div
          className="overflow-x-auto"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <div className="flex gap-3 min-w-max p-4">
            {apps.map((app, index) => (
              <div
                className="w-80 p-2 rounded-lg bg-lightest-grey flex flex-col gap-3 shadow-md"
                key={index}
              >
                <p className="text-mid-grey font-semibold text-sm">
                  {app.name}
                </p>
                <div className="flex w-full items-center flex-col md:flex-row gap-2 justify-between">
                  <p className="font-semibold">
                    ${app.amount.toLocaleString()}
                  </p>
                  <p className="font-thin text-mid-grey">
                    {app.req.toLocaleString()} requests/ms
                  </p>
                </div>
                <div className="w-fit text-sm h-fit px-3 py-1 rounded-full text-primary bg-[#13229510]">
                  <p>{app.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <SearchBar />
        </div>

        <Table>
          <Table.Header>
            <th className="w-1/6 px-6 py-2 whitespace-nowrap">Date</th>
            <th className="w-1/6 px-6 py-2 whitespace-nowrap">
              Application Name
            </th>
            <th className="w-1/6 px-6 py-2 whitespace-nowrap">Plan</th>
            <th className="w-1/6 px-6 py-2 whitespace-nowrap">Price</th>
            <th className="w-1/6 px-6 py-2 whitespace-nowrap">
              Payment Method
            </th>
            <th className="w-1/6 px-6 py-2 whitespace-nowrap">
              Payment Status
            </th>
          </Table.Header>
          <Table.Body>
            {tableData.map((item: tableTypes, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
                  {item.date}
                </td>
                <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
                  {item.appName}
                </td>
                <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
                  {item.plan}
                </td>
                <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
                  {item.price}
                </td>
                <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
                  {item.paymentMethod}
                </td>
                <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
                  <div
                    className={`rounded-full w-fit px-3 whitespace-nowrap ${
                      item.paymentStatus.toLowerCase() === "success"
                        ? "bg-success-bg text-success"
                        : "bg-error-bg text-error"
                    }`}
                  >
                    {item.paymentStatus}
                  </div>
                </td>
              </tr>
            ))}
          </Table.Body>
        </Table>
      </div>
    </WeaverLayout>
  );
}
