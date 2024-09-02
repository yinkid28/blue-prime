import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbItems, BreadCrumbs, SearchBar } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import dynamic from "next/dynamic";
import { Key, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Table } from "@/components/utils";
import { tableTypes } from "@/models/webber.model";
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
  const { setLoading, setSidebar } = useOnboarding();
  useEffect(() => {
    setLoading(false);
    setSidebar("apiProgressWeaver");
  }, []);

  const apps = [
    {
      id: 1,
      name: "Application 1",
      amount: 4000,
      req: 2000,
      date: "15th Apr 2024",
    },
    {
      id: 1,
      name: "Application 2",
      amount: 4000,
      req: 2000,
      date: "15th Apr 2024",
    },
    {
      id: 1,
      name: "Application 3",
      amount: 4000,
      req: 2000,
      date: "15th Apr 2024",
    },
    {
      id: 1,
      name: "Application 1",
      amount: 4000,
      req: 2000,
      date: "15th Apr 2024",
    },
    {
      id: 1,
      name: "Application 2",
      amount: 4000,
      req: 2000,
      date: "15th Apr 2024",
    },
    {
      id: 1,
      name: "Application 3",
      amount: 4000,
      req: 2000,
      date: "15th Apr 2024",
    },
    
    

    
  ];


  const tableData: tableTypes[] = [
    {
      date: "15th Apr 2024",
      appName: "Trexapayment",
      plan: "15th Apr 2024",
      price: "2.90",
      paymentMethod: "Card",
      paymentStatus: "Success",
    },
    {
      date: "15th Apr 2024",
      appName: "Trexapayment",
      plan: "15th Apr 2024",
      price: "2.90",
      paymentMethod: "Card",
      paymentStatus: "Success",
    },
    {
      date: "15th Apr 2024",
      appName: "Trexapayment",
      plan: "15th Apr 2024",
      price: "2.90",
      paymentMethod: "Card",
      paymentStatus: "Failed",
    },
    {
      date: "15th Apr 2024",
      appName: "Trexapayment",
      plan: "15th Apr 2024",
      price: "2.90",
      paymentMethod: "Card",
      paymentStatus: "Success",
    },
    {
      date: "15th Apr 2024",
      appName: "Trexapayment",
      plan: "15th Apr 2024",
      price: "2.90",
      paymentMethod: "Card",
      paymentStatus: "Success",
    },
    {
      date: "15th Apr 2024",
      appName: "Trexapayment",
      plan: "15th Apr 2024",
      price: "2.90",
      paymentMethod: "Card",
      paymentStatus: "Success",
    },
  ];
  return (
    <WeaverLayout>
      <Navbar title={`${api?.name}`} />
      <BreadCrumbs
        breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={`${api?.name}-Subscriptions`}
      />

      <div className="flex flex-col gap-4 p-5">
        <div className="text-mid-grey flex  w-full justify-between items-center ">
          <p className=" font-semibold">Billing Cycle</p>
          <FaEllipsisV />
        </div>
        
        <div className="overflow-x-auto" 
          style={{
            msOverflowStyle: 'none',  
            scrollbarWidth: 'none',  
          }}
        >
        <div className="flex gap-3 min-w-max p-4">
          {apps.map((app, index) => (
       
            <div
              className="w-80 p-2 rounded-lg bg-lightest-grey flex flex-col gap-3 shadow-md"
              key={index}
            >
              <p className="text-mid-grey font-semibold text-sm">{app.name}</p>
              <div className="flex w-full items-center flex-col md:flex-row gap-2 justify-between">
                <p className="font-semibold">${app.amount.toLocaleString()}</p>
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
          <Table.Body
            data={tableData}
            render={(item: tableTypes, index: Key | null | undefined) => (
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
            )}
          />
        </Table>
      </div>
    </WeaverLayout>
  );
}
