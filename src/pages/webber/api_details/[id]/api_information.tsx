import Navbar from "@/components/Layout/Nav/navbar";
import ApiInfomationView from "@/components/Webber/CreateAPI/apiProgress/ApiInformationView";
import { BreadCrumbs } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export default function ApiInformationWebber() {
  const { api } = useApi();
  const router = useRouter();
  const [view, setView] = useState<string>("info");

  const { loading, setLoading } = useOnboarding();
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <WebberLayout>
          <Navbar title={`${api?.title}`} />
          <BreadCrumbs
            // breadCrumbItems={breadCrumbs}
            breadCrumbActiveItem={`${api?.title}-Api Information`}
          />
          <div className="p-5">
            <div className="flex  items-center w-full justify-between ">
              <div className="hidden md:flex items-center gap-3">
                <div
                  className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                    view === "info"
                      ? "text-primary border-primary"
                      : "text-mid-grey border-mid-grey"
                  }  bg-transparent border-[1px]`}
                  onClick={() => {
                    setView("info");
                  }}
                >
                  <p>API Information</p>
                </div>
                <div
                  className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                    view === "resource"
                      ? "text-primary border-primary "
                      : "text-mid-grey border-mid-grey"
                  }  bg-transparent border-[1px]`}
                  onClick={() => {
                    setView("resource");
                  }}
                >
                  <p>Resources and Links</p>
                </div>
                <div
                  className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                    view === "subscription"
                      ? "text-primary border-primary"
                      : "text-mid-grey border-mid-grey"
                  }  bg-transparent border-[1px]`}
                  onClick={() => {
                    setView("subscription");
                  }}
                >
                  <p>Subscription Billing</p>
                </div>
              </div>
              <div className="w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 border-[1px] border-mid-grey  rounded-xl  bg-transparent border-[1px]">
                <select className="border-none outline-none">
                  <option value="version-1"> Version 1</option>
                </select>
              </div>
            </div>
            <div className="my-5 border border-light-grey rounded-lg p-5">
              {view === "info" ? <ApiInfomationView /> : null}
            </div>
          </div>
        </WebberLayout>
      )}
    </>
  );
}
