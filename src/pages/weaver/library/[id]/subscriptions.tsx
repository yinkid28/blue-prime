import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs, SearchBar } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export default function WaverSubscriptions() {
  const { api } = useApi();
  const { setLoading } = useOnboarding();
  useEffect(() => {
    setLoading(false);
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
  ];
  const tableData = [
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
      paymentStatus: "failed",
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
      <Navbar title={`${api?.title}`} />
      <BreadCrumbs
        // breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={`${api?.title}-Subscriptions`}
      />

      <div className="flex flex-col gap-4 p-5">
        <div className="text-mid-grey flex  w-full justify-between items-center ">
          <p className=" font-semibold">Billing Cycle</p>
          <FaEllipsisV />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {apps.map((app, index) => (
            <div
              className="w-full p-2 rounded-lg bg-lightest-grey flex flex-col gap-3 shadow-md"
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
        <div className="flex items-center">
          <SearchBar />
        </div>
        <TableContainer>
          <Table size="sm">
            <Thead className="rounded-t-lg">
              <Tr className="bg-light-grey rounded-t-lg p-2">
                <Th>Date</Th>
                <Th>Application Name</Th>
                <Th>Plan</Th>
                <Th>Price</Th>
                <Th>Payment Method</Th>
                <Th>Payment Method</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData?.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.date}</Td>
                  <Td>{item.appName}</Td>
                  <Td>{item.plan}</Td>
                  <Td>${item.price}</Td>
                  <Td>{item.paymentMethod}</Td>
                  <Td>
                    <div
                      className={`w-fit h-fit px-3 py-1 rounded-full ${
                        item.paymentStatus.toLowerCase() === "success"
                          ? "bg-success-bg text-success"
                          : "bg-error-bg text-error"
                      }`}
                    >
                      {item.paymentStatus}
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </WeaverLayout>
  );
}