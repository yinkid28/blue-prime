import React, { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbItems, BreadCrumbs, Table } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import dynamic from "next/dynamic";
import { ISubscription } from "@/models/api.model";
import APIServices from "@/services/api_services/api_service";
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
  const { loading, setLoading, errorMessage, setApiErrorMessage } = useOnboarding();
  const [subscriptions, setSubscriptions] = useState<ISubscription[] | null>(null);

  const getAllSubscriptions = useCallback(async (code:string, type:string) => {

    // setLoading(true);
    setApiErrorMessage(null);
    try {
    

      const res = await APIServices.getAllSubscriptions(code, type);
      console.log("API Response:", res);

      if (res.statusCode === 200 ) {
        setSubscriptions(res.data.list);
      } else {
        setApiErrorMessage("Unexpected response format");
      }
    } catch (error: any) {
      console.error("Error fetching subscriptions:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Failed to fetch subscriptions";
      setApiErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [api, setLoading, setApiErrorMessage]);

  useEffect(() => {
    if (api) {
      getAllSubscriptions(api?.apiCode as string, "api");
    }
  }, [api, getAllSubscriptions]);

  useEffect(()=>{
    // setLoading(false)
    console.log(subscriptions, "lst of sub")
  },[subscriptions])

  return (
    <WeaverLayout>
      <Navbar title={`${api?.name}`} />
      <BreadCrumbs
        breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={`${api?.name}-Subscriptions`}
      />

      <div className="border rounded-xl p-4 mx-4 my-6 min-h-[80dvh]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:gap-0 gap-6">
          <h2 className="text-xl font-semibold">Subscriptions</h2>
          <button
            onClick={onOpen}
            className="border border-primaryFade text-sm py-2 px-[22px] rounded-lg font-semibold text-primary w-fit"
          >
            New Subscription
          </button>
        </div>

        <div className="mt-4">
          {loading ? (
            <p>Loading subscriptions...</p>
          ) : errorMessage ? (
            <p className="text-error">{errorMessage}</p>
          ) : subscriptions && subscriptions.length > 0 ? (
            <Table>
              <Table.Header>
                <th className="w-1/6 px-6 py-2 whitespace-nowrap">Date</th>
                <th className="w-1/6 px-6 py-2 whitespace-nowrap">Application Name</th>
                <th className="w-1/6 px-6 py-2 whitespace-nowrap">Plan</th>
                <th className="w-1/6 px-6 py-2 whitespace-nowrap">Price</th>
                <th className="w-1/6 px-6 py-2 whitespace-nowrap">Payment Method</th>
                <th className="w-1/6 px-6 py-2 whitespace-nowrap">Status</th>
              </Table.Header>
              <Table.Body>
                {subscriptions.map((item: ISubscription, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
                      {item.applicationInfo?.createdTime || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
                      {item.applicationInfo?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
                      {item.applicationInfo?.throttlingPolicy || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
                      {"N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
                      {"N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
                      <div
                        className={`rounded-full w-fit px-3 whitespace-nowrap 
                          ${
                          item.applicationInfo?.status && item.applicationInfo.status.toLowerCase() === "active"
                            ? "bg-success-bg text-success"
                            : "bg-error-bg text-error"
                        }
                        `}
                      >
                        {item.applicationInfo?.status || "N/A"}
                      </div>
                    </td>
                  </tr>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p>No subscriptions available.</p>
          )}
        </div>
      </div>
      <AddSub
        isOpen={isOpen}
        onClose={() => {
          onClose();
          getAllSubscriptions(api?.apiCode as string, "api");
        }}
      />
    </WeaverLayout>
  );
}



