import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbItems, BreadCrumbs } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

// remember to use static generation here but for now we will use context to get current api
const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export default function ApiOverview() {
  const { api } = useApi();
  const router = useRouter();
  const { loading, setLoading, setSidebar } = useOnboarding();
  useEffect(() => {
    setLoading(false);
    setSidebar("apiProgressWeaver");
  }, []);
  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Library",
      breadCrumbPath: "/weaver/library",
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

  return (
    <>
      <WeaverLayout>
        <Navbar title={`${api?.title}`} />
        {/* Fix the breadcrumbs before commiting. Use the commented code in api_manager.tsx as a guide */}
        <BreadCrumbs
          breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.title}-Overview`}
        />
        <div className="border rounded-xl p-4 mx-4 my-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 h-[63px]">
              <Image
                src={api?.img as StaticImageData}
                alt="icon"
                width={63}
                height={63}
              />
              <div className="flex">
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm font-semibold">{api?.title}</h1>
                  <p className="text-xs text-blue-dark font-semibold">
                    Entertainment
                  </p>
                  <div className="flex gap-20 items-center">
                    <p className="text-xs text-dark-grey">
                      Created: 12th Dec 2024
                    </p>
                    <p className="bg-dark-grey-fade text-xs text-blue-dark rounded-full px-2 py-[1.5px]">
                      Version 1
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-end">
              <div className="flex gap-[10px] items-center">
                <p>Base URL</p>
                <div className="text-primary">http://www.codehow.com/specs</div>
                <Icon className="text-[#A4AAB2]" icon="ion:copy-outline" />
              </div>
              <button className="border border-primaryFade text-sm py-2 px-[22px] rounded-lg font-semibold text-primary w-fit">
                Add New App
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-[#f8f8f8] rounded-lg max-w-[30%] p-4 my-6">
            <h3 className=" ">Price per Request</h3>
            <div className="flex justify-between text-dark-grey">
              <p className="text-sm font-semibold">N 0.01</p>
              <p className="text-[10px] font-normal">2,000 Requests/ms</p>
            </div>
          </div>
          <div>
            <h3 className="mb-4">Subscriptions</h3>
            {/* THE TABLE */}
            <div className="rounded-lg border overflow-scroll w-full md:w-[75%] gap-2">
              <table className="min-w-full">
                <thead className="bg-[#f8f8f8] text-mid-grey">
                  <tr className="text-left text-sm">
                    <th className="w-1/5 px-6 py-2">Application Name</th>
                    <th className="w-1/5 px-6 py-2">Request Calls</th>
                    <th className="w-1/5 px-6 py-2">Status</th>
                    <th className="w-1/5 px-6 py-2 whitespace-nowrap">
                      Subscription Renewal Date
                    </th>
                    <th className="w-[5%] px-6 py-2">Actions</th>
                  </tr>
                </thead>
              </table>
              <tbody></tbody>
            </div>
          </div>
        </div>
      </WeaverLayout>
    </>
  );
}
