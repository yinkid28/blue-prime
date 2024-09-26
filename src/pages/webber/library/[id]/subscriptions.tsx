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
import { Icon } from "@iconify/react";
import { useDisclosure } from "@chakra-ui/react";
import AddSub from "@/components/modals/addSub";



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
  const { isOpen, onClose, onOpen } = useDisclosure();
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
          <p className="font-semibold">Application</p>
          
          <div className="flex justify-center items-center gap-3">
              <button
                onClick={onOpen}
                className="border border-primaryFade text-sm py-2 px-[22px] rounded-lg font-semibold text-primary w-fit"
              >
                New Subscription
              </button>
              <FaEllipsisV />
            </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 w-[80%]">
              <div className="text-dark-txt flex gap-1 border px-4 py-3 md:py-2 rounded-lg items-center">
                <Icon icon="lets-icons:filter-big" />
                <p className="hidden md:flex">data.month</p>
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
                  // value={searchTerm}
                  // onChange={handleSearch}
                />
              </div>
            </div>

        {/* <div className="flex items-center">
          <SearchBar />
        </div> */}

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
      <AddSub
        isOpen={isOpen}
        onClose={() => {
          onClose();
          fetchData(); 
        }}
      />
    </WeaverLayout>
  );
}











// export default function Application() {
//   // ... (other state variables remain the same)
//   const [customerId, setCustomerId] = useState<string>("");

//   const getAllApplications = useCallback(async (pageNumber: number, pageSize: number) => {
//     setIsLoadingApps(true);
//     try {
//       // Assuming you have a way to get the customerId, replace this with your actual method
//       const cco = await APIServices.getCCOByCustomerId(customerId);
      
//       const res = await APIServices.getAllWebberApplications(pageNumber + 1, pageSize, searchTerm, cco);
//       if (res.statusCode === 200) {
//         const formattedApplications = res.data.list.map((app: any) => ({
//           name: app.name,
//           tokenQuota: app.throttlingPolicy || "N/A",
//           createdTime: app.renewDate ? getFormattedDate(app.renewDate) : "N/A",
//           appco: app.applicationCode,
//         }));
//         setApplications(formattedApplications);
//         setFilteredApplications(formattedApplications);
//         setPageCount(res.data.totalPages);
//       }
//     } catch (error: any) {
//       const errorMessage = error?.response?.data?.message || "Failed to fetch applications";
//       setApiErrorMessage(errorMessage);
//       setError(errorMessage);
//     } finally {
//       setIsLoadingApps(false);
//     }
//   }, [searchTerm, setApiErrorMessage, customerId]);

//   useEffect(() => {
//     setLoading(false);
//     setSidebar("");
//     // Assuming you have a way to get the customerId, replace this with your actual method
//     const fetchCustomerId = async () => {
//       const id = await APIServices.getCustomerId(); // Replace with your actual method
//       setCustomerId(id);
//     };
//     fetchCustomerId();
//   }, [setLoading, setSidebar]);

//   useEffect(() => {
//     if (customerId) {
//       getAllApplications(pageNumber, pageSize);
//     }
//   }, [customerId, pageNumber, pageSize, getAllApplications]);

//   // ... (rest of the component remains the same)
// }

// // ... (TableRow component r