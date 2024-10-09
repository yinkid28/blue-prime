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
import { getFormattedDate } from "@/helper_utils/helpers";

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
  const { loading, setLoading, setApiErrorMessage } = useOnboarding();
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);

  const getAllSubscriptions = useCallback(
    async (code: string, type: string) => {
      // setLoading(true);
      setApiErrorMessage(null);
      try {
        const res = await APIServices.getAllSubscriptions(code, type);
        console.log("API Response:", res);

        if (res.statusCode === 200) {
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
    },
    [api, setLoading, setApiErrorMessage]
  );

  useEffect(() => {
    if (api) {
      getAllSubscriptions(api?.apiCode as string, "api");
    }
  }, [api, getAllSubscriptions]);

  useEffect(() => {
    // setLoading(false)
    console.log(new Date().toISOString(), "lst of sub");
    getFormattedDate(new Date(1713455826000).toISOString());
  }, [subscriptions]);

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
          ) : subscriptions.length > 0 ? (
            <Table>
              <Table.Header>
                <Table.Heading className="w-1/6 px-6 py-2 whitespace-nowrap">
                  Date
                </Table.Heading>
                <Table.Heading className="w-1/6 px-6 py-2 whitespace-nowrap">
                  Application Name
                </Table.Heading>
                <Table.Heading className="w-1/6 px-6 py-2 whitespace-nowrap">
                  Plan
                </Table.Heading>
                <Table.Heading className="w-1/6 px-6 py-2 whitespace-nowrap">
                  Price
                </Table.Heading>
                <Table.Heading className="w-1/6 px-6 py-2 whitespace-nowrap">
                  Payment Method
                </Table.Heading>
                <Table.Heading className="w-1/6 px-6 py-2 whitespace-nowrap">
                  Status
                </Table.Heading>
              </Table.Header>
              <Table.Body
                data={subscriptions}
                render={(item: ISubscription, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
                      {getFormattedDate(
                        new Date(
                          parseInt(item.applicationInfo.createdTime)
                        ).toISOString()
                      ) || "N/A"}
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
                            item.applicationInfo?.status &&
                            item.applicationInfo.status.toLowerCase() ===
                              "approved"
                              ? "bg-success-bg text-success"
                              : "bg-error-bg text-error"
                          }
                        `}
                      >
                        {item.applicationInfo?.status || "N/A"}
                      </div>
                    </td>
                  </tr>
                )}
              />
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
